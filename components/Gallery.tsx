"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import GalleryLightbox from "@/components/GalleryLightbox";
import SectionLink from "@/components/SectionLink";
import type { GalleryItem } from "@/types/content";

interface GalleryProps {
  items: GalleryItem[];
  /** Rendered heading tag — pages pass "h1", sections within a page keep "h2". */
  as?: "h1" | "h2";
  footerLink?: { href: string; label: string };
}

export default function Gallery({ items, as: Heading = "h2", footerLink }: GalleryProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="gallery" className="bg-void py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Selected Work</Eyebrow>
          <RevealText
            as={Heading}
            text="Homes, hotels and resorts we have furnished"
            accent={["furnished"]}
            className="lead-tight font-display mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium text-balance"
          />
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-2.5">
          {categories.map((category) => {
            const selected = active === category;
            return (
              <button
                key={category}
                onClick={() => setActive(category)}
                aria-pressed={selected}
                className={`mono-label relative rounded-full border px-5 py-3 transition-colors duration-500 ${
                  selected
                    ? "border-saffron text-void"
                    : "border-smoke text-ash hover:border-bone hover:text-bone"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="gallery-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="bg-saffron absolute inset-0 rounded-full"
                  />
                )}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </Reveal>

        {/* CSS columns rather than a grid: the captions sit under images of
            genuinely different heights, and masonry is the only layout that
            does not either crop them all to one ratio or leave holes. */}
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filtered.map((item, i) => {
            const globalIndex = items.findIndex((g) => g.id === item.id);
            const tall = i % 3 === 0;
            return (
              <motion.button
                key={item.id}
                layout
                onClick={() => setActiveIndex(globalIndex)}
                data-cursor="Open"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 6) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group mb-8 block w-full break-inside-avoid text-left"
              >
                {/* Every third frame is arched, so the wall has a rhythm
                    without needing a second layout. */}
                <div
                  className={`bg-char relative overflow-hidden ${
                    tall ? "arch" : "rounded-[1.5rem]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.caption}
                    width={700}
                    height={tall ? 900 : 560}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="bg-void/0 group-hover:bg-void/35 absolute inset-0 transition-colors duration-500" />
                  <span className="bg-bone text-void absolute right-4 bottom-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-3.5 flex items-baseline justify-between gap-3">
                  <span className="text-bone text-sm font-medium">{item.caption}</span>
                  <span className="mono-label text-slate shrink-0">{item.category}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {footerLink && (
          <div className="mt-14">
            <SectionLink href={footerLink.href}>{footerLink.label}</SectionLink>
          </div>
        )}
      </Container>

      <GalleryLightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
