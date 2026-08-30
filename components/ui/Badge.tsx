import type { ReactNode } from "react";

type Tone = "bone" | "void" | "saffron" | "ember" | "outline";

const TONE: Record<Tone, string> = {
  bone: "bg-bone text-void",
  void: "bg-void text-bone",
  saffron: "bg-saffron text-void",
  ember: "bg-ember text-bone",
  outline: "border border-smoke text-ash",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export default function Badge({ children, tone = "outline", className = "" }: BadgeProps) {
  return (
    <span
      className={`mono-label inline-flex items-center rounded-full px-3.5 py-1.5 ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
