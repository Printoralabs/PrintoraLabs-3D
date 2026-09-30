export type SizeCategory = "Tiny" | "Small" | "Big" | "Massive";

export type MaterialId = "PLA" | "PETG" | "ABS" | "TPU" | "CF-PLA";

export type OrderStatus =
  | "Order Placed"
  | "Payment Confirmed"
  | "Printing"
  | "Quality Check"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  rateFromINR: number;
}

export interface Material {
  id: MaterialId;
  name: string;
  description: string;
  multiplier: number;
  properties: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  sizeCategory: SizeCategory;
  weightGrams: number;
  basePriceINR: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  materialOptions: MaterialId[];
}

export interface PrintableModel {
  id: string;
  name: string;
  creator: string;
  image: string;
  likes: number;
  downloads: number;
  printTime: string;
  filamentGrams: number;
  rating: number;
  tags: string[];
  category: string;
}

export interface OrderItem {
  productId?: string;
  productName: string;
  quantity: number;
  material: MaterialId;
  color: string;
  sizeCategory: SizeCategory;
  weightGrams: number;
  unitPrice: number;
  currency: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; at: string }[];
  items: OrderItem[];
  total: number;
  currency: string;
  countryCode: string;
  customerName: string;
  customerEmail: string;
  shippingAddress?: string;
  estimatedDelivery: string;
  notes?: string;
}

export interface PricingTier {
  [key: string]: {
    grams: string;
    priceINR: [number, number] | [number];
    example: string;
  };
}
