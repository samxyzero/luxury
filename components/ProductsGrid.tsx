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
    <section id="products" className="relative bg-navy-950 py-24 sm:py-32 bg-grain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span className="h-px w-8 bg-gold-500" />
            Featured Products
            <span className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Everything Your Space Deserves
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/65 leading-relaxed">
            From restful sleep essentials to statement décor — explore our signature
            categories, each chosen for comfort, craftsmanship and lasting quality.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === category
                  ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-[0_8px_20px_-6px_rgba(201,162,75,0.6)]"
                  : "glass-navy text-white/70 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
