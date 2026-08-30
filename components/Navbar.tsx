"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";

import { PRIMARY_NAV as NAV_LINKS } from "@/lib/navigation";

interface NavbarProps {
  businessName: string;
  phoneDisplay: string;
  phone: string;
}

/** Previewed behind the overlay menu so navigation has something to look at. */
const MENU_ART: Record<string, string> = {
  "/products":
    "https://images.unsplash.com/photo-1522771753035-4d1c1eaf3ff8?auto=format&fit=crop&w=900&q=70",
  "/services":
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=70",
  "/projects":
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=70",
  "/about":
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=70",
  "/contact":
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=70",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar({ businessName, phoneDisplay, phone }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Retreats on the way down and returns on the way up, so a long page is never
  // reading under a permanent bar but the nav is always one flick away.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setFloating(y > 40);
    setHidden(y > previous && y > 220 && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // A route change while the overlay is open must close it, or the new page
  // renders underneath a menu that never went away. The links close it
  // themselves; this covers browser back/forward, where no handler runs.
  // Adjusted during render rather than in an effect — React re-runs this
  // component before committing, so the menu never paints in the wrong state.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    if (open) setOpen(false);
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-140%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
      >
        {/* A detached capsule rather than a full-width bar: the page visibly
            continues underneath it, which is what keeps the hero feeling like
            one uninterrupted image. */}
        <div
          className={`mx-auto flex max-w-[92rem] items-center justify-between gap-4 rounded-full border py-2 pr-2 pl-5 transition-all duration-500 sm:pl-7 ${
            floating
              ? "border-smoke bg-void/80 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="bg-saffron block h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-150" />
            <span className="font-display text-bone text-lg font-medium tracking-tight sm:text-xl">
              {businessName}
            </span>
          </Link>

          <nav className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-5 py-2.5 transition-colors duration-300 ${
                    active ? "text-void" : "text-ash hover:text-bone"
                  }`}
                >
                  {/* One shared id, so the marker travels between items instead
                      of fading out here and in again there. */}
                  {active && (
                    <motion.span
                      layoutId="nav-marker"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="bg-saffron absolute inset-0 rounded-full"
                    />
                  )}
                  <span className="mono-label relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="mono-label text-ash hover:text-bone hidden px-3 py-2 transition-colors duration-300 xl:block"
            >
              {phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="mono-label bg-bone text-void hover:bg-saffron hidden rounded-full px-6 py-3.5 transition-colors duration-300 sm:inline-flex"
            >
              Get a Quote
            </Link>

            {/* Three rules that become a cross — cheaper and calmer than
                swapping two icons, and it reads as one continuous object. */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="border-smoke bg-char text-bone relative z-[70] flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full border lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="bg-bone block h-px w-4"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-bone block h-px w-4"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="bg-bone block h-px w-4"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="bg-pitch fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-y-auto lg:hidden"
          >
            {/* The preview sits behind the list and cross-fades as items are
                touched — the menu shows the shop rather than just naming it. */}
            <AnimatePresence mode="wait">
              {preview && (
                <motion.div
                  key={preview}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.22, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="pointer-events-none absolute inset-0"
                >
                  <Image
                    src={preview}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <nav className="relative flex flex-1 flex-col justify-center px-5 pt-28 pb-10 sm:px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.06, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onPointerEnter={() => setPreview(MENU_ART[link.href] ?? null)}
                    onClick={() => setOpen(false)}
                    className="border-smoke group flex items-baseline gap-4 border-b py-5"
                  >
                    <span className="mono-label text-saffron">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-[2.5rem] leading-none font-medium tracking-tight transition-colors duration-300 sm:text-6xl ${
                        isActive(link.href) ? "text-saffron" : "text-bone"
                      }`}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight className="text-slate ml-auto h-5 w-5 self-center" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="border-smoke relative flex flex-col gap-3 border-t px-5 py-7 sm:px-8"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mono-label bg-saffron text-void flex items-center justify-center rounded-full py-4"
              >
                Get a Quote
              </Link>
              <a
                href={`tel:${phone}`}
                className="mono-label text-ash flex items-center justify-center gap-2 py-3"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
