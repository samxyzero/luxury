"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import { useMediaQuery } from "@/lib/hooks";

const PATHS = [
  {
    key: "homes",
    eyebrow: "For Homes",
    title: "Furnishing You'll Live With",
    body: "Printed cottons, textured linens, wool underfoot and drapery cut to your windows. Colour and pattern you actually choose, not a fixed trade specification.",
    points: [
      "Colourful & printed cotton",
      "Wool and soft-pile carpets",
      "Decorative poles & tie-backs",
    ],
    href: "/products?for=homes",
    cta: "Furnish my home",
    accent: "text-saffron",
    rule: "bg-saffron",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
  },
  {
    key: "hotels",
    eyebrow: "For Hotels, Resorts & Apartments",
    title: "Specified Once, Repeatable for Years",
    body: "Plain white cotton and linen, blackout that genuinely blacks out, commercial-rated carpet, and stock held so a replacement in year three still matches year one.",
    points: [
      "Plain white, bleach-tolerant linen",
      "Three-pass blackout drapery",
      "Phased floor-by-floor fitting",
    ],
    href: "/products?for=hotels",
    cta: "Specify a property",
    accent: "text-ember",
    rule: "bg-ember",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The site's central distinction, made the first thing after the hero: the
 * household and trade ranges are genuinely different products, and visitors
 * should arrive at the catalogue already knowing which one they are.
 *
 * On a wide screen the two panels compete for the same row — leaning into one
 * takes width from the other, and the supporting detail only unfolds inside the
 * panel that won. Choosing is the interaction, which is the point of the
 * section. Below `lg` they simply stack, fully expanded, because there is no
 * hover to drive it and no width to trade.
 */
export default function DualPath() {
  const [hovered, setHovered] = useState<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="ranges" className="bg-void scroll-mt-28 pt-24 sm:pt-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Eyebrow index={1}>Two Ranges, One Supplier</Eyebrow>
            <RevealText
              as="h2"
              text="Which one are you furnishing?"
              accent={["furnishing?"]}
              className="lead-tight font-display mt-7 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium"
            />
          </div>
          <p className="text-ash max-w-xs text-sm leading-relaxed">
            We stock both, but they are not the same cloth. Pick a side and the
            catalogue changes with you.
          </p>
        </div>
      </Container>

      {/* Full-bleed: the fork should feel like the page splitting, not like two
          more cards inside the same gutters. */}
      <div className="mt-14 flex flex-col lg:h-[38rem] lg:flex-row">
        {PATHS.map((path, i) => {
          const active = hovered === i;
          const dimmed = hovered !== null && !active;

          return (
            <motion.div
              key={path.key}
              animate={{ flexGrow: isDesktop && active ? 1.9 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              onPointerEnter={() => isDesktop && setHovered(i)}
              onPointerLeave={() => isDesktop && setHovered(null)}
              className="relative min-h-[30rem] flex-1 basis-0 overflow-hidden lg:min-h-0"
            >
              <Link href={path.href} className="group block h-full w-full">
                <motion.div
                  animate={{ scale: active ? 1.06 : 1 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={path.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* The losing panel darkens rather than blurs — cheaper, and it
                    keeps its photograph readable while clearly stepping back. */}
                <motion.div
                  animate={{ opacity: dimmed ? 0.9 : active ? 0.62 : 0.75 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="bg-void absolute inset-0"
                />
                <div aria-hidden className="scrim-b absolute inset-x-0 bottom-0 h-2/3" />

                <div className="relative flex h-full flex-col justify-end p-7 sm:p-10 lg:p-14">
                  <div className="flex items-center gap-3">
                    <span className={`mono-label ${path.accent}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`h-px w-10 ${path.rule}`} />
                    <span className="mono-label text-bone/70">{path.eyebrow}</span>
                  </div>

                  <h3 className="font-display lead-tight text-bone mt-5 max-w-md text-[clamp(1.85rem,3.2vw,3rem)] font-medium">
                    {path.title}
                  </h3>

                  {/* The paragraph is the whole argument of this section, so it
                      is never hidden — only the specification bullets are held
                      back, as the reward for leaning in. */}
                  <p className="text-bone/65 mt-5 max-w-md text-sm leading-relaxed">
                    {path.body}
                  </p>

                  {/* Height rather than display, so the list can actually
                      animate open instead of popping into place. */}
                  <motion.div
                    animate={{
                      height: !isDesktop || active ? "auto" : 0,
                      opacity: !isDesktop || active ? 1 : 0,
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="border-bone/15 mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t pt-5">
                      {path.points.map((point) => (
                        <li key={point} className="mono-label text-bone/45">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <span className="mono-label text-bone group-hover:text-saffron mt-8 inline-flex items-center gap-2 transition-colors duration-500">
                    {path.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
