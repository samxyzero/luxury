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
    <section id="contact" className="bg-navy py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-paper/55">Get In Touch</span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-paper sm:text-5xl">
            Let&apos;s Furnish Something Beautiful
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 sm:text-lg">
            Reach out for a quote, a consultation, or simply to visit our showroom on
            New Road, Pokhara.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-16">
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="divide-y divide-stone-on-navy border-y border-stone-on-navy">
              <a href={`tel:${site.phone}`} className="group flex items-start gap-4 py-5">
                <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                <span>
                  <span className="label block text-paper/45">Call Us</span>
                  <span className="text-paper transition-colors duration-300 group-hover:text-gold">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="group flex items-start gap-4 py-5">
                <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                <span>
                  <span className="label block text-paper/45">Email</span>
                  <span className="text-paper transition-colors duration-300 group-hover:text-gold">
                    {site.email}
                  </span>
                </span>
              </a>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 py-5"
              >
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                <span>
                  <span className="label block text-paper/45">Visit Our Store</span>
                  <span className="text-paper transition-colors duration-300 group-hover:text-gold">
                    {site.address.line1}, {site.address.city} {site.address.postalCode}
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-4 py-5">
                <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                <span>
                  <span className="label block text-paper/45">Business Hours</span>
                  {site.hours.map((h) => (
                    <span key={h.day} className="block text-sm text-paper/80">
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-8 flex items-center justify-center gap-2 border border-paper py-4 text-paper transition-colors duration-300 hover:bg-paper hover:text-navy"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <div className="mt-8">
              <MapEmbed embedUrl={site.address.mapEmbedUrl} title={`${site.businessName} location`} />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label mb-2 block text-paper/45">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full border-0 border-b border-stone-on-navy bg-transparent py-2.5 text-paper placeholder-paper/30 outline-none transition-colors duration-300 focus:border-gold"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="label mb-2 block text-paper/45">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="w-full border-0 border-b border-stone-on-navy bg-transparent py-2.5 text-paper placeholder-paper/30 outline-none transition-colors duration-300 focus:border-gold"
                    placeholder="98X-XXXXXXX"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="label mb-2 block text-paper/45">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border-0 border-b border-stone-on-navy bg-transparent py-2.5 text-paper placeholder-paper/30 outline-none transition-colors duration-300 focus:border-gold"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="label mb-2 block text-paper/45">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none border-0 border-b border-stone-on-navy bg-transparent py-2.5 text-paper placeholder-paper/30 outline-none transition-colors duration-300 focus:border-gold"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className="label flex w-full items-center justify-center gap-2 border border-paper py-4 text-paper transition-colors duration-300 hover:bg-paper hover:text-navy disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {status === "submitting" ? "Sending..." : "Send Message"}
              </motion.button>

              {status === "success" && (
                <p className="text-center text-sm text-gold">
                  Thank you! We&apos;ll be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-paper/70">
                  Something went wrong — please email us directly at{" "}
                  <a href={`mailto:${site.email}`} className="text-gold underline">
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
