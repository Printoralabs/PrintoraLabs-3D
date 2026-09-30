import type { PricingTier, SizeCategory } from "../types";

export const sizePricing: PricingTier = {
  Tiny: { grams: "5–15g", priceINR: [49, 149], example: "Small charms, tags, mini parts" },
  Small: { grams: "16–40g", priceINR: [150, 349], example: "Keychains, phone stands, small tools" },
  Big: { grams: "41–120g", priceINR: [350, 899], example: "Desk items, medium models, brackets" },
  Massive: { grams: "121g+", priceINR: [900], example: "Large models, helmets, props, bulk parts" },
};

export function estimatePriceINR(weightGrams: number, materialMultiplier = 1): number {
  let base: number;
  if (weightGrams <= 15) base = 49 + (weightGrams - 5) * 8;
  else if (weightGrams <= 40) base = 150 + (weightGrams - 16) * 8;
  else if (weightGrams <= 120) base = 350 + (weightGrams - 41) * 5;
  else base = 900 + (weightGrams - 121) * 3;
  return Math.round(base * materialMultiplier);
}

export function getSizeCategory(weightGrams: number): SizeCategory {
  if (weightGrams <= 15) return "Tiny";
  if (weightGrams <= 40) return "Small";
  if (weightGrams <= 120) return "Big";
  return "Massive";
}
