import type { ReactNode } from "react";

interface MarqueeProps {
  /** Rendered twice back-to-back; the CSS loop resets at exactly -50%. */
  children: ReactNode;
  /** Seconds for one full pass. Longer = calmer. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Seamless horizontal ticker, CSS-only — no measurement, no rAF, no client
 * bundle. The track holds two identical copies of the content and translates by
 * exactly half its own width, so the seam always lands where the second copy
 * begins and the loop is invisible at any content length.
 *
 * The duplicate is `aria-hidden`, so the band is announced once.
 */
export default function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div
        className="flex w-max shrink-0 motion-safe:animate-[marquee_linear_infinite] motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
