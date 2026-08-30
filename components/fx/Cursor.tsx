"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks";

/**
 * A trailing ring that swells over anything clickable and can carry a word.
 *
 * Only mounts where a real pointer exists — `pointer: fine` excludes touch, so
 * phones never pay for it and never end up with a stuck dot. The native cursor
 * is hidden by this component rather than by global CSS, so if the effect is
 * unmounted (touch, reduced motion, JS off) the normal cursor is still there.
 *
 * Elements opt into a label with `data-cursor="Drag"`; any link or button gets
 * the plain swell for free.
 */
export default function Cursor() {
  // Both conditions have to hold, and both can change mid-visit — a tablet
  // gaining a trackpad, or the OS motion setting being toggled.
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduceMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Underdamped enough to lag half a beat behind the pointer — the lag is what
  // makes it feel like a physical object rather than a repainted cursor.
  const springX = useSpring(x, { stiffness: 700, damping: 42, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 700, damping: 42, mass: 0.45 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const hit = (e.target as Element | null)?.closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
      setActive(Boolean(hit));
      setLabel(hit?.getAttribute("data-cursor") ?? null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  // Hiding the native cursor is scoped to this effect, so it is restored the
  // moment the component stops running for any reason.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed top-0 left-0 z-[300] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{
          width: label ? 84 : active ? 48 : 14,
          height: label ? 84 : active ? 48 : 14,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone bg-bone/95"
      >
        {label && (
          <span className="mono-label text-[0.5rem] leading-none text-void">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
