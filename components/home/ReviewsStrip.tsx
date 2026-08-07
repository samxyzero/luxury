import { ArrowUpRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/Reveal";
import type { Review } from "@/types/content";

interface ReviewsStripProps {
  reviews: Review[];
  mapsUrl: string;
}

/**
 * Compact quote row — reviews no longer warrant their own page, but they are
 * the strongest trust signal on the site, so they sit here on the homepage.
 */
export default function ReviewsStrip({ reviews, mapsUrl }: ReviewsStripProps) {
  if (reviews.length === 0) return null;

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);

  return (
    <section id="reviews" className="scroll-mt-24 border-y border-stone bg-paper-dim py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-ink-muted">In Their Words</span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Homes and Hotels, Both
            </h2>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold" />
              ))}
            </span>
            <span className="text-sm text-ink-muted transition-colors duration-300 group-hover:text-gold-dim">
              {average.toFixed(1)} · {reviews.length} Google reviews
              <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
            </span>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-px border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.08} className="flex bg-paper p-8">
              <figure className="flex flex-col">
                <span className="font-display text-5xl leading-none text-gold/30" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-base leading-relaxed text-ink">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-stone pt-4">
                  <span className="block font-display text-lg font-medium text-ink">
                    {review.name}
                  </span>
                  <span className="label mt-1 block text-ink-muted">{review.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
