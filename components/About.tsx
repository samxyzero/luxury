import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/fx/Parallax";
import CircleBadge from "@/components/fx/CircleBadge";
import SectionLink from "@/components/SectionLink";
import type { SiteSettings } from "@/types/content";

interface AboutProps {
  about: SiteSettings["about"];
  /** Rendered heading tag — pages pass "h1", sections within a page keep "h2". */
  as?: "h1" | "h2";
  footerLink?: { href: string; label: string };
}

export default function About({ about, as: Heading = "h2", footerLink }: AboutProps) {
  return (
    <section id="about" className="bg-void py-20 sm:py-28">
      <Container>
        <div className="max-w-4xl">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <RevealText
            as={Heading}
            text={about.heading}
            accent={["Comfort", "Elegance"]}
            className="lead-tight font-display mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium text-balance"
          />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-5">
            <Parallax distance={70} className="arch aspect-[4/5] w-full">
              <div className="relative -top-[8%] h-[116%] w-full">
                <Image
                  src={about.image}
                  alt="An interior furnished by Luxury Enterprises"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </Parallax>

            <div className="bg-saffron text-void absolute -right-3 -bottom-8 flex h-28 w-28 items-center justify-center rounded-full sm:-right-6 sm:h-36 sm:w-36">
              <CircleBadge
                text={`Est. ${new Date().getFullYear() - about.yearsExperience} · Pokhara`}
                centre={`${about.yearsExperience}`}
                className="h-full w-full"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-6">
                {about.body.map((paragraph) => (
                  <p key={paragraph} className="text-ash text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="border-smoke mt-12 grid border-t sm:grid-cols-2">
                {about.highlights.map((item, i) => (
                  <li
                    key={item}
                    className="border-smoke flex items-baseline gap-4 border-b py-4"
                  >
                    <span className="mono-label text-saffron">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-bone text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-12 flex items-baseline gap-6">
                <span className="font-display text-bone text-[5rem] leading-none font-medium">
                  {about.yearsExperience}
                  <span className="text-saffron">+</span>
                </span>
                <span className="mono-label text-ash max-w-[12rem] leading-snug">
                  Years furnishing homes &amp; hotels across Nepal
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {footerLink && (
          <div className="mt-14">
            <SectionLink href={footerLink.href}>{footerLink.label}</SectionLink>
          </div>
        )}
      </Container>
    </section>
  );
}
