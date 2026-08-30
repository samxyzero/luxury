"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/content";

interface ProductCardProps {
  product: Product;
  /**
   * Swaps the card copy to the matching range. Most products serve both
   * audiences, so the useful thing a filter can do is change *what it says*
   * about each one, not just hide the two hotel-only lines.
   */
  audience?: "all" | "homes" | "hotels";
  index?: number;
}

export default function ProductCard({
  product,
  audience = "all",
  index = 0,
}: ProductCardProps) {
  const copy =
    (audience === "homes" ? product.homesSummary : null) ??
    (audience === "hotels" ? product.hotelsSummary : null) ??
    product.shortDescription ??
    product.description;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="arch bg-char relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
          <div aria-hidden className="scrim-b absolute inset-x-0 bottom-0 h-1/3" />
          <span className="mono-label bg-bone text-void absolute top-5 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1.5 whitespace-nowrap">
            {product.idealFor}
          </span>
          <span className="mono-label text-bone/45 absolute bottom-4 left-5">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="border-smoke mt-5 border-t pt-4">
          <p className="mono-label text-saffron">{product.category}</p>
          <h3 className="font-display text-bone mt-2 text-xl font-medium">
            {product.name}
          </h3>
          <p className="text-ash mt-2 line-clamp-3 text-sm leading-relaxed">{copy}</p>
          <span className="mono-label text-slate group-hover:text-saffron mt-4 inline-flex items-center gap-1.5 transition-colors duration-500">
            View Details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
