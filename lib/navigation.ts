export interface NavItem {
  label: string;
  href: string;
}

/**
 * Single source of truth for site navigation. Header, mobile menu, footer and
 * sitemap all read from here, so adding a route (a future /shop or /cart)
 * means editing one list.
 */
/**
 * Deliberately short. Reviews now sit on the homepage and FAQ is folded into
 * /contact, which keeps the header to five items and no dropdowns.
 */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_EXPLORE: NavItem[] = PRIMARY_NAV;

/** Marketing copy for the homepage "how it works" block. */
export const PROCESS_STEPS = [
  {
    title: "Consult",
    body: "Tell us the space, the use and the budget. We talk through fabrics, finishes and what actually holds up.",
  },
  {
    title: "Measure",
    body: "We measure on site — windows, floors, beds — so nothing is guessed and nothing arrives the wrong size.",
  },
  {
    title: "Deliver",
    body: "Stock is confirmed and delivered on an agreed date, phased floor by floor for properties still trading.",
  },
  {
    title: "Install",
    body: "Our own fitters hang, lay and finish the work, then clear the site. One team, start to finish.",
  },
] as const;
