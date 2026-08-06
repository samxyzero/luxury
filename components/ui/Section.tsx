import type { ElementType, ReactNode } from "react";

type Tone = "paper" | "navy" | "paperDim";
type Space = "sm" | "md" | "lg";

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  paperDim: "bg-paper-dim text-ink",
  navy: "bg-navy text-paper",
};

const SPACE: Record<Space, string> = {
  sm: "py-14 sm:py-16",
  md: "py-20 sm:py-24",
  lg: "py-24 sm:py-32 lg:py-40",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  space?: Space;
  id?: string;
  className?: string;
  as?: ElementType;
}

/**
 * Vertical rhythm + background tone in one place. Sections composed from this
 * stay consistent as new ones are added, instead of each re-deciding padding.
 */
export default function Section({
  children,
  tone = "paper",
  space = "lg",
  id,
  className = "",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={`${TONE[tone]} ${SPACE[space]} ${className}`}>
      {children}
    </Tag>
  );
}
