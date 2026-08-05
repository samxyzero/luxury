import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { SiteSettings } from "@/types/content";

interface AboutProps {
  about: SiteSettings["about"];
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(19,26,58,0.35)]">
                <Image
                  src={about.image}
                  alt="Luxury Enterprises furnished interior"
                  width={900}
                  height={1000}
                  className="h-[420px] sm:h-[520px] w-full object-cover"
                />
              </div>
              <div className="glass-navy absolute -bottom-6 -right-4 sm:-right-8 flex flex-col items-center justify-center rounded-2xl px-6 py-5 text-center">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-gradient-gold">
                  {about.yearsExperience}+
                </span>
                <span className="mt-1 text-xs sm:text-sm text-white/75 tracking-wide">
                  Years of Excellence
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <div className="flex items-center gap-2 text-navy-600 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                <span className="h-px w-8 bg-gold-500" />
                {about.eyebrow}
              </div>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-navy-950">
                {about.heading}
              </h2>
              <div className="mt-6 space-y-4">
                {about.body.map((paragraph) => (
                  <p key={paragraph} className="text-base sm:text-lg leading-relaxed text-charcoal/75">
                    {paragraph}
                  </p>
                ))}
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-navy-900">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
