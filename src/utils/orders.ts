import type { Order, OrderStatus, OrderItem } from "../types";

const STORAGE_KEY = "printora_orders";

export function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `PRT-${num}`;
}

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = getStoredOrders();
  orders.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.slice(0, 50)));
}

export function getOrderById(id: string): Order | undefined {
  return getStoredOrders().find(
    (o) => o.id.toUpperCase() === id.toUpperCase().trim()
  );
}

export function createOrder(params: {
  items: OrderItem[];
  total: number;
  currency: string;
  countryCode: string;
  customerName: string;
  customerEmail: string;
  shippingAddress?: string;
  notes?: string;
}): Order {
  const now = new Date().toISOString();
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 5 + Math.floor(Math.random() * 4));

  const order: Order = {
    id: generateOrderId(),
    createdAt: now,
    status: "Order Placed",
    statusHistory: [{ status: "Order Placed", at: now }],
    items: params.items,
    total: params.total,
    currency: params.currency,
    countryCode: params.countryCode,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    shippingAddress: params.shippingAddress,
    estimatedDelivery: delivery.toLocaleDateString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    notes: params.notes,
  };

  saveOrder(order);
  return order;
}

export const STATUS_FLOW: OrderStatus[] = [
  "Order Placed",
  "Payment Confirmed",
  "Printing",
  "Quality Check",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];
