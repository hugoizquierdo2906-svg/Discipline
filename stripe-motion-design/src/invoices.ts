/**
 * Invoicing — the core billing workflow for the motion-design business.
 *
 * Flow (all server-side):
 *   1. find-or-create the customer (the company)
 *   2. create a DRAFT invoice with collection_method "send_invoice"
 *   3. attach line items to that specific invoice
 *   4. finalize it (locks the numbers, generates the PDF + hosted page)
 *   5. send it (Stripe emails the client a link to pay online)
 *
 * We create the invoice first and attach items to it explicitly (rather than
 * relying on "pending" items) so the result is deterministic — you always know
 * exactly which lines land on which invoice.
 */
import { findOrCreateCustomer, type CompanyInput } from "./customers.js";
import { config } from "./config.js";
import { stripe, type Stripe } from "./stripe.js";
import { toMinorUnits } from "./money.js";

export interface InvoiceLine {
  /** What the client is being billed for, e.g. "Motion design — brand loop 15s". */
  description: string;
  /** Unit price as a human amount (e.g. 1200 for 1 200 €). Converted to cents. */
  unitAmount: number;
  /** Quantity (default 1). */
  quantity?: number;
}

export interface CreateInvoiceInput {
  /** The company being billed. */
  company: CompanyInput;
  /** One line per deliverable / milestone. */
  lines: InvoiceLine[];
  /** Overrides config default (net terms in days). */
  daysUntilDue?: number;
  /** Note printed near the top of the invoice (visible to the client). */
  memo?: string;
  /** Purchase-order or project reference, shown as a custom field. */
  reference?: string;
  /** If true, finalize + email immediately. If false, leave as an editable draft. */
  send?: boolean;
}

export interface InvoiceResult {
  id: string;
  number: string | null;
  status: Stripe.Invoice["status"];
  total: number;
  currency: string;
  /** Public page where the client pays. Present once finalized. */
  hostedInvoiceUrl: string | null;
  /** Direct PDF link. Present once finalized. */
  invoicePdf: string | null;
  customerId: string;
}

/**
 * Create an invoice for a company and (by default) send it.
 *
 * Set `send: false` to stop after creating the draft — useful when you want to
 * review or tweak it in the Dashboard before it goes out.
 */
export async function createInvoice(
  input: CreateInvoiceInput,
): Promise<InvoiceResult> {
  if (input.lines.length === 0) {
    throw new Error("An invoice needs at least one line item.");
  }

  const customer = await findOrCreateCustomer(input.company);
  const currency = config.business.currency;

  // 1. Draft invoice. auto_advance:false keeps Stripe from finalizing on its
  //    own timer — we drive the lifecycle explicitly below.
  const draft = await stripe.invoices.create({
    customer: customer.id,
    collection_method: "send_invoice",
    days_until_due: input.daysUntilDue ?? config.business.invoiceDaysUntilDue,
    currency,
    description: input.memo,
    footer: config.business.invoiceFooter,
    auto_advance: false,
    pending_invoice_items_behavior: "exclude",
    custom_fields: input.reference
      ? [{ name: "Référence", value: input.reference }]
      : undefined,
  });

  // 2. Attach each line to THIS invoice. We set the line total via `amount`
  //    (unit price × quantity) and note the quantity in the label — simple and
  //    robust. Switch to price-based items if you need unit/qty columns.
  for (const line of input.lines) {
    const quantity = line.quantity ?? 1;
    const label =
      quantity > 1 ? `${line.description} (×${quantity})` : line.description;
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: draft.id,
      currency,
      description: label,
      amount: toMinorUnits(line.unitAmount) * quantity,
    });
  }

  if (input.send === false) {
    const reloaded = await stripe.invoices.retrieve(draft.id);
    return toResult(reloaded, customer.id);
  }

  // 3. Finalize (locks it, assigns a number, builds PDF + hosted page)...
  await stripe.invoices.finalizeInvoice(draft.id);
  // 4. ...then email the client the payment link.
  const sent = await stripe.invoices.sendInvoice(draft.id);

  return toResult(sent, customer.id);
}

/** Most recent invoices, newest first — handy for a quick dashboard/CLI view. */
export async function listRecentInvoices(limit = 10): Promise<InvoiceResult[]> {
  const invoices = await stripe.invoices.list({ limit });
  return invoices.data.map((inv) =>
    toResult(inv, typeof inv.customer === "string" ? inv.customer : ""),
  );
}

/** Cancel an unpaid invoice you no longer intend to collect. */
export async function voidInvoice(invoiceId: string): Promise<InvoiceResult> {
  const voided = await stripe.invoices.voidInvoice(invoiceId);
  return toResult(
    voided,
    typeof voided.customer === "string" ? voided.customer : "",
  );
}

function toResult(invoice: Stripe.Invoice, customerId: string): InvoiceResult {
  return {
    id: invoice.id,
    number: invoice.number,
    status: invoice.status,
    total: invoice.total,
    currency: invoice.currency,
    hostedInvoiceUrl: invoice.hosted_invoice_url ?? null,
    invoicePdf: invoice.invoice_pdf ?? null,
    customerId,
  };
}
