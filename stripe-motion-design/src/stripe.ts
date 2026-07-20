/**
 * The single configured Stripe client for the whole integration.
 *
 * The secret key is server-side only — never import this module into
 * browser/client code. The browser only ever needs the *publishable* key.
 */
import { HttpsProxyAgent } from "https-proxy-agent";
import Stripe from "stripe";

import { config } from "./config.js";

// Honor HTTPS_PROXY when present (sandboxed/CI/corporate networks). Node's
// https module ignores proxy env vars by default, so without this the SDK
// would bypass the proxy and fail. No-op when no proxy is configured.
const proxyUrl = process.env.HTTPS_PROXY ?? process.env.https_proxy;

export const stripe = new Stripe(config.stripe.secretKey, {
  ...(proxyUrl ? { httpAgent: new HttpsProxyAgent(proxyUrl) } : {}),
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
