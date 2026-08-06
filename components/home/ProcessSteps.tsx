import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { PROCESS_STEPS } from "@/lib/navigation";

/**
 * Answers the "what actually happens if I call you" question — the main
 * objection for a furnishing purchase, and the thing the old homepage never
 * said anywhere.
 */
export default function ProcessSteps() {
  return (
    <Section tone="paper" space="lg">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="One Team, From First Call to Final Fitting"
          intro="No handoffs to third-party fitters and no guesswork on sizes — the people who quote the job are the people who finish it."
        />

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <li className="border-t border-stone pt-6">
                <span className="label text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
