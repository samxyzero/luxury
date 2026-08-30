"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  whatsapp: string;
  message?: string;
}

/**
 * Collapsed to a disc until the visitor has read something, then it widens to
 * carry its label. Arriving pre-expanded would put a floating advert over the
 * hero composition before the page has said anything.
 */
export default function WhatsAppButton({
  whatsapp,
  message = "Hi Luxury Enterprises, I'd like to get a quote.",
}: WhatsAppButtonProps) {
  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  const [expanded, setExpanded] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setExpanded(y > 700));

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-cursor="Chat"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04 }}
      className="bg-saffron text-void fixed right-4 bottom-4 z-50 flex h-14 items-center gap-2.5 overflow-hidden rounded-full pl-4 shadow-[0_16px_40px_-12px_rgba(240,163,58,0.5)] sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
      <motion.span
        animate={{
          width: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
          marginRight: expanded ? 20 : 16,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mono-label overflow-hidden whitespace-nowrap"
      >
        WhatsApp Us
      </motion.span>
    </motion.a>
  );
}
