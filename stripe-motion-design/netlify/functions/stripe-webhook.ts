/**
 * Netlify Function (v2) — receive verified Stripe webhook events.
 *
 * Configure the endpoint in the Stripe Dashboard (Developers → Webhooks) as
 * https://your-site.netlify.app/api/stripe/webhook and copy its signing secret
 * into STRIPE_WEBHOOK_SECRET in the Netlify environment variables.
 *
 * We read the RAW request text (never JSON.parse it first) so Stripe's
 * signature check can validate the exact bytes that were sent.
 */
import { handleStripeEvent, verifyEvent } from "../../src/webhook.js";

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const signature = req.headers.get("stripe-signature") ?? undefined;
  const rawBody = await req.text();

  let event;
  try {
    event = verifyEvent(rawBody, signature);
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid signature";
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    await handleStripeEvent(event);
  } catch (err) {
    console.error("Error handling event:", err);
    return new Response("Handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "content-type": "application/json" },
  });
};

export const config = { path: "/api/stripe/webhook" };
