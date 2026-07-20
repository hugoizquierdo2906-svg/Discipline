/**
 * Payments — one-off charges (deposits, fixed-price gigs, "pay this now").
 *
 * Two options, both hosted by Stripe (no card data ever touches your servers):
 *   - createCheckoutSession: a one-time payment page you redirect a client to.
 *   - createPaymentLink: a reusable/shareable URL you can paste in an email.
 *
 * For recurring retainers you'd use mode "subscription" instead — out of scope
 * here; this business bills per project.
 */
import { config } from "./config.js";
import { stripe, type Stripe } from "./stripe.js";
import { toMinorUnits } from "./money.js";

export interface PaymentItem {
  /** Product/service name shown on the payment page. */
  name: string;
  /** Optional longer description. */
  description?: string;
  /** Price as a human amount (e.g. 500 for 500 €). Converted to cents. */
  unitAmount: number;
  /** Quantity (default 1). */
  quantity?: number;
}

export interface CheckoutInput {
  items: PaymentItem[];
  /** Pre-fill the client's email on the payment page. */
  customerEmail?: string;
  /** Overrides config default success/cancel URLs. */
  successUrl?: string;
  cancelUrl?: string;
  /** Attach your own bookkeeping data (project id, quote id, ...). */
  metadata?: Record<string, string>;
}

function toLineItems(
  items: PaymentItem[],
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return items.map((item) => ({
    price_data: {
      currency: config.business.currency,
      unit_amount: toMinorUnits(item.unitAmount),
      product_data: {
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
      },
    },
    quantity: item.quantity ?? 1,
  }));
}

/**
 * Create a hosted Checkout Session for a one-off payment.
 * Redirect the client to the returned `url`.
 */
export async function createCheckoutSession(
  input: CheckoutInput,
): Promise<{ id: string; url: string | null }> {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: toLineItems(input.items),
    success_url: input.successUrl ?? config.urls.checkoutSuccess,
    cancel_url: input.cancelUrl ?? config.urls.checkoutCancel,
    locale: config.business.locale as Stripe.Checkout.SessionCreateParams.Locale,
    customer_email: input.customerEmail,
    billing_address_collection: "auto",
    // Generate a proper invoice/receipt PDF for one-off payments too, so every
    // sale has a document — useful for a business's accounting.
    invoice_creation: { enabled: true },
    metadata: input.metadata,
  });

  return { id: session.id, url: session.url };
}

/**
 * Create a reusable Payment Link (a URL you can share anywhere).
 * Good for a fixed "book a call / pay a deposit" price on your site.
 */
export async function createPaymentLink(
  item: PaymentItem,
): Promise<{ id: string; url: string }> {
  // A Payment Link references a Price, so create the Price first.
  const price = await stripe.prices.create({
    currency: config.business.currency,
    unit_amount: toMinorUnits(item.unitAmount),
    product_data: { name: item.name },
  });

  const link = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: item.quantity ?? 1 }],
    after_completion: {
      type: "redirect",
      redirect: { url: config.urls.checkoutSuccess },
    },
  });

  return { id: link.id, url: link.url };
}
