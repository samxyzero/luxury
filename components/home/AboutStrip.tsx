import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import CornerMarks from "@/components/CornerMarks";
import Reveal from "@/components/Reveal";
import type { SiteSettings } from "@/types/content";

interface AboutStripProps {
  about: SiteSettings["about"];
}

/** Condensed replacement for the full About section, which now has its own page. */
export default function AboutStrip({ about }: AboutStripProps) {
  return (
    <Section tone="paper" space="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={about.image}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <CornerMarks tone="gold" inset={16} />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="label text-ink-muted">{about.eyebrow}</span>
              </div>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
                {about.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                {about.body[0]}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {about.highlights.slice(0, 4).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button href="/about" variant="outline">
                  Read Our Story
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
