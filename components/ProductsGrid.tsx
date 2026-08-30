"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Home, LayoutGrid } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import SectionLink from "@/components/SectionLink";
import type { Product } from "@/types/content";

type Audience = "all" | "homes" | "hotels";

/** `match` is tested against Product.idealFor, which may read "Homes & Hotels". */
const AUDIENCE: Record<Audience, { label: string; match: string; icon: typeof Home }> = {
  all: { label: "Everything", match: "", icon: LayoutGrid },
  homes: { label: "For Homes", match: "Homes", icon: Home },
  hotels: { label: "For Hotels & Resorts", match: "Hotels", icon: Building2 },
};

interface ProductsGridProps {
  products: Product[];
  /** Rendered heading tag — pages pass "h1", sections within a page keep "h2". */
  as?: "h1" | "h2";
  showFilters?: boolean;
  eyebrow?: string;
  heading?: string;
  accent?: string[];
  intro?: string;
  footerLink?: { href: string; label: string };
}

export default function ProductsGrid({
  products,
  as: Heading = "h2",
  showFilters = true,
  eyebrow = "Our Catalogue",
  heading = "Everything your space deserves",
  accent = ["deserves"],
  intro = "From restful sleep essentials to statement décor — explore our signature categories, each chosen for comfort, craftsmanship and lasting quality.",
  footerLink,
}: ProductsGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  // Read filters client-side so /products stays statically pre-rendered — using
  // searchParams in the page itself would force dynamic rendering. Unknown
  // values fall back to "All" rather than rendering an empty grid.
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
    <section id="products" className="bg-void py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <RevealText
            as={Heading}
            text={heading}
            accent={accent}
            className="lead-tight font-display mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium text-balance"
          />
          <Reveal delay={0.12}>
            <p className="text-ash mt-7 text-lg leading-relaxed text-pretty">{intro}</p>
          </Reveal>
        </div>

        {showFilters && (
          <>
            <Reveal delay={0.08} className="mt-14">
              <p className="mono-label text-slate">Who is it for?</p>
              <div
                role="group"
                aria-label="Filter by who the range is for"
                className="mt-4 flex flex-wrap gap-2.5"
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
                      className={`mono-label relative inline-flex items-center gap-2.5 rounded-full border px-5 py-3.5 transition-colors duration-500 ${
                        selected
                          ? "border-saffron text-void"
                          : "border-smoke text-ash hover:border-bone hover:text-bone"
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="audience-pill"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          className="bg-saffron absolute inset-0 rounded-full"
                        />
                      )}
                      <Icon className="relative h-4 w-4" />
                      <span className="relative">{label}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal
              delay={0.12}
              className="border-smoke mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-b py-5"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={`mono-label relative pb-1 transition-colors duration-300 ${
                    active === category ? "text-bone" : "text-slate hover:text-ash"
                  }`}
                >
                  {category}
                  {active === category && (
                    <motion.span
                      layoutId="product-tab-underline"
                      className="bg-saffron absolute -bottom-[1px] left-0 h-px w-full"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              ))}
            </Reveal>

            <p aria-live="polite" className="mono-label text-slate mt-6">
              {filtered.length} {filtered.length === 1 ? "range" : "ranges"}
              {audience !== "all" && ` ${AUDIENCE[audience].label.toLowerCase()}`}
              {active !== "All" && ` in ${active}`}
            </p>
          </>
        )}

        {filtered.length === 0 ? (
          <div className="border-smoke mt-14 rounded-[2rem] border px-8 py-20 text-center">
            <p className="font-display text-bone text-3xl font-medium">
              Nothing matches that combination
            </p>
            <p className="text-ash mt-3 text-sm">
              Try a different category, or clear the filters to see all{" "}
              {products.length} ranges.
            </p>
            <button
              type="button"
              onClick={() => {
                setAudience("all");
                setActive("All");
              }}
              className="mono-label border-smoke text-bone hover:border-saffron hover:text-saffron mt-8 rounded-full border px-6 py-3.5 transition-colors duration-500"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  audience={audience}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {footerLink && (
          <div className="mt-14">
            <SectionLink href={footerLink.href}>{footerLink.label}</SectionLink>
          </div>
        )}
      </Container>
    </section>
  );
}
