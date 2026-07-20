/**
 * Stripe works in the smallest currency unit (cents for EUR/USD).
 * These helpers keep the conversion in one place so amounts are never
 * accidentally off by 100×.
 */
import { config } from "./config.js";

/** Convert a human amount (e.g. 1200.50 €) to Stripe minor units (120050). */
export function toMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}

/** Convert Stripe minor units (120050) back to a human amount (1200.5). */
export function fromMinorUnits(minor: number): number {
  return minor / 100;
}

/** Format minor units as a localized currency string, e.g. "1 200,50 €". */
export function formatAmount(
  minor: number,
  currency: string = config.business.currency,
  locale: string = config.business.locale,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(fromMinorUnits(minor));
}
