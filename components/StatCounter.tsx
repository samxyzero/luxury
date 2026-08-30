"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  /** Inverts the palette for the light sections. */
  tone?: "bone" | "void";
}

export default function StatCounter({
  value,
  suffix = "",
  label,
  tone = "bone",
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const isDecimal = !Number.isInteger(value);
  const rounded = useTransform(count, (latest) =>
    isDecimal ? latest.toFixed(1) : Math.round(latest).toLocaleString()
  );

  // The count-up is an enhancement, not the content. Before it starts, render
  // the real figure — otherwise the server HTML (and therefore crawlers and
  // no-JS visitors) would read "0 years of service". `isInView` is false on the
  // server and on first paint, so it doubles as the "has animation begun" flag.
  const settled = isDecimal ? value.toFixed(1) : value.toLocaleString();

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [isInView, value, count]);

  return (
    <div ref={ref}>
      {/* Tabular figures so the numeral does not jostle its own layout while it
          counts — without them every digit change nudges the suffix sideways. */}
      <div
        className={`font-display lead-tight text-[clamp(3.5rem,7vw,6.5rem)] font-medium tabular-nums ${
          tone === "void" ? "text-void" : "text-bone"
        }`}
      >
        {isInView ? <motion.span>{rounded}</motion.span> : <span>{settled}</span>}
        <span className={tone === "void" ? "text-ember" : "text-saffron"}>{suffix}</span>
      </div>
      <p
        className={`mono-label mt-4 max-w-[11rem] leading-snug ${
          tone === "void" ? "text-slate" : "text-ash"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
