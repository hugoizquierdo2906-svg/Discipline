/**
 * Minimal Express server exposing the two HTTP endpoints a website needs:
 *   POST /api/checkout        -> start a one-off payment, returns { url }
 *   POST /api/stripe/webhook  -> receive verified Stripe events
 *
 * Run it with `npm run dev` (watch) or `npm start`.
 *
 * IMPORTANT: the webhook route is registered BEFORE express.json() and uses a
 * raw body parser, because Stripe signature verification needs the exact bytes
 * Stripe sent. If JSON-parsing touches the body first, verification fails.
 */
import express from "express";

import { config } from "./config.js";
import { createCheckoutSession } from "./checkout.js";
import { handleStripeEvent, verifyEvent } from "./webhook.js";

const app = express();

// --- Webhook: raw body, must come first ---
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "*/*" }),
  async (req, res) => {
    let event;
    try {
      event = verifyEvent(req.body, req.header("stripe-signature"));
    } catch (err) {
      const message = err instanceof Error ? err.message : "invalid signature";
      console.error(`Webhook verification failed: ${message}`);
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    try {
      await handleStripeEvent(event);
    } catch (err) {
      // Returning 500 tells Stripe to retry later.
      console.error("Error handling event:", err);
      res.status(500).send("Handler error");
      return;
    }

    // 200 acknowledges receipt so Stripe stops retrying.
    res.json({ received: true });
  },
);

// --- JSON for every other route ---
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, mode: config.stripe.isLive ? "live" : "test" });
});

app.post("/api/checkout", async (req, res) => {
  try {
    const { items, customerEmail, metadata } = req.body ?? {};
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Provide a non-empty `items` array." });
      return;
    }
    const session = await createCheckoutSession({ items, customerEmail, metadata });
    res.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    console.error("Checkout error:", message);
    res.status(500).json({ error: message });
  }
});

app.listen(config.server.port, () => {
  const mode = config.stripe.isLive ? "LIVE ⚠️" : "test";
  console.log(
    `stripe-motion-design listening on http://localhost:${config.server.port} (${mode} mode)`,
  );
});
