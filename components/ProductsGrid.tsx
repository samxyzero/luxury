"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { Building2, Home, LayoutGrid } from "lucide-react";
import type { Product } from "@/types/content";
import SectionLink from "@/components/SectionLink";

type Audience = "all" | "homes" | "hotels";

/** `match` is tested against Product.idealFor, which may read "Homes & Hotels". */
const AUDIENCE: Record<Audience, { label: string; match: string; icon: typeof Home }> = {
  all: { label: "Everything", match: "", icon: LayoutGrid },
  homes: { label: "For Homes", match: "Homes", icon: Home },
  hotels: { label: "For Hotels & Resorts", match: "Hotels", icon: Building2 },
};

interface ProductsGridProps {
  products: Product[];
  /** Rendered heading tag — pages pass "h1", homepage sections keep "h2". */
  as?: "h1" | "h2";
  /** Hidden on the homepage, which shows a featured subset rather than the full catalogue. */
  showFilters?: boolean;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Homepage teaser CTA linking to the full page. */
  footerLink?: { href: string; label: string };
}

export default function ProductsGrid({
  products,
  as: Heading = "h2",
  showFilters = true,
  eyebrow = "Featured Products",
  heading = "Everything Your Space Deserves",
  intro = "From restful sleep essentials to statement décor — explore our signature categories, each chosen for comfort, craftsmanship and lasting quality.",
  footerLink,
}: ProductsGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  // Read filters client-side so /products stays statically pre-rendered —
  // using searchParams in the page itself would force dynamic rendering.
  // Unknown values fall back to "All" rather than rendering an empty grid.
  const params = useSearchParams();
  const requestedCategory = params.get("category");
  const requestedAudience = params.get("for");

  const [active, setActive] = useState(() =>
    requestedCategory && categories.includes(requestedCategory) ? requestedCategory : "All"
  );
  const [audience, setAudience] = useState<Audience>(() =>
    requestedAudience === "homes" || requestedAudience === "hotels"
      ? requestedAudience
      : "all"
  );

  const filtered = useMemo(
    () =>
      products
        // "Homes & Hotels" products belong to both ranges, so they survive
        // either audience filter rather than being excluded from both.
        .filter((p) => audience === "all" || p.idealFor.includes(AUDIENCE[audience].match))
        .filter((p) => active === "All" || p.category === active),
    [products, audience, active]
  );

  return (
    <section id="products" className="bg-navy py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-paper/55">{eyebrow}</span>
          </div>
          <Heading className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-paper sm:text-5xl">
            {heading}
          </Heading>
          <p className="mt-6 text-base leading-relaxed text-paper/60 sm:text-lg">{intro}</p>
        </Reveal>

        {showFilters && (
          <Reveal delay={0.08} className="mt-12">
            <p className="label text-paper/45">Who is it for?</p>
            <div
              role="group"
              aria-label="Filter by who the range is for"
              className="mt-4 flex flex-wrap gap-3"
            >
              {(Object.keys(AUDIENCE) as Audience[]).map((key) => {
                const { label, icon: Icon } = AUDIENCE[key];
                const selected = audience === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAudience(key)}
                    aria-pressed={selected}
                    className={`label inline-flex items-center gap-2.5 border px-5 py-3.5 transition-colors duration-300 ${
                      selected
                        ? "border-gold bg-gold text-navy"
                        : "border-stone-on-navy text-paper/70 hover:border-gold hover:text-gold"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        {showFilters && (
          <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-b border-stone-on-navy py-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`label relative pb-1 transition-colors duration-300 ${
                  active === category ? "text-paper" : "text-paper/45 hover:text-paper/75"
                }`}
              >
                {category}
                {active === category && (
                  <motion.span
                    layoutId="product-tab-underline"
                    className="absolute -bottom-[1px] left-0 h-px w-full bg-gold"
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </button>
            ))}
          </Reveal>
        )}

        {showFilters && (
          <p aria-live="polite" className="mt-6 text-sm text-paper/45">
            {filtered.length} {filtered.length === 1 ? "range" : "ranges"}
            {audience !== "all" && ` ${AUDIENCE[audience].label.toLowerCase()}`}
            {active !== "All" && ` in ${active}`}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="mt-14 border border-stone-on-navy px-8 py-16 text-center">
            <p className="font-display text-2xl font-medium text-paper">
              Nothing matches that combination
            </p>
            <p className="mt-3 text-sm text-paper/55">
              Try a different category, or clear the filters to see all {products.length}{" "}
              ranges.
            </p>
            <button
              type="button"
              onClick={() => {
                setAudience("all");
                setActive("All");
              }}
              className="label mt-8 border border-stone-on-navy px-6 py-3.5 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} audience={audience} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {footerLink && (
          <div className="mt-14">
            <SectionLink href={footerLink.href} tone="paper">
              {footerLink.label}
            </SectionLink>
          </div>
        )}
      </div>
    </section>
  );
}
