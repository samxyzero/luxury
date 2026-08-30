"use client";

import { useCallback, useEffect } from "react";
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

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  // Arrow keys and Escape — the obvious controls for a full-screen viewer, and
  // the only ones available to anyone not using a mouse.
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          className="bg-pitch/97 fixed inset-0 z-[90] flex items-center justify-center p-4 backdrop-blur-md sm:p-10"
          onClick={onClose}
        >
          {[
            { label: "Close gallery", onClick: onClose, Icon: X, pos: "top-5 right-5" },
            {
              label: "Previous image",
              onClick: goPrev,
              Icon: ChevronLeft,
              pos: "top-1/2 left-3 -translate-y-1/2 sm:left-6",
            },
            {
              label: "Next image",
              onClick: goNext,
              Icon: ChevronRight,
              pos: "top-1/2 right-3 -translate-y-1/2 sm:right-6",
            },
          ].map(({ label, onClick, Icon, pos }) => (
            <button
              key={label}
              aria-label={label}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className={`border-smoke text-bone hover:bg-bone hover:text-void absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${pos}`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}

          <motion.figure
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 900px, 100vw"
              />
            </div>
            <figcaption className="border-smoke flex items-baseline justify-between gap-4 border-t py-4">
              <p className="font-display text-bone text-lg">{item.caption}</p>
              <p className="mono-label text-saffron shrink-0">
                {(activeIndex ?? 0) + 1} / {items.length} · {item.category}
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
