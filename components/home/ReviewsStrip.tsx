import { ArrowUpRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import type { Review } from "@/types/content";

interface ReviewsStripProps {
  reviews: Review[];
  mapsUrl: string;
}

/**
 * The strongest trust signal on the site, so it gets the biggest type: the
 * lead review is set at headline scale as a pull quote and the rest sit beside
 * it as supporting evidence, rather than three equal cards where nothing is
 * actually read.
 */
export default function ReviewsStrip({ reviews, mapsUrl }: ReviewsStripProps) {
  if (reviews.length === 0) return null;

  const [lead, ...rest] = reviews;
  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);

  return (
    <section id="reviews" className="bg-void scroll-mt-28 py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow index={7}>In Their Words</Eyebrow>
            <RevealText
              as="h2"
              text="Homes and hotels, both"
              accent={["both"]}
              className="lead-tight font-display mt-6 text-[clamp(2.25rem,5vw,4rem)] font-medium"
            />
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-smoke hover:border-saffron flex items-center gap-3 rounded-full border px-5 py-3 transition-colors duration-500"
          >
            <span className="text-saffron flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="fill-saffron h-3.5 w-3.5" />
              ))}
            </span>
            <span className="mono-label text-ash group-hover:text-bone transition-colors duration-500">
              {average.toFixed(1)} · {reviews.length} Google reviews
              <ArrowUpRight className="ml-1.5 inline h-3 w-3" />
            </span>
          </a>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <figure className="border-smoke flex h-full flex-col rounded-[2rem] border p-8 sm:p-12">
              <blockquote className="font-display text-bone text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.25] font-medium text-balance">
                <span className="text-saffron" aria-hidden>
                  &ldquo;
                </span>
                {lead.quote}
                <span className="text-saffron" aria-hidden>
                  &rdquo;
                </span>
              </blockquote>
              <figcaption className="border-smoke mt-auto flex items-center gap-4 border-t pt-6">
                {/* Initial rather than a stock avatar — these are real Google
                    reviewers and we have no photograph of any of them. */}
                <span className="bg-saffron text-void font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-medium">
                  {lead.name.charAt(0)}
                </span>
                <span>
                  <span className="text-bone block text-base font-medium">
                    {lead.name}
                  </span>
                  <span className="mono-label text-slate mt-1 block">{lead.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((review, i) => (
              <Reveal
                key={review.id}
                delay={0.1 * (i + 1)}
                className="border-smoke flex-1 border-t pt-6"
              >
                <figure className="flex h-full flex-col">
                  <blockquote className="text-ash text-base leading-relaxed">
                    {review.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-baseline gap-3">
                    <span className="text-bone text-sm font-medium">{review.name}</span>
                    <span className="mono-label text-slate">{review.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
