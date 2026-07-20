/**
 * Webhooks are the authoritative source of truth for payment state.
 *
 * A client's browser can close before the success redirect fires, so never
 * treat a redirect as proof of payment. Instead, act on the verified events
 * Stripe sends here (invoice paid, checkout completed, payment failed).
 *
 * Two responsibilities:
 *   - verifyEvent(): cryptographically verify the request really came from
 *     Stripe (rejects forged calls). Requires the raw, unparsed body.
 *   - handleStripeEvent(): react to the events you care about.
 */
import { config } from "./config.js";
import { stripe, type Stripe } from "./stripe.js";
import { formatAmount } from "./money.js";

/**
 * Verify the Stripe signature and return the parsed event.
 * @param rawBody the untouched request body (Buffer or string) — NOT JSON.parsed
 * @param signature value of the `stripe-signature` header
 * @throws if the secret is missing or the signature does not match
 */
export function verifyEvent(
  rawBody: Buffer | string,
  signature: string | undefined,
): Stripe.Event {
  if (!config.stripe.webhookSecret) {
    throw new Error(
      "STRIPE_WEBHOOK_SECRET is not set. Get it from `stripe listen` (local) " +
        "or the Dashboard webhook endpoint (production).",
    );
  }
  if (!signature) {
    throw new Error("Missing stripe-signature header.");
  }
  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    config.stripe.webhookSecret,
  );
}

/**
 * React to a verified event. Extend the switch as your needs grow.
 *
 * This must be idempotent: Stripe may deliver the same event more than once,
 * so any side effect (marking a project paid, sending yourself a note) should
 * tolerate running twice for the same event id.
 */
export async function handleStripeEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log(
        `✅ Payment received via Checkout — ${formatAmount(
          session.amount_total ?? 0,
          session.currency ?? config.business.currency,
        )} from ${session.customer_details?.email ?? "unknown"}`,
      );
      // TODO: mark the related quote/project as paid, notify yourself, etc.
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object;
      console.log(
        `✅ Invoice ${invoice.number ?? invoice.id} paid — ${formatAmount(
          invoice.amount_paid,
          invoice.currency,
        )}`,
      );
      // TODO: mark the project as settled, file the PDF, etc.
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.warn(
        `⚠️  Payment failed for invoice ${invoice.number ?? invoice.id} ` +
          `(${invoice.customer_email ?? "unknown client"}). ` +
          `Stripe will retry per your Dashboard settings.`,
      );
      break;
    }

    case "invoice.finalized": {
      const invoice = event.data.object;
      console.log(
        `🧾 Invoice ${invoice.number ?? invoice.id} finalized — ` +
          `${invoice.hosted_invoice_url ?? "no URL"}`,
      );
      break;
    }

    default:
      // Unhandled events are normal; log at debug level and move on.
      console.log(`ℹ️  Unhandled event: ${event.type}`);
  }
}
