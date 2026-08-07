/**
 * Prices are stored in minor units (paisa) so arithmetic stays integer-safe —
 * the usual rule for anything that will eventually run a cart and totals.
 */
export function formatPrice(minorUnits: number, currency = "NPR"): string {
  const major = minorUnits / 100;
  try {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency,
      maximumFractionDigits: major % 1 === 0 ? 0 : 2,
    }).format(major);
  } catch {
    // Unknown currency code — fall back to a plain grouped number.
    return `${currency} ${major.toLocaleString("en-NP")}`;
  }
}

/** "a, b and c" — used for colour and material lists. */
export function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Trims to a whole word and appends an ellipsis, for meta descriptions. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

