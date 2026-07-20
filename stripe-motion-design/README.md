# stripe-motion-design

A small, self-contained **Stripe integration for a motion-design freelance
business** — the two things you actually need to get paid:

- **Invoicing** — bill companies for projects (line items, net-30 terms, a PDF
  and a hosted "pay online" page, sent by email).
- **Payments** — one-off card payments via Stripe-hosted Checkout, plus
  reusable Payment Links for deposits.

It is written in TypeScript against the official `stripe` SDK, runs anywhere
Node runs, and ships with both a tiny Express server and **Netlify Functions**
(so it drops straight into your Netlify site).

> **Independent of the app it sits beside.** This folder was added to the
> `Discipline` repo only because that's where the branch lives. It shares **no
> code** with that app and is meant to be **copied into your motion-design
> project**. Nothing here imports from, or affects, `../src`.

---

## Why this shape (the plan)

Your business bills **companies** for creative work. That maps to two Stripe
products:

| Need | Stripe feature | In this repo |
|---|---|---|
| Send a company a proper invoice they pay online | **Invoicing** (`invoices` + `invoiceItems`) | `src/invoices.ts`, `scripts/send-invoice.ts` |
| Take an immediate one-off payment (deposit, fixed gig) | **Checkout** (`mode: payment`) | `src/checkout.ts`, `POST /api/checkout` |
| A shareable "pay this" URL | **Payment Links** | `src/checkout.ts`, `scripts/create-payment-link.ts` |
| Know for sure when you've been paid | **Webhooks** | `src/webhook.ts`, `/api/stripe/webhook` |

Everything runs **server-side** with your secret key. Card data never touches
your servers — Stripe hosts the payment pages.

### When to use which

- **Invoicing** → your default for client work. You know the company, the
  amount, and the terms. They get an email with a PDF and a pay-online button;
  Stripe can chase late payers for you.
- **Checkout / Payment Links** → when you want money *now* without composing a
  full invoice — a booking deposit, a small fixed-price add-on, a "pay here"
  button on your site.

---

## File map

```
stripe-motion-design/
├── src/
│   ├── config.ts        # env vars, validated once at startup
│   ├── stripe.ts        # the one configured Stripe client (server-only)
│   ├── money.ts         # euros ⇄ cents, localized formatting
│   ├── customers.ts     # find-or-create the company you're billing
│   ├── invoices.ts      # create → finalize → send an invoice   ← core
│   ├── checkout.ts      # one-off Checkout Sessions + Payment Links
│   ├── webhook.ts       # verify + handle Stripe events
│   └── server.ts        # Express: POST /api/checkout, POST /api/stripe/webhook
├── scripts/
│   ├── check-account.ts # `npm run account`      — verify your key works
│   ├── send-invoice.ts  # `npm run invoice`       — send a real (test) invoice
│   └── create-payment-link.ts  # `npm run payment-link -- "Deposit" 500`
├── netlify/functions/   # same endpoints as serverless functions
│   ├── create-checkout.ts
│   └── stripe-webhook.ts
├── netlify.toml
└── .env.example
```

---

## Setup

**1. Install** (from inside this folder):

```bash
cd stripe-motion-design
npm install
```

**2. Get your keys.** In the [Stripe Dashboard](https://dashboard.stripe.com),
stay in **Test mode** (toggle, top-right) → **Developers → API keys**. Copy the
**Secret key** (`sk_test_…`) and **Publishable key** (`pk_test_…`).

**3. Configure:**

```bash
cp .env.example .env
# edit .env and paste your test keys
```

**4. Verify the key works:**

```bash
npm run account
# → shows your account id, country, and "test" mode
```

> **Security:** `.env` is git-ignored — never commit it. The **secret key is
> server-side only**; it must never appear in browser code or a public repo. If
> a key ever leaks, roll it in the Dashboard immediately. I did **not** ask you
> to paste keys into chat, and you shouldn't need to.

---

## Send your first invoice (test mode)

1. Open `scripts/send-invoice.ts` and edit the `invoice` object — the client's
   name/email and the lines you delivered.
2. Run it:

```bash
npm run invoice
```

You'll get an invoice number, the total, and a **hosted pay page URL**. Open
that URL to see exactly what your client sees, and pay it with Stripe's
[test card](https://docs.stripe.com/testing) `4242 4242 4242 4242`, any future
expiry, any CVC.

> In **test mode** Stripe may not actually deliver the email — use the printed
> `Pay page` / `PDF` URLs to preview. In **live mode** the client is emailed.
> Set `send: false` in the script to create an editable **draft** instead.

---

## Take a one-off payment

**Shareable link** (no server needed):

```bash
npm run payment-link -- "Acompte projet motion" 500
# → prints a reusable https://buy.stripe.com/... URL
```

**From your site** (server running — see below): `POST /api/checkout`

```bash
curl -X POST http://localhost:4242/api/checkout \
  -H "content-type: application/json" \
  -d '{"items":[{"name":"Acompte projet","unitAmount":500}],"customerEmail":"client@exemple.com"}'
# → { "url": "https://checkout.stripe.com/..." }  then redirect the browser there
```

---

## Run the server + test webhooks

```bash
npm run dev          # starts http://localhost:4242
```

In a second terminal, use the [Stripe CLI](https://docs.stripe.com/stripe-cli)
to forward events to your local webhook and get a signing secret:

```bash
stripe listen --forward-to localhost:4242/api/stripe/webhook
# copy the whsec_... it prints into STRIPE_WEBHOOK_SECRET in .env, then restart the server
```

Trigger a test event:

```bash
stripe trigger invoice.paid
stripe trigger checkout.session.completed
```

The server logs the handled event. **Webhooks are the source of truth** for
"you got paid" — a browser redirect is not (the tab can close first). Events
handled: `invoice.paid`, `invoice.payment_failed`, `invoice.finalized`,
`checkout.session.completed`. Extend the switch in `src/webhook.ts`.

---

## Deploy to your Netlify site

The `netlify/functions` folder mirrors the server as serverless functions at
`/api/checkout` and `/api/stripe/webhook`.

1. Copy this folder into your motion-design project (or set its root as a
   Netlify base).
2. In **Netlify → Site settings → Environment variables**, add the same vars
   from `.env.example` (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, etc.).
3. In **Stripe → Developers → Webhooks**, add an endpoint:
   `https://<your-site>.netlify.app/api/stripe/webhook`, then copy its signing
   secret into `STRIPE_WEBHOOK_SECRET`.

---

## France / B2B specifics (already wired in)

- **Currency `eur`, locale `fr`** — set in `.env`; hosted pages and Checkout
  render in French.
- **Invoice footer** defaults to `TVA non applicable, art. 293 B du CGI` — the
  standard mention for a **micro-entreprise** not charging VAT. Change
  `INVOICE_FOOTER` in `.env` if you *are* VAT-registered (and then add tax
  rates to your line items).
- **Company VAT numbers** — pass `taxId: { type: "eu_vat", value: "FR…" }` when
  creating a customer (`src/customers.ts`); it prints on the invoice.
- **PO / project reference** — the `reference` field on an invoice becomes a
  labelled custom field ("Référence") on the document.
- **Net terms** — `INVOICE_DAYS_UNTIL_DUE` (default 30). Enable automatic
  reminders for unpaid invoices in **Dashboard → Settings → Invoicing**.

> Not tax advice — confirm your obligations (TVA thresholds, mandatory invoice
> mentions, e-invoicing rules) with your accountant.

---

## Test → Live checklist

- [ ] Activate your account in the Dashboard (business + bank details).
- [ ] Swap `sk_test_…`/`pk_test_…` for `sk_live_…`/`pk_live_…` in production env.
- [ ] Create a **live** webhook endpoint and use its **live** signing secret.
- [ ] Do one real, small end-to-end payment and confirm the payout lands.
- [ ] Turn on invoice payment reminders and set your branding/logo in Stripe.
- [ ] Confirm your invoice legal mentions with your accountant.

`npm run account` prints `LIVE ⚠️` when a live key is active — a quick guard
against sending test invoices in production or vice-versa.

---

## Optional: the Stripe MCP + AI planner

This build didn't use Stripe's `stripe_implementation_planner` because the
Stripe MCP server wasn't connected in the session. To enable it for future
work: in **claude.ai → Settings → Connectors**, add **Stripe**
(`https://mcp.stripe.com`), complete the OAuth login, enable it for the chat,
and the `stripe_*` tools — including the planner — become available.
```
