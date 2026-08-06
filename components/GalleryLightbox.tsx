"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types/content";

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const item = activeIndex !== null ? items[activeIndex] : null;

  const goPrev = () => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  };
  const goNext = () => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy p-4 sm:p-10"
          onClick={onClose}
        >
          <button
            aria-label="Close gallery"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-stone-on-navy text-paper transition-colors duration-300 hover:bg-paper hover:text-navy"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-stone-on-navy text-paper transition-colors duration-300 hover:bg-paper hover:text-navy sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-stone-on-navy text-paper transition-colors duration-300 hover:bg-paper hover:text-navy sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 900px, 100vw"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-stone-on-navy py-4">
              <p className="font-display text-lg text-paper">{item.caption}</p>
              <p className="label shrink-0 text-gold">{item.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
