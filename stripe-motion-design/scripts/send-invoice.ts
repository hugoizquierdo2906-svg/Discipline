/**
 * Create and send an invoice to a company — the everyday billing action.
 *
 *   npm run invoice
 *
 * Edit the `invoice` object below with your client's details and the work you
 * delivered, then run it. In TEST mode this creates a real (test) invoice and
 * prints the hosted URL so you can open the exact page your client would see.
 * Set `send: false` to stop at a draft you can review in the Dashboard first.
 */
import { createInvoice, type CreateInvoiceInput } from "../src/invoices.js";
import { formatAmount } from "../src/money.js";

// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS for each invoice you send.
// ─────────────────────────────────────────────────────────────────────────
const invoice: CreateInvoiceInput = {
  company: {
    name: "CLIENT NAME (edit me)", // company or contact name, as shown on the invoice
    email: "client@example.com", //   ← the invoice is emailed here
    locale: "en", // "en" for a US client, "fr" for a French one
    // Optional — uncomment to print an address / attach an EU VAT number:
    // address: { line1: "10 rue de la Création", postal_code: "75011", city: "Paris", country: "FR" },
    // taxId: { type: "eu_vat", value: "FR12345678901" },
  },
  reference: "CAMPAIGN-2026-001", // your project / PO reference (optional)
  // Protects against double-billing if the run is retried after a network
  // failure. Use one unique key per billing action (project + milestone).
  idempotencyKey: "CAMPAIGN-2026-001-full",
  memo: "Thank you for your business. Payment due within 30 days.",
  lines: [
    { description: 'Motion design — "Campaign" pack', unitAmount: 1490 },
    { description: "Additional product flavor variants", unitAmount: 90, quantity: 3 },
    { description: "Extra revision rounds", unitAmount: 50, quantity: 2 },
  ],
  send: true, // false = create an editable draft instead of sending
};
// ─────────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const result = await createInvoice(invoice);

  console.log(`Invoice ${result.number ?? result.id} — status: ${result.status}`);
  console.log(`Total:   ${formatAmount(result.total, result.currency)}`);
  if (result.hostedInvoiceUrl) {
    console.log(`Pay page: ${result.hostedInvoiceUrl}`);
  }
  if (result.invoicePdf) {
    console.log(`PDF:      ${result.invoicePdf}`);
  }
  if (invoice.send === false) {
    console.log("\nℹ️  Draft created — review it in the Dashboard, then send it.");
  } else {
    console.log("\n✅ Invoice finalized and emailed to the client.");
  }
}

main().catch((err) => {
  console.error("❌ Failed to create invoice:", err instanceof Error ? err.message : err);
  process.exit(1);
});
