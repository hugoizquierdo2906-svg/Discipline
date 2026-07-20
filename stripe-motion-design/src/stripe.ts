/**
 * The single configured Stripe client for the whole integration.
 *
 * The secret key is server-side only — never import this module into
 * browser/client code. The browser only ever needs the *publishable* key.
 */
import Stripe from "stripe";

import { config } from "./config.js";

export const stripe = new Stripe(config.stripe.secretKey, {
  // apiVersion is intentionally omitted: the SDK pins a known-good version for
  // you. To pin explicitly, set e.g. apiVersion: "2025-06-30.basil" and keep it
  // in sync with the SDK major you upgrade to.
  appInfo: {
    name: "stripe-motion-design",
    version: "0.1.0",
  },
  typescript: true,
});

/** Re-export so callers can type-annotate without importing "stripe" directly. */
export type { Stripe };
