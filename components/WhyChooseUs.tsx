import {
  Award,
  Clock3,
  Handshake,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import type { SiteSettings } from "@/types/content";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Premium Quality, Always",
    description: "Every product is chosen for durability, comfort and lasting finish.",
  },
  {
    icon: Handshake,
    title: "Trusted by Hotels & Homes",
    description: "From family bedrooms to resort suites, our work speaks for itself.",
  },
  {
    icon: Sparkles,
    title: "Elegant, Curated Range",
    description: "Refined fabrics and finishes selected for a genuinely premium feel.",
  },
  {
    icon: Clock3,
    title: "On-Time, Every Time",
    description: "Dependable delivery and installation timelines you can plan around.",
  },
  {
    icon: Award,
    title: "7+ Years of Expertise",
    description: "Deep experience furnishing homes, hotels and commercial projects.",
  },
  {
    icon: Truck,
    title: "End-to-End Service",
    description: "Consultation, delivery and installation handled by one dedicated team.",
  },
];

interface WhyChooseUsProps {
  stats: SiteSettings["stats"];
}

/**
 * Set on bone rather than the page's near-black. On a page that is otherwise
 * dark end to end, the daylight break is what stops the credentials reading as
 * more of the same copy.
 */
export default function WhyChooseUs({ stats }: WhyChooseUsProps) {
  return (
    <section className="bg-bone text-void py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="void">Why Choose Us</Eyebrow>
          <RevealText
            as="h2"
            text="The trusted name in premium furnishing"
            accent={["premium", "furnishing"]}
            accentClassName="font-normal italic text-ember"
            className="lead-tight font-display mt-6 text-[clamp(2.25rem,5vw,4rem)] font-medium text-balance"
          />
        </div>

        <div className="bg-void/12 mt-14 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.08} className="bg-bone px-1 py-8 sm:px-8">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                tone="void"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 2) * 0.08}>
              <div className="border-void/15 flex items-start gap-4 border-t pt-6">
                <reason.icon
                  className="text-ember mt-0.5 h-5 w-5 shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-display text-void text-xl font-medium">
                    {reason.title}
                  </h3>
                  <p className="text-slate mt-1.5 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
