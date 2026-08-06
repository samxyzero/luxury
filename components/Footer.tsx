import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import type { SiteSettings } from "@/types/content";

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

interface FooterProps {
  site: SiteSettings;
}

export default function Footer({ site }: FooterProps) {
  return (
    <footer className="border-t border-stone-on-navy bg-navy pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-2xl font-medium text-paper">
              {site.businessName}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-paper/55">{site.tagline}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center border border-stone-on-navy text-paper/75 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-stone-on-navy text-paper/75 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="label text-gold">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/65 transition-colors duration-300 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label text-gold">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {site.address.line1}, {site.address.city} {site.address.postalCode}, {site.address.country}
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${site.phone}`} className="transition-colors duration-300 hover:text-paper">
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="label text-gold">Business Hours</h3>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-paper/85">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone-on-navy pt-6 text-xs text-paper/40 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.businessName}. All rights reserved.
          </p>
          <p>Furnishing homes &amp; hotels across Pokhara, Nepal.</p>
        </div>
      </div>
    </footer>
  );
}
