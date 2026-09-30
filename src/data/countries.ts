import type { Country } from "../types";

export const countries: Country[] = [
  { code: "IN", name: "India", currency: "INR", currencySymbol: "₹", flag: "🇮🇳", rateFromINR: 1 },
  { code: "US", name: "United States", currency: "USD", currencySymbol: "$", flag: "🇺🇸", rateFromINR: 0.012 },
  { code: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "£", flag: "🇬🇧", rateFromINR: 0.0095 },
  { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "C$", flag: "🇨🇦", rateFromINR: 0.016 },
  { code: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", flag: "🇦🇺", rateFromINR: 0.018 },
  { code: "EU", name: "European Union", currency: "EUR", currencySymbol: "€", flag: "🇪🇺", rateFromINR: 0.011 },
];

export const defaultCountry = countries[0];
