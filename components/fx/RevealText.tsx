"use client";

import { Fragment, type ElementType } from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  /** Plain text — split on whitespace, so no markup is lost in the process. */
  text: string;
  as?: ElementType;
  className?: string;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  /** Words to render in the accent face — matched case-insensitively. */
  accent?: string[];
  accentClassName?: string;
  once?: boolean;
}

/**
 * Headline that rises word by word from behind its own baseline.
 *
 * Each word gets a clipping wrapper so the motion reads as type sliding out of
 * the page rather than fading in — the difference is what makes it feel
 * physical. The wrapper is `inline-block` with the space rendered as a real
 * text node between words, so selection, wrapping and copy-paste all behave
 * like ordinary prose.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.055,
  accent = [],
  accentClassName = "font-normal italic text-saffron",
  once = true,
}: RevealTextProps) {
  const words = text.split(" ");
  const accented = new Set(accent.map((w) => w.toLowerCase().replace(/[.,]/g, "")));

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="mask-line inline-block align-bottom">
            <motion.span
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once, margin: "-12%" }}
              transition={{
                duration: 0.85,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block ${
                accented.has(word.toLowerCase().replace(/[.,]/g, "")) ? accentClassName : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
