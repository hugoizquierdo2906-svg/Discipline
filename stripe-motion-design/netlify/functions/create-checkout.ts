/**
 * Netlify Function (v2) — start a one-off payment from your Netlify site.
 *
 * Front-end: POST /api/checkout  { items: [{ name, unitAmount }], customerEmail? }
 *            then redirect the browser to the returned `url`.
 *
 * Set STRIPE_SECRET_KEY (and the other vars from .env.example) in the Netlify
 * dashboard → Site settings → Environment variables.
 */
import { createCheckoutSession } from "../../src/checkout.js";

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = (await req.json()) as {
      items?: unknown;
      customerEmail?: string;
      metadata?: Record<string, string>;
    };

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return json({ error: "Provide a non-empty `items` array." }, 400);
    }

    const session = await createCheckoutSession({
      items: body.items,
      customerEmail: body.customerEmail,
      metadata: body.metadata,
    });
    return json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return json({ error: message }, 500);
  }
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const config = { path: "/api/checkout" };
