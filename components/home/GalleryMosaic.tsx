import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Parallax from "@/components/fx/Parallax";
import type { GalleryItem } from "@/types/content";

interface GalleryMosaicProps {
  items: GalleryItem[];
}

/**
 * Aspect ratio and drift speed per column. Nothing lines up on a shared
 * baseline and nothing travels at the same rate, so the wall keeps re-composing
 * itself as it passes — the opposite of the grid of equal squares this replaced.
 */
const COLUMNS = [
  { ratio: "aspect-[3/4]", drift: 120, offset: "lg:mt-24" },
  { ratio: "aspect-[4/5]", drift: -70, offset: "" },
  { ratio: "aspect-[3/4]", drift: 90, offset: "lg:mt-40" },
] as const;

export default function GalleryMosaic({ items }: GalleryMosaicProps) {
  if (items.length === 0) return null;

  const shown = items.slice(0, 6);
  // Dealt round-robin so a short gallery still fills every column evenly
  // instead of leaving the last one empty.
  const columns = COLUMNS.map((_, col) => shown.filter((_, i) => i % 3 === col));

  return (
    <section className="bg-void overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow index={5}>Recent Work</Eyebrow>
            <RevealText
              as="h2"
              text="Rooms we have finished"
              accent={["finished"]}
              className="lead-tight font-display mt-6 text-[clamp(2.25rem,5vw,4rem)] font-medium"
            />
          </div>
          <Link
            href="/projects"
            className="group mono-label border-smoke text-bone hover:border-saffron hover:text-saffron inline-flex items-center gap-2 rounded-full border px-6 py-3.5 transition-colors duration-500"
          >
            Full Gallery
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>

      <div className="mt-14 grid grid-cols-2 gap-3 px-5 sm:gap-5 sm:px-8 lg:grid-cols-3 lg:gap-6 lg:px-14">
        {columns.map((column, col) => (
          <div
            key={col}
            className={`flex flex-col gap-3 sm:gap-5 lg:gap-6 ${COLUMNS[col].offset} ${
              // Three columns of content into two columns of grid on small
              // screens: the third is folded back under the first.
              col === 2 ? "col-span-2 flex-row lg:col-span-1 lg:flex-col" : ""
            }`}
          >
            {column.map((item) => (
              <Link
                key={item.id}
                href="/projects"
                data-cursor="View"
                className="group relative block w-full flex-1"
              >
                <Parallax
                  distance={COLUMNS[col].drift}
                  className={`${COLUMNS[col].ratio} arch w-full`}
                >
                  {/* Oversized and pulled up by half the overflow, so the
                      parallax travel never exposes an edge. */}
                  <div className="relative -top-[10%] h-[120%] w-full">
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      sizes="(min-width: 1024px) 32vw, 48vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                </Parallax>

                <div
                  aria-hidden
                  className="scrim-b arch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="mono-label text-bone pointer-events-none absolute bottom-5 left-5 max-w-[80%] translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
