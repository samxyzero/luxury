"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/types/content";
import SectionLink from "@/components/SectionLink";

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

  // Read the filter client-side so /products stays statically pre-rendered —
  // using searchParams in the page itself would force dynamic rendering.
  // An unknown value falls back to "All" rather than rendering an empty grid.
  const requested = useSearchParams().get("category");
  const [active, setActive] = useState(() =>
    requested && categories.includes(requested) ? requested : "All"
  );

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="products" className="bg-navy py-24 sm:py-32 lg:py-40">
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
          <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-b border-stone-on-navy py-5">
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

        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

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
