"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import type { FaqItem } from "@/types/content";

interface FaqProps {
  faqs: FaqItem[];
}

export default function Faq({ faqs }: FaqProps) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-ink-muted">FAQ</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Questions, Answered
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-stone">
          {faqs.map((faq, i) => {
            const isOpen = open === faq.id;
            return (
              <Reveal key={faq.id} delay={i * 0.04}>
                <div className="border-b border-stone">
                  <button
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="font-display text-lg font-medium text-ink sm:text-xl">
                      {faq.question}
                    </span>
                    <span className="shrink-0 font-display text-2xl font-normal text-gold-dim">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-sm leading-relaxed text-ink-muted sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
