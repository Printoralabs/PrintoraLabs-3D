import type { Material } from "../types";

export const materials: Material[] = [
  {
    id: "PLA",
    name: "PLA",
    description: "Easy to print. Great for prototypes, decorative parts, and everyday objects.",
    multiplier: 1,
    properties: ["Easy to print", "Biodegradable base", "Good detail", "Not for high heat"],
  },
  {
    id: "PETG",
    name: "PETG",
    description: "More durable and slightly flexible. Ideal for functional parts that need strength.",
    multiplier: 1.25,
    properties: ["Durable", "Impact resistant", "Good layer adhesion", "Food-safe grades available"],
  },
  {
    id: "ABS",
    name: "ABS",
    description: "Tough and heat-resistant. Suitable for mechanical parts and outdoor use.",
    multiplier: 1.3,
    properties: ["Heat resistant", "Tough", "Requires enclosure", "Can be smoothed"],
  },
  {
    id: "TPU",
    name: "TPU",
    description: "Flexible and rubber-like. Perfect for phone cases, gaskets, and soft parts.",
    multiplier: 1.5,
    properties: ["Flexible", "Elastic", "Shock absorbing", "Slower print"],
  },
  {
    id: "CF-PLA",
    name: "Carbon Fiber PLA",
    description: "Stiffer and stronger than regular PLA. Excellent for lightweight structural parts.",
    multiplier: 1.8,
    properties: ["High stiffness", "Lightweight", "Premium look", "Abrasive on nozzles"],
  },
];
