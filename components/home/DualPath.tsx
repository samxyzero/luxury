import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Home } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/Reveal";

const PATHS = [
  {
    key: "homes",
    icon: Home,
    eyebrow: "For Homes",
    title: "Furnishing You'll Live With",
    body: "Printed cottons, textured linens, wool underfoot and drapery cut to your windows. Colour and pattern you actually choose, not a fixed trade specification.",
    points: ["Colourful & printed cotton", "Wool and soft-pile carpets", "Decorative poles & tie-backs"],
    href: "/products?category=Sleep%20Comfort",
    cta: "Furnish my home",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
  },
  {
    key: "hotels",
    icon: Building2,
    eyebrow: "For Hotels, Resorts & Apartments",
    title: "Specified Once, Repeatable for Years",
    body: "Plain white cotton and linen, blackout that genuinely blacks out, commercial-rated carpet, and stock held so a replacement in year three still matches year one.",
    points: ["Plain white, bleach-tolerant linen", "Three-pass blackout drapery", "Phased floor-by-floor fitting"],
    href: "/products?category=Hospitality%20Essentials",
    cta: "Specify a property",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

/**
 * The site's central distinction, made the first thing after the hero: the
 * household and trade ranges are genuinely different products, and visitors
 * arrive knowing which one they are.
 */
export default function DualPath() {
  return (
    <section className="bg-ink">
      <Container className="py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-paper/50">Two Ranges, One Supplier</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper sm:text-5xl">
            Which One Are You Furnishing?
          </h2>
        </Reveal>
      </Container>

      {/* Full-bleed split — deliberately edge-to-edge so it reads as a fork in
          the page rather than another card grid. */}
      <div className="grid lg:grid-cols-2">
        {PATHS.map((path, i) => (
          <Reveal key={path.key} delay={i * 0.1}>
            <Link
              href={path.href}
              className="group relative block h-full min-h-[30rem] overflow-hidden"
            >
              <Image
                src={path.image}
                alt=""
                fill
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-ink/75 transition-colors duration-500 group-hover:bg-ink/65" />

              <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-14">
                <path.icon className="h-7 w-7 text-gold" />
                <p className="label mt-6 text-gold">{path.eyebrow}</p>
                <h3 className="mt-3 max-w-md font-display text-3xl font-medium leading-[1.1] text-paper sm:text-4xl">
                  {path.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-paper/70">
                  {path.body}
                </p>

                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-paper/15 pt-6">
                  {path.points.map((point) => (
                    <li key={point} className="text-sm text-paper/55">
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="label mt-8 inline-flex items-center gap-2 text-paper transition-colors duration-300 group-hover:text-gold">
                  {path.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
