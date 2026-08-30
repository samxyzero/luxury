"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  /** Total travel in pixels across the element's full pass through the viewport. */
  distance?: number;
  className?: string;
}

/**
 * Drifts its child against the scroll while the wrapper passes the viewport.
 *
 * The wrapper keeps its own size and clips; only the child moves. Callers are
 * expected to oversize the child (photographs here run ~120% height) so the
 * travel never exposes an edge.
 */
export default function Parallax({
  children,
  distance = 80,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={reduceMotion ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
