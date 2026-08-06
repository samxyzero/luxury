import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import Container from "@/components/ui/Container";
import { FOOTER_EXPLORE } from "@/lib/navigation";
import type { SiteSettings, ProductCategory } from "@/types/content";

interface FooterProps {
  site: SiteSettings;
  /** Derived from the catalogue so the column never goes stale. */
  categories?: ProductCategory[];
}

export default function Footer({ site, categories = [] }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-on-navy bg-navy pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="font-display text-2xl font-medium text-paper">
              {site.businessName}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/55">{site.tagline}</p>

            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-6 inline-flex items-center gap-2 border border-gold px-5 py-3 text-gold transition-colors duration-300 hover:bg-gold hover:text-navy"
            >
              Message on WhatsApp
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <div className="mt-6 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.businessName} on Facebook`}
                className="flex h-9 w-9 items-center justify-center border border-stone-on-navy text-paper/75 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.businessName} on Instagram`}
                className="flex h-9 w-9 items-center justify-center border border-stone-on-navy text-paper/75 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="label text-gold">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_EXPLORE.map((link) => (
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
          </nav>

          {categories.length > 0 && (
            <nav className="lg:col-span-3" aria-labelledby="footer-categories">
              <h2 id="footer-categories" className="label text-gold">
                Shop by Category
              </h2>
              <ul className="mt-5 space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/products?category=${encodeURIComponent(category.name)}`}
                      className="text-sm text-paper/65 transition-colors duration-300 hover:text-paper"
                    >
                      {category.name}
                      <span className="ml-2 text-paper/30">{category.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="lg:col-span-3">
            <h2 className="label text-gold">Visit &amp; Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-paper"
                >
                  {site.address.line1}, {site.address.city} {site.address.postalCode},{" "}
                  {site.address.country}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`tel:${site.phone}`}
                  className="transition-colors duration-300 hover:text-paper"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors duration-300 hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <h3 className="label mt-8 text-paper/45">Opening Hours</h3>
            <ul className="mt-3 space-y-2 text-sm text-paper/65">
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
            &copy; {year} {site.businessName}. All rights reserved.
          </p>
          <p>Furnishing homes &amp; hotels across Pokhara, Nepal.</p>
        </div>
      </Container>
    </footer>
  );
}
