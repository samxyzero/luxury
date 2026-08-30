"use client";

import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import MapEmbed from "@/components/MapEmbed";
import type { SiteSettings } from "@/types/content";

interface ContactProps {
  site: SiteSettings;
  /** Rendered heading tag — pages pass "h1", sections within a page keep "h2". */
  as?: "h1" | "h2";
}

type Status = "idle" | "submitting" | "success" | "error";

/** One definition for every field on the form, so they cannot drift apart. */
const FIELD =
  "border-smoke text-bone placeholder-slate focus:border-saffron w-full border-0 border-b bg-transparent py-3 outline-none transition-colors duration-300";

export default function Contact({ site, as: Heading = "h2" }: ContactProps) {
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
    <section id="contact" className="bg-void py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Get In Touch</Eyebrow>
          <RevealText
            as={Heading}
            text="Let us furnish something beautiful"
            accent={["beautiful"]}
            className="lead-tight font-display mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium text-balance"
          />
          <Reveal delay={0.12}>
            <p className="text-ash mt-7 text-lg leading-relaxed text-pretty">
              Reach out for a quote, a consultation, or simply to visit our showroom on
              New Road, Pokhara.
            </p>
          </Reveal>
        </div>

        {/* Quick actions first — most enquiries here start on WhatsApp or a
            phone call, so those shouldn't sit below a form. */}
        <Reveal delay={0.05}>
          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                href: whatsappHref,
                external: true,
                icon: MessageCircle,
                label: "WhatsApp",
                value: "Fastest reply",
              },
              {
                href: `tel:${site.phone}`,
                external: false,
                icon: Phone,
                label: "Call",
                value: site.phoneDisplay,
              },
              {
                href: site.address.mapsUrl,
                external: true,
                icon: MapPin,
                label: "Directions",
                value: `${site.address.area}, ${site.address.city}`,
              },
            ].map((action) => (
              <li key={action.label}>
                <a
                  href={action.href}
                  {...(action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group border-smoke hover:border-saffron hover:bg-char flex items-center gap-4 rounded-2xl border px-6 py-6 transition-colors duration-500"
                >
                  <action.icon className="text-saffron h-5 w-5 shrink-0" />
                  <span>
                    <span className="mono-label text-slate block">{action.label}</span>
                    <span className="text-bone mt-1 block">{action.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-16">
          <Reveal delay={0.1} className="lg:col-span-2">
            <ul className="border-smoke divide-smoke divide-y border-y">
              {[
                {
                  icon: Phone,
                  label: "Call Us",
                  value: site.phoneDisplay,
                  href: `tel:${site.phone}`,
                  external: false,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: site.email,
                  href: `mailto:${site.email}`,
                  external: false,
                },
                {
                  icon: MapPin,
                  label: "Visit Our Store",
                  value: `${site.address.line1}, ${site.address.city} ${site.address.postalCode}`,
                  href: site.address.mapsUrl,
                  external: true,
                },
              ].map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    {...(row.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-start gap-4 py-5"
                  >
                    <row.icon className="text-saffron mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <span className="mono-label text-slate block">{row.label}</span>
                      <span className="text-bone group-hover:text-saffron mt-1 block transition-colors duration-300">
                        {row.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-4 py-5">
                <Clock className="text-saffron mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <span className="mono-label text-slate block">Business Hours</span>
                  {site.hours.map((h) => (
                    <span key={h.day} className="text-ash mt-1 block text-sm">
                      {h.day}: <span className="text-bone">{h.time}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label bg-saffron text-void hover:bg-bone mt-8 flex items-center justify-center gap-2 rounded-full py-4 transition-colors duration-500"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <div className="mt-8">
              <MapEmbed
                embedUrl={site.address.mapEmbedUrl}
                title={`${site.businessName} location`}
              />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mono-label text-slate mb-1 block">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className={FIELD}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mono-label text-slate mb-1 block">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className={FIELD}
                    placeholder="98X-XXXXXXX"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mono-label text-slate mb-1 block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={FIELD}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mono-label text-slate mb-1 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className={`${FIELD} resize-none`}
                  placeholder="Tell us about your project…"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mono-label border-smoke text-bone hover:border-saffron hover:bg-saffron hover:text-void flex w-full items-center justify-center gap-2 rounded-full border py-4.5 transition-colors duration-500 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>

              {/* Announced rather than merely shown — the form does not move on
                  submit, so a sighted-only confirmation would be missed. */}
              <p aria-live="polite" className="text-center text-sm">
                {status === "success" && (
                  <span className="text-saffron">
                    Thank you! We&apos;ll be in touch shortly.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-ash">
                    Something went wrong — please email us directly at{" "}
                    <a href={`mailto:${site.email}`} className="text-saffron underline">
                      {site.email}
                    </a>
                    .
                  </span>
                )}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
