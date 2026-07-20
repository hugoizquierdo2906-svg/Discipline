/**
 * Customers = the companies you bill.
 *
 * Stripe lets you create duplicate customers with the same email, which makes
 * a mess of your Dashboard over time. `findOrCreateCustomer` looks up an
 * existing customer by email first and reuses it, so re-invoicing the same
 * client stays clean.
 */
import { stripe, type Stripe } from "./stripe.js";

export interface CompanyInput {
  /** Billing contact email — the invoice is sent here. Required. */
  email: string;
  /** Company (or contact) name shown on the invoice. */
  name: string;
  /** Optional postal address, printed on the invoice. */
  address?: Stripe.AddressParam;
  /** Free-form phone number. */
  phone?: string;
  /**
   * Optional EU VAT number, e.g. { type: "eu_vat", value: "FR12345678901" }.
   * See https://docs.stripe.com/invoicing/customer/tax-ids for valid types.
   */
  taxId?: { type: Stripe.TaxIdCreateParams.Type; value: string };
  /**
   * Language for this client's invoice emails, hosted page and PDF
   * (e.g. "en" for a US client). Defaults to "fr".
   */
  locale?: string;
}

/** Find a customer by exact email, or create one if none exists. */
export async function findOrCreateCustomer(
  input: CompanyInput,
): Promise<Stripe.Customer> {
  const existing = await stripe.customers.list({ email: input.email, limit: 1 });
  const found = existing.data[0];
  if (found) {
    return found;
  }

  const customer = await stripe.customers.create({
    email: input.email,
    name: input.name,
    address: input.address,
    phone: input.phone,
    preferred_locales: [input.locale ?? "fr"],
  });

  if (input.taxId) {
    await stripe.customers.createTaxId(customer.id, {
      type: input.taxId.type,
      value: input.taxId.value,
    });
  }

  return customer;
}
