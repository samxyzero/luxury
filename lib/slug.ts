/**
 * URL-safe slug for product detail pages. Kept deliberately simple and
 * ASCII-only so the resulting paths stay readable and stable in sitemaps.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

/**
 * Appends -2, -3, ... until the slug is unique against `taken`.
 */
export function uniqueSlug(base: string, taken: Set<string>): string {
  const root = base || "product";
  if (!taken.has(root)) return root;
  let n = 2;
  while (taken.has(`${root}-${n}`)) n += 1;
  return `${root}-${n}`;
}
