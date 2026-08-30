"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A saffron hairline across the very top of the viewport. It sits above the
 * navbar capsule, which floats clear of the edge, so the two never overlap.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-saffron fixed top-0 right-0 left-0 z-[80] h-[2px] origin-left"
    />
  );
}
