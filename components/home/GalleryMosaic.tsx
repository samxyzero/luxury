import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/Reveal";
import type { GalleryItem } from "@/types/content";

interface GalleryMosaicProps {
  items: GalleryItem[];
}

/** Asymmetric mosaic — a different shape from every other block on the page. */
export default function GalleryMosaic({ items }: GalleryMosaicProps) {
  if (items.length === 0) return null;

  const shown = items.slice(0, 5);
  // First tile spans two columns and two rows; the rest fill around it.
  const spans = [
    "sm:col-span-2 sm:row-span-2",
    "",
    "",
    "",
    "sm:col-span-2 lg:col-span-1",
  ];

  return (
    <section className="bg-navy py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-paper/55">Recent Work</span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper sm:text-5xl">
              Rooms We&apos;ve Finished
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group label inline-flex items-center gap-2 border-b border-stone-on-navy pb-2 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Full Gallery
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <div className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] lg:grid-cols-4">
          {shown.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.06}
              className={`relative overflow-hidden ${spans[i] ?? ""}`}
            >
              <Link href="/gallery" className="group block h-full w-full">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
                <div className="absolute inset-0 bg-navy/20 transition-colors duration-300 group-hover:bg-navy/45" />
                <span className="label absolute bottom-0 left-0 p-4 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.caption}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
