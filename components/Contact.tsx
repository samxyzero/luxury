"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import MapEmbed from "@/components/MapEmbed";
import type { SiteSettings } from "@/types/content";

interface ContactProps {
  site: SiteSettings;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact({ site }: ContactProps) {
  const [status, setStatus] = useState<Status>("idle");

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span className="h-px w-8 bg-gold-500" />
            Get In Touch
            <span className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Let&apos;s Furnish Something Beautiful
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/65 leading-relaxed">
            Reach out for a quote, a consultation, or simply to visit our showroom on
            New Road, Pokhara.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal delay={0.1} className="lg:col-span-2 space-y-5">
            <div className="glass-navy rounded-2xl p-6 space-y-5">
              <a href={`tel:${site.phone}`} className="flex items-start gap-3 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                  <Phone className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-white/50">Call Us</span>
                  <span className="text-white group-hover:text-gold-300 transition-colors">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-white/50">Email</span>
                  <span className="text-white group-hover:text-gold-300 transition-colors">
                    {site.email}
                  </span>
                </span>
              </a>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                  <MapPin className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-white/50">Visit Our Store</span>
                  <span className="text-white group-hover:text-gold-300 transition-colors">
                    {site.address.line1}, {site.address.city} {site.address.postalCode}
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                  <Clock className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-white/50">Business Hours</span>
                  {site.hours.map((h) => (
                    <span key={h.day} className="block text-white/85 text-sm">
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </div>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                Chat on WhatsApp
              </motion.a>
            </div>

            <MapEmbed embedUrl={site.address.mapEmbedUrl} title={`${site.businessName} location`} />
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-navy rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/35 outline-none transition-colors focus:border-gold-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/35 outline-none transition-colors focus:border-gold-400"
                    placeholder="98X-XXXXXXX"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/35 outline-none transition-colors focus:border-gold-400"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-widest text-white/60">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/35 outline-none transition-colors focus:border-gold-400"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-[0_12px_30px_-8px_rgba(201,162,75,0.6)] disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {status === "submitting" ? "Sending..." : "Send Message"}
              </motion.button>

              {status === "success" && (
                <p className="text-center text-sm text-gold-300">
                  Thank you! We&apos;ll be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-white/70">
                  Something went wrong — please email us directly at{" "}
                  <a href={`mailto:${site.email}`} className="underline text-gold-300">
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
