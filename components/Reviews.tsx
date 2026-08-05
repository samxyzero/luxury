"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Review } from "@/types/content";

interface ReviewsProps {
  reviews: Review[];
  mapsUrl: string;
}

export default function Reviews({ reviews, mapsUrl }: ReviewsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const goPrev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const goNext = () => setIndex((i) => (i + 1) % reviews.length);
  const review = reviews[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-navy-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span className="h-px w-8 bg-gold-500" />
            Customer Reviews
            <span className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Loved by Homes & Hotels Alike
          </h2>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-300 transition-colors"
          >
            <span className="flex text-gold-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400" />
              ))}
            </span>
            5.0 average · See all Google Reviews
          </a>
        </Reveal>

        <div className="relative mt-14">
          <Quote className="mx-auto h-10 w-10 text-gold-500/40" />
          <div className="relative mt-4 min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass-navy rounded-3xl p-8 sm:p-10 text-center"
              >
                <p className="font-display text-lg sm:text-2xl leading-relaxed text-white">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-gold-300">{review.name}</p>
                  <p className="text-sm text-white/60">{review.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Previous review"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full glass-light text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold-400" : "w-2 bg-white/25"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next review"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full glass-light text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
