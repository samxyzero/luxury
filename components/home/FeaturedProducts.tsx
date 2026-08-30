"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import { useMediaQuery } from "@/lib/hooks";
import type { Product } from "@/types/content";

interface FeaturedProductsProps {
  products: Product[];
  /** Shown on the trailing card so the link states the real catalogue size. */
  total: number;
}

/** One card, shared by both the pinned rail and the mobile swipe track. */
function RangeCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-[78vw] shrink-0 sm:w-[24rem]"
    >
      <div className="arch bg-char relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 640px) 24rem, 78vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div aria-hidden className="scrim-b absolute inset-x-0 bottom-0 h-1/2" />
        <span className="mono-label bg-bone text-void absolute top-5 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1.5">
          {product.idealFor}
        </span>
        <span className="mono-label text-bone/50 absolute bottom-5 left-6">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="border-smoke mt-5 flex items-start justify-between gap-4 border-t pt-5">
        <div className="min-w-0">
          <p className="mono-label text-saffron">{product.category}</p>
          <h3 className="font-display text-bone mt-2 text-2xl font-medium">
            {product.name}
          </h3>
          <p className="text-ash mt-2 line-clamp-2 text-sm leading-relaxed">
            {product.shortDescription ?? product.description}
          </p>
        </div>
        <ArrowUpRight className="text-slate group-hover:text-saffron mt-1 h-5 w-5 shrink-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

function AllRangesCard({ total }: { total: number }) {
  return (
    <Link
      href="/products"
      className="group border-smoke hover:border-saffron flex h-full min-h-[22rem] w-[78vw] shrink-0 flex-col justify-between gap-8 rounded-[2rem] border p-8 transition-colors duration-500 sm:w-[20rem]"
    >
      <span className="mono-label text-slate">The Full Catalogue</span>
      <span>
        <span className="font-display text-bone group-hover:text-saffron block text-[4rem] leading-none font-medium transition-colors duration-500">
          {total}
        </span>
        <span className="mono-label text-ash mt-3 block">Ranges in stock</span>
      </span>
      <span className="mono-label text-bone group-hover:text-saffron inline-flex items-center gap-2 transition-colors duration-500">
        Browse everything
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}

/**
 * On a wide screen this section pins to the viewport and turns the page's
 * vertical scroll into horizontal travel along the ranges — the catalogue is
 * laid out the way a bolt of cloth actually unrolls, and it is the one moment
 * on the site where scrolling does something other than what you expect.
 *
 * The distance is measured rather than guessed: the section is made exactly as
 * tall as the track is wide, so one pixel of scroll is one pixel of travel and
 * the rail never finishes early or runs out of runway.
 *
 * Below `lg` the pinning is dropped entirely for a plain swipe track. Taking
 * over the scroll of a device whose only scroll gesture is a finger drag is a
 * good way to trap someone on a page.
 */
export default function FeaturedProducts({ products, total }: FeaturedProductsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isDesktop) {
      setDistance(0);
      return;
    }
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 96));

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop, products.length]);

  if (products.length === 0) return null;

  const header = (
    <Container className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-xl">
        <Eyebrow index={3}>Signature Ranges</Eyebrow>
        <RevealText
          as="h2"
          text="What we are known for"
          accent={["known", "for"]}
          className="lead-tight font-display mt-6 text-[clamp(2.25rem,5vw,4rem)] font-medium"
        />
      </div>
      <p className="mono-label text-slate hidden items-center gap-3 lg:flex">
        <span className="bg-smoke h-px w-10" />
        Scroll to travel the rail
      </p>
    </Container>
  );

  return (
    <div
      ref={sectionRef}
      // Extra viewport height is the runway the sticky child rides down.
      style={isDesktop && distance ? { height: distance + window.innerHeight } : undefined}
      className="bg-void relative"
    >
      <section className="flex flex-col justify-center overflow-hidden py-24 sm:py-32 lg:sticky lg:top-0 lg:h-svh lg:py-0">
        {header}

        <motion.div
          ref={trackRef}
          style={isDesktop ? { x } : undefined}
          // Two mutually exclusive width utilities would collide in one class
          // list, so the branch picks exactly one.
          className={`mt-12 flex items-stretch gap-6 px-5 sm:gap-8 sm:px-8 lg:mt-14 lg:px-14 ${
            isDesktop
              ? "w-max"
              : "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none]"
          }`}
        >
          {products.map((product, i) => (
            <div key={product.id} className="snap-start">
              <RangeCard product={product} index={i} />
            </div>
          ))}
          <div className="snap-start self-stretch">
            <AllRangesCard total={total} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
