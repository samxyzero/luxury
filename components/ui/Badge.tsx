import type { ReactNode } from "react";

type Tone = "ink" | "paper" | "gold" | "muted";

const TONE: Record<Tone, string> = {
  ink: "border-ink text-ink",
  paper: "border-stone-on-navy text-paper",
  gold: "border-gold text-gold-dim",
  muted: "border-stone text-ink-muted",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export default function Badge({ children, tone = "muted", className = "" }: BadgeProps) {
  return (
    <span className={`label inline-block border px-3 py-1.5 ${TONE[tone]} ${className}`}>
      {children}
    </span>
  );
}
