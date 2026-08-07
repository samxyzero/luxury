import Image from "next/image";
import Reveal from "@/components/Reveal";
import CornerMarks from "@/components/CornerMarks";
import type { SiteSettings } from "@/types/content";
import SectionLink from "@/components/SectionLink";

interface AboutProps {
  about: SiteSettings["about"];
  /** Rendered heading tag — pages pass "h1", homepage sections keep "h2". */
  as?: "h1" | "h2";
  /** Homepage teaser CTA linking to the full page. */
  footerLink?: { href: string; label: string };
}

export default function About({ about, as: Heading = "h2", footerLink }: AboutProps) {
  return (
    <section id="about" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5]">
              <Image
                src={about.image}
                alt="Luxury Enterprises furnished interior"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <CornerMarks tone="gold" inset={14} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-ink-muted">{about.eyebrow}</span>
            </div>

            <Heading className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {about.heading}
            </Heading>

            <div className="mt-8 max-w-2xl space-y-5">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {about.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink sm:text-base">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-14 flex items-baseline gap-6 border-t border-stone pt-8">
              <span className="font-display text-5xl font-medium text-ink">
                {about.yearsExperience}
                <span className="text-gold-dim">+</span>
              </span>
              <span className="label max-w-[10rem] text-ink-muted">
                Years furnishing homes &amp; hotels across Nepal
              </span>
            </div>
          </Reveal>
        </div>

        {footerLink && (
          <div className="mt-14">
            <SectionLink href={footerLink.href} tone="ink">
              {footerLink.label}
            </SectionLink>
          </div>
        )}
      </div>
    </section>
  );
}
