"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Review } from "@/types/content";

interface ReviewsProps {
  reviews: Review[];
  mapsUrl: string;
  /** Rendered heading tag — pages pass "h1", homepage sections keep "h2". */
  as?: "h1" | "h2";
}

export default function Reviews({ reviews, mapsUrl, as: Heading = "h2" }: ReviewsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const goPrev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const goNext = () => setIndex((i) => (i + 1) % reviews.length);
  const review = reviews[index];

  return (
    <section id="reviews" className="bg-navy py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-paper/55">Customer Reviews</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <Heading className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-paper sm:text-5xl">
            Loved by Homes &amp; Hotels Alike
          </Heading>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-paper/60 transition-colors duration-300 hover:text-paper"
          >
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold" />
              ))}
            </span>
            5.0 average &middot; See all Google Reviews
          </a>
        </Reveal>

        <div className="mt-16">
          <div className="relative min-h-[200px] border-t border-stone-on-navy pt-10 text-center sm:min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="font-display text-2xl italic font-normal leading-relaxed text-paper sm:text-3xl">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-7">
                  <p className="font-medium text-gold">{review.name}</p>
                  <p className="mt-1 text-sm text-paper/55">{review.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              aria-label="Previous review"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center border border-stone-on-navy text-paper transition-colors duration-300 hover:bg-paper hover:text-navy"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-6 transition-colors duration-300 ${
                    i === index ? "bg-gold" : "bg-stone-on-navy"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next review"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center border border-stone-on-navy text-paper transition-colors duration-300 hover:bg-paper hover:text-navy"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
