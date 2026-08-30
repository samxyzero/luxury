import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  /** Narrower measure for text-led sections where full width would hurt reading. */
  size?: "wide" | "default" | "prose";
  className?: string;
}

const SIZE = {
  wide: "max-w-[110rem]",
  default: "max-w-[92rem]",
  prose: "max-w-3xl",
} as const;

/** The site's single horizontal gutter definition. */
export default function Container({
  children,
  size = "default",
  className = "",
}: ContainerProps) {
  return (
    <div className={`mx-auto ${SIZE[size]} px-5 sm:px-8 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}
