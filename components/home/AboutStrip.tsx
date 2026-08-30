import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/fx/RevealText";
import CircleBadge from "@/components/fx/CircleBadge";
import Parallax from "@/components/fx/Parallax";
import type { SiteSettings } from "@/types/content";

interface AboutStripProps {
  about: SiteSettings["about"];
}

/** Condensed introduction; the full story has its own page. */
export default function AboutStrip({ about }: AboutStripProps) {
  return (
    <section className="bg-linen text-void py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-5">
            <Parallax distance={60} className="arch aspect-[4/5] w-full">
              <div className="relative -top-[8%] h-[116%] w-full">
                <Image
                  src={about.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Parallax>

            {/* Straddles the photograph's lower edge, the way a maker's seal
                sits half on the cloth and half off it. */}
            <div className="bg-void text-bone absolute -right-3 -bottom-8 flex h-28 w-28 items-center justify-center rounded-full sm:-right-6 sm:h-36 sm:w-36">
              <CircleBadge
                text={`Est. ${new Date().getFullYear() - about.yearsExperience} · Pokhara`}
                centre={`${about.yearsExperience}`}
                className="text-saffron h-full w-full"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Eyebrow index={6} tone="void">
              {about.eyebrow}
            </Eyebrow>
            <RevealText
              as="h2"
              text={about.heading}
              accent={["Comfort", "Elegance"]}
              accentClassName="font-normal italic text-ember"
              className="lead-tight font-display mt-6 text-[clamp(2rem,4.2vw,3.5rem)] font-medium text-balance"
            />
            <Reveal delay={0.12}>
              <p className="text-slate mt-7 text-lg leading-relaxed text-pretty">
                {about.body[0]}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="border-void/12 mt-10 grid gap-px border-t sm:grid-cols-2">
                {about.highlights.slice(0, 4).map((highlight, i) => (
                  <li
                    key={highlight}
                    className="border-void/12 flex items-baseline gap-4 border-b py-4"
                  >
                    <span className="mono-label text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-void/75 text-sm leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button href="/about" variant="ghostDark">
                  Read Our Story
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
