import Container from "@/components/ui/Container";
import Reveal from "@/components/Reveal";
import { PROCESS_STEPS } from "@/lib/navigation";

/**
 * Horizontal timeline with oversized numerals — a different visual rhythm from
 * the card grids above and below it, so the page doesn't read as one repeated
 * layout.
 */
export default function ProcessSteps() {
  return (
    <section className="border-y border-stone bg-paper-dim py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-ink-muted">How It Works</span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              One Team, First Call to Final Fitting
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              No handing off to third-party fitters, and no guessing at sizes. The people who
              quote the job are the people who finish it.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ol className="relative">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="group relative flex gap-6 border-t border-stone py-7 sm:gap-10">
                    <span className="font-display text-5xl font-medium leading-none text-stone transition-colors duration-500 group-hover:text-gold sm:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-display text-2xl font-medium text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
