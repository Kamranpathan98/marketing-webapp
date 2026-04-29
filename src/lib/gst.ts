/**
 * Calculate GST amount for a given price and rate.
 * Uses Math.floor — matches Indian TDS/GST rounding convention.
 */
export function calcGST(price: number, rate: number): number {
  return Math.floor(price * rate / 100)
}

/**
 * Calculate CGST and SGST split (equal halves of total GST).
 */
export function calcGSTSplit(price: number, rate: number): { cgst: number; sgst: number } {
  const total = calcGST(price, rate)
  const half = Math.floor(total / 2)
  return { cgst: half, sgst: total - half }
}
