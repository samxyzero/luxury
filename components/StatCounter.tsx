"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const isDecimal = !Number.isInteger(value);
  const rounded = useTransform(count, (latest) =>
    isDecimal ? latest.toFixed(1) : Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <div ref={ref}>
      <div className="font-display text-4xl sm:text-5xl font-medium text-paper">
        <motion.span>{rounded}</motion.span>
        <span className="text-gold">{suffix}</span>
      </div>
      <p className="label mt-3 text-paper/55">{label}</p>
    </div>
  );
}
