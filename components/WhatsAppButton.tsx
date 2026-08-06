"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  whatsapp: string;
  message?: string;
}

export default function WhatsAppButton({
  whatsapp,
  message = "Hi Luxury Enterprises, I'd like to get a quote.",
}: WhatsAppButtonProps) {
  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2 }}
      className="shadow-soft hover:shadow-soft-lg fixed bottom-6 right-6 z-50 flex h-13 w-13 items-center justify-center bg-navy text-paper transition-shadow duration-300"
      style={{ height: 52, width: 52 }}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
    </motion.a>
  );
}
