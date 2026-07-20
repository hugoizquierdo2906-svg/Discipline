/**
 * Create a shareable Payment Link — e.g. a fixed deposit or "pay for a call".
 *
 *   npm run payment-link -- "Acompte projet motion" 500
 *   npm run payment-link -- "Nom du produit" <montant en euros>
 *
 * Falls back to a sample if no arguments are given.
 */
import { createPaymentLink } from "../src/checkout.js";
import { formatAmount } from "../src/money.js";
import { toMinorUnits } from "../src/money.js";

async function main(): Promise<void> {
  const [nameArg, amountArg] = process.argv.slice(2);
  const name = nameArg ?? "Acompte projet motion design";
  const amount = amountArg ? Number(amountArg) : 500;

  if (Number.isNaN(amount) || amount <= 0) {
    throw new Error(`Invalid amount: "${amountArg}". Pass euros, e.g. 500.`);
  }

  const link = await createPaymentLink({ name, unitAmount: amount });

  console.log(`Product: ${name}`);
  console.log(`Amount:  ${formatAmount(toMinorUnits(amount))}`);
  console.log(`Link:    ${link.url}`);
  console.log("\n✅ Share this link — it's reusable and works until you deactivate it.");
}

main().catch((err) => {
  console.error("❌ Failed to create payment link:", err instanceof Error ? err.message : err);
  process.exit(1);
});
