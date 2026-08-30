"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  /** Fraction of the pointer's offset from centre that the element follows. */
  strength?: number;
  className?: string;
}

/**
 * Leans the wrapped element toward the pointer while it is over it. Reserved
 * for the handful of primary calls to action — used everywhere it would read as
 * a twitchy page rather than a considered detail.
 *
 * Pointer events cover mouse and pen; on touch there is no hover, so nothing
 * fires and the element simply sits still.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    setOffset({
      x: (e.clientX - (box.left + box.width / 2)) * strength,
      y: (e.clientY - (box.top + box.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.6 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
