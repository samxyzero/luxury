"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";

import { PRIMARY_NAV as NAV_LINKS } from "@/lib/navigation";

interface NavbarProps {
  businessName: string;
  phoneDisplay: string;
  phone: string;
}

export default function Navbar({ businessName, phoneDisplay, phone }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      // A solid hairline rather than a shadow: the rest of the site is flat, so
      // a border is what makes the bar read as a distinct layer.
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone bg-paper transition-[padding] duration-300 ${
        scrolled ? "py-4" : "py-6 lg:py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="shrink-0">
          <span className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            {businessName}
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative label py-2 transition-colors duration-300 ${
                  active ? "text-ink" : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-7 lg:flex">
          <a
            href={`tel:${phone}`}
            className="label py-2 text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            {phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="label border border-navy px-7 py-3.5 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="-mr-2.5 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            // Above the header (z-50) so the drawer owns the whole screen and
            // carries its own close control, rather than the bar showing through.
            className="fixed inset-0 z-[60] flex h-[100svh] flex-col bg-navy lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-stone-on-navy px-6 py-6 sm:px-8">
              <span className="font-display text-2xl font-medium tracking-tight text-paper">
                {businessName}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="-mr-2.5 flex h-11 w-11 items-center justify-center text-paper transition-colors duration-300 hover:text-gold"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6 sm:px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 * i, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-stone-on-navy py-5 font-display text-3xl font-medium text-paper transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-stone-on-navy px-6 py-7 sm:px-8">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="label flex items-center justify-center border border-gold bg-gold py-4 text-navy"
              >
                Get a Quote
              </Link>
              <a
                href={`tel:${phone}`}
                className="label mt-4 flex items-center justify-center gap-2 py-3 text-paper/70 transition-colors duration-300 hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
