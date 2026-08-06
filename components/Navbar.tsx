"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

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
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-paper transition-[padding,box-shadow] duration-300 ${
        scrolled ? "py-3 shadow-soft" : "py-6 border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="shrink-0">
          <span className="font-display text-xl sm:text-2xl font-medium tracking-tight text-ink">
            {businessName}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative label transition-colors duration-300 ${
                  active ? "text-ink" : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`tel:${phone}`}
            className="label text-ink/70 hover:text-ink transition-colors duration-300"
          >
            {phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="label border border-ink px-6 py-3 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Get a Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 top-0 z-40 flex h-[100svh] flex-col justify-center bg-navy px-8"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-stone-on-navy py-4 font-display text-3xl font-medium text-paper"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="label mt-10 inline-block w-fit border border-paper px-6 py-3 text-paper"
            >
              Get a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
