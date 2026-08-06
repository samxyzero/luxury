"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  /** Inverts the palette for light backgrounds. */
  tone?: "paper" | "ink";
}

export default function StatCounter({
  value,
  suffix = "",
  label,
  tone = "paper",
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
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    });
    return controls.stop;
  }, [isInView, value, count]);

  return (
    <div ref={ref}>
      <div
        className={`font-display text-4xl sm:text-5xl font-medium ${
          tone === "ink" ? "text-ink" : "text-paper"
        }`}
      >
        {isInView ? <motion.span>{rounded}</motion.span> : <span>{settled}</span>}
        <span className="text-gold">{suffix}</span>
      </div>
      <p
        className={`label mt-3 max-w-[14rem] ${
          tone === "ink" ? "text-ink-muted" : "text-paper/55"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
