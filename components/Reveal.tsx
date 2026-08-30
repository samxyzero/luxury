"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Entrance for anything that is not a headline — headlines use RevealText,
 * which splits per word. Shares the site's one easing curve, so a block and the
 * heading above it settle together rather than at two different speeds.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      // Marks the element for the no-JS override in the root layout, which
      // cancels the hidden starting state when nothing will animate it away.
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
