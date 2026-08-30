"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import SectionLink from "@/components/SectionLink";
import type { FaqItem } from "@/types/content";

interface FaqProps {
  faqs: FaqItem[];
  /** Rendered heading tag — pages pass "h1", sections within a page keep "h2". */
  as?: "h1" | "h2";
  footerLink?: { href: string; label: string };
}

export default function Faq({ faqs, as: Heading = "h2", footerLink }: FaqProps) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="bg-char border-smoke border-t py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>FAQ</Eyebrow>
              <RevealText
                as={Heading}
                text="Questions, answered"
                accent={["answered"]}
                className="lead-tight font-display mt-6 text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-smoke border-t">
              {faqs.map((faq, i) => {
                const isOpen = open === faq.id;
                return (
                  <Reveal key={faq.id} delay={i * 0.04}>
                    <div className="border-smoke border-b">
                      <button
                        onClick={() => setOpen(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${faq.id}`}
                        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={`font-display text-xl font-medium transition-colors duration-300 sm:text-2xl ${
                            isOpen ? "text-saffron" : "text-bone group-hover:text-ash"
                          }`}
                        >
                          {faq.question}
                        </span>
                        {/* One glyph rotated into the other — no icon swap, so
                            the transition is continuous. */}
                        <motion.span
                          animate={{ rotate: isOpen ? 135 : 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                            isOpen
                              ? "border-saffron text-saffron"
                              : "border-smoke text-ash"
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${faq.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-ash max-w-2xl pb-7 leading-relaxed">
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

            {footerLink && (
              <div className="mt-12">
                <SectionLink href={footerLink.href}>{footerLink.label}</SectionLink>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
