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

/**
 * Maps a colour name to a swatch. Unknown names fall through to a neutral chip
 * rather than rendering nothing, so new colours never break the UI.
 */
const SWATCHES: Record<string, string> = {
  white: "#FFFFFF",
  ivory: "#F4EFE4",
  cream: "#F3EAD8",
  pearlgrey: "#D8D6D1",
  stone: "#D6CFC1",
  sand: "#DCCDB4",
  taupe: "#B8A894",
  naturallinen: "#D9CFBC",
  natural: "#D9CFBC",
  champagne: "#E6D5B8",
  sage: "#A8B5A0",
  moss: "#7C8B6A",
  olive: "#6B7048",
  forest: "#2F4739",
  teal: "#28666E",
  navy: "#10203A",
  deepblue: "#1B3A5C",
  indigo: "#33406B",
  slate: "#5A6672",
  grey: "#9A9A96",
  charcoal: "#3A3A38",
  espresso: "#4A342A",
  brushedbrass: "#B08D57",
  antiquebronze: "#6E5439",
  mattblack: "#1C1B18",
  matteblack: "#1C1B18",
  naturalwood: "#B08A5F",
  rust: "#9C4A2E",
  burgundy: "#6B2136",
  dustyrose: "#C9A6A0",
};

export function colorSwatch(name: string): string | null {
  return SWATCHES[name.toLowerCase().replace(/[^a-z]/g, "")] ?? null;
}
