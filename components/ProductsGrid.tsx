"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/types/content";

interface ProductsGridProps {
  products: Product[];
  whatsapp: string;
}

export default function ProductsGrid({ products, whatsapp }: ProductsGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="products" className="bg-navy py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-paper/55">Featured Products</span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-paper sm:text-5xl">
            Everything Your Space Deserves
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 sm:text-lg">
            From restful sleep essentials to statement décor — explore our signature
            categories, each chosen for comfort, craftsmanship and lasting quality.
          </p>
        </Reveal>

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

        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} whatsapp={whatsapp} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
