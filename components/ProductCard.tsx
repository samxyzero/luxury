"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/content";

interface ProductCardProps {
  product: Product;
  whatsapp: string;
}

export default function ProductCard({ product, whatsapp }: ProductCardProps) {
  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Hi Luxury Enterprises, I'd like a quote for ${product.name}.`
  )}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl bg-navy-950 shadow-[0_20px_40px_-16px_rgba(19,26,58,0.4)]"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
      </div>

      <div className="glass-card absolute inset-x-3 bottom-3 rounded-xl p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-navy-600">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-navy-950">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70 line-clamp-2">
          {product.description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors"
        >
          Get Quote
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}
