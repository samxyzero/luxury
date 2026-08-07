"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CornerMarks from "@/components/CornerMarks";
import type { Product } from "@/types/content";

interface ProductCardProps {
  product: Product;
  /**
   * Swaps the card copy to the matching range. Most products serve both
   * audiences, so the useful thing a filter can do is change *what it says*
   * about each one, not just hide the two hotel-only lines.
   */
  audience?: "all" | "homes" | "hotels";
}

export default function ProductCard({ product, audience = "all" }: ProductCardProps) {
  const copy =
    (audience === "homes" ? product.homesSummary : null) ??
    (audience === "hotels" ? product.hotelsSummary : null) ??
    product.shortDescription ??
    product.description;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
          <span className="label absolute left-0 top-0 z-10 bg-paper px-3 py-1.5 text-navy">
            {product.idealFor}
          </span>
          <CornerMarks
            tone="paper"
            inset={12}
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="mt-5 border-t border-stone-on-navy pt-4">
          <p className="label text-gold">{product.category}</p>
          <h3 className="mt-1.5 font-display text-xl font-medium text-paper">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-paper/55">{copy}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-paper/80 transition-colors duration-300 group-hover:text-gold">
            View Details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
