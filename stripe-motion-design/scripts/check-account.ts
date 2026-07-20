/**
 * Sanity check: confirms your API key works and shows which account + mode
 * you're pointed at. Run this first, before anything else:
 *
 *   npm run account
 */
import { stripe } from "../src/stripe.js";
import { config } from "../src/config.js";
import { formatAmount } from "../src/money.js";

async function main(): Promise<void> {
  const account = await stripe.accounts.retrieveCurrent();
  const balance = await stripe.balance.retrieve();

  console.log(`Mode:      ${config.stripe.isLive ? "LIVE ⚠️" : "test"}`);
  console.log(`Account:   ${account.id}`);
  console.log(`Business:  ${account.business_profile?.name ?? account.email ?? "—"}`);
  console.log(`Country:   ${account.country ?? "—"}`);
  console.log(`Charges:   ${account.charges_enabled ? "enabled" : "not enabled yet"}`);
  console.log(`Payouts:   ${account.payouts_enabled ? "enabled" : "not enabled yet"}`);

  const available = balance.available
    .map((b) => formatAmount(b.amount, b.currency))
    .join(", ");
  console.log(`Available: ${available || "0"}`);
  console.log("\n✅ Your Stripe key works.");
}

main().catch((err) => {
  console.error("❌ Could not reach Stripe:", err instanceof Error ? err.message : err);
  process.exit(1);
});
