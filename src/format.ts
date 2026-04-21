/**
 * Format a number as a currency string.
 * 
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string like "$1,234.56"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";
  
  // Handle negative numbers: show minus after symbol (e.g., $-50.00)
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // Always show exactly 2 decimal places
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  // Place minus after symbol ($-50.00 not -$50.00)
  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * 
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip currency symbols ($, €, £) and commas
  const cleaned = str.replace(/[$€£,\s]/g, "");
  return parseFloat(cleaned);
}
