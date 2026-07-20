/**
 * Centralised, validated configuration derived from environment variables.
 *
 * Import `config` anywhere instead of reading `process.env` directly, so that
 * a missing/invalid value fails loudly at startup rather than mid-request.
 */
import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Copy .env.example to .env and fill it in.`,
    );
  }
  return value;
}

function optional(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim() !== "" ? value : fallback;
}

const secretKey = required("STRIPE_SECRET_KEY");

export const config = {
  stripe: {
    secretKey,
    publishableKey: optional("STRIPE_PUBLISHABLE_KEY", ""),
    /**
     * The webhook secret is only needed by the webhook route. It is read
     * lazily there (see src/webhook.ts) so the CLI scripts can run without it.
     */
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
    /** true when a live key (sk_live_...) is configured. */
    isLive: secretKey.startsWith("sk_live_"),
  },

  business: {
    /** ISO 4217, lower-case for the Stripe API (e.g. "eur"). */
    currency: optional("CURRENCY", "eur").toLowerCase(),
    /** Locale for hosted invoice pages and Checkout (e.g. "fr"). */
    locale: optional("LOCALE", "fr"),
    /** Net payment terms in days for invoices sent to companies. */
    invoiceDaysUntilDue: Number(optional("INVOICE_DAYS_UNTIL_DUE", "30")),
    /** Legal footer printed on every invoice. */
    invoiceFooter: optional(
      "INVOICE_FOOTER",
      "TVA non applicable, art. 293 B du CGI",
    ),
  },

  urls: {
    app: optional("APP_URL", "http://localhost:4242"),
    checkoutSuccess: optional(
      "CHECKOUT_SUCCESS_URL",
      "http://localhost:4242/paiement/merci",
    ),
    checkoutCancel: optional(
      "CHECKOUT_CANCEL_URL",
      "http://localhost:4242/paiement/annule",
    ),
  },

  server: {
    port: Number(optional("PORT", "4242")),
  },
} as const;
