import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an INR price in Indian numbering style ("₹1.25 Cr", "₹85 L").
 * Returns null-safe empty string for missing prices.
 */
export function formatPrice(price: number | null): string {
  if (price == null) return "";
  if (price >= 1_00_00_000) {
    const cr = price / 1_00_00_000;
    return `₹${trim(cr)} Cr`;
  }
  if (price >= 1_00_000) {
    const l = price / 1_00_000;
    return `₹${trim(l)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

function trim(n: number) {
  const rounded = Math.round(n * 100) / 100;
  return rounded.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}
