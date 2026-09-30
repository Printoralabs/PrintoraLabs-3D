import type { Country } from "../types";
import { countries, defaultCountry } from "../data/countries";

export function formatPrice(amountINR: number, country: Country = defaultCountry): string {
  const local = amountINR * country.rateFromINR;
  const rounded = country.currency === "INR" ? Math.round(local) : Math.round(local * 100) / 100;
  if (country.currency === "INR") {
    return `${country.currencySymbol}${rounded}`;
  }
  return `${country.currencySymbol}${rounded.toFixed(2)}`;
}

export function formatPriceRange(minINR: number, maxINR: number | undefined, country: Country = defaultCountry): string {
  if (maxINR === undefined) {
    return `${formatPrice(minINR, country)}+`;
  }
  return `${formatPrice(minINR, country)}–${formatPrice(maxINR, country)}`;
}

export function getCountryByCode(code: string): Country {
  return countries.find((c) => c.code === code) || defaultCountry;
}
