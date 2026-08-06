import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Pages pass "h1"; homepage sections keep "h2". */
  as?: "h1" | "h2";
  tone?: "ink" | "paper";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  tone = "ink",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const muted = tone === "paper" ? "text-paper/55" : "text-ink-muted";
  const strong = tone === "paper" ? "text-paper" : "text-ink";
  const body = tone === "paper" ? "text-paper/60" : "text-ink-muted";
  const centered = align === "center";

  return (
    <Reveal className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-gold" />
          <span className={`label ${muted}`}>{eyebrow}</span>
          {centered && <span className="h-px w-8 bg-gold" />}
        </div>
      )}
      <Heading
        className={`mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl ${strong}`}
      >
        {title}
      </Heading>
      {intro && <p className={`mt-6 text-base leading-relaxed sm:text-lg ${body}`}>{intro}</p>}
    </Reveal>
  );
}
