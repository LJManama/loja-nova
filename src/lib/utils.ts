import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  const formatted = new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
  }).format(price)
  // Replace MT or MTn with MZN
  return formatted.replace(/MTn?/g, 'MZN')
}

export function formatDiscount(discount: number) {
  return `${discount}% OFF`
}
