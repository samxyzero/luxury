import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import { PROCESS_STEPS } from "@/lib/navigation";

/**
 * The four stages of a job, as a deck of cards that stacks up rather than a
 * timeline that scrolls past.
 *
 * Each step sticks a little lower than the one before it, so by the last stage
 * all four are on screen at once with their edges showing — the visitor can see
 * the whole process assembled instead of remembering it. Pure CSS: sticky
 * positioning with a stepped offset, no scroll listeners at all.
 */
export default function ProcessSteps() {
  return (
    <section className="bg-char border-smoke border-y py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow index={4}>How It Works</Eyebrow>
              <RevealText
                as="h2"
                text="One team, first call to final fitting"
                accent={["final", "fitting"]}
                className="lead-tight font-display mt-6 text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium"
              />
              <p className="text-ash mt-6 text-sm leading-relaxed">
                No handing off to third-party fitters, and no guessing at sizes. The
                people who quote the job are the people who finish it.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol>
              {PROCESS_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  // Each card parks 2.5rem below the previous one. The offset is
                  // what leaves the stack's edges visible at the end.
                  className="sticky"
                  style={{ top: `calc(7rem + ${i * 2.5}rem)` }}
                >
                  <Reveal
                    y={24}
                    className="border-smoke bg-void mb-6 rounded-[2rem] border p-7 sm:p-10"
                  >
                    <div className="flex items-start gap-6 sm:gap-10">
                      <span className="font-display stroked text-[3.5rem] leading-none font-medium sm:text-[5rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="pt-1.5 sm:pt-3">
                        <h3 className="font-display text-bone text-2xl font-medium sm:text-3xl">
                          {step.title}
                        </h3>
                        <p className="text-ash mt-3 max-w-lg text-sm leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>

                    {/* Fills in step by step, so the stack reads as progress
                        rather than four interchangeable panels. */}
                    <div className="bg-smoke mt-8 h-px w-full overflow-hidden">
                      <span
                        className="bg-saffron block h-px"
                        style={{
                          width: `${((i + 1) / PROCESS_STEPS.length) * 100}%`,
                        }}
                      />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
