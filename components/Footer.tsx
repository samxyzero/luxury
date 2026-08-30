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
    <footer className="bg-pitch border-smoke border-t pt-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <p className="text-ash max-w-xs text-base leading-relaxed">{site.tagline}</p>

            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label border-smoke text-bone hover:border-saffron hover:text-saffron mt-7 inline-flex items-center gap-2 rounded-full border px-6 py-3.5 transition-colors duration-500"
            >
              Message on WhatsApp
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <div className="mt-7 flex gap-2.5">
              {[
                {
                  href: site.social.facebook,
                  label: "Facebook",
                  Icon: FacebookIcon,
                },
                {
                  href: site.social.instagram,
                  label: "Instagram",
                  Icon: InstagramIcon,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.businessName} on ${label}`}
                  className="border-smoke text-ash hover:border-saffron hover:text-saffron flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="lg:col-span-2" aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="mono-label text-saffron">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ash hover:text-bone text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {categories.length > 0 && (
            <nav className="lg:col-span-3" aria-labelledby="footer-categories">
              <h2 id="footer-categories" className="mono-label text-saffron">
                Shop by Category
              </h2>
              <ul className="mt-5 space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/products?category=${encodeURIComponent(category.name)}`}
                      className="text-ash hover:text-bone text-sm transition-colors duration-300"
                    >
                      {category.name}
                      <span className="text-slate ml-2 tabular-nums">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="col-span-2 lg:col-span-3">
            <h2 className="mono-label text-saffron">Visit &amp; Contact</h2>
            <ul className="text-ash mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="text-slate mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone transition-colors duration-300"
                >
                  {site.address.line1}, {site.address.city} {site.address.postalCode},{" "}
                  {site.address.country}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="text-slate mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-bone transition-colors duration-300"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="text-slate mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-bone break-all transition-colors duration-300"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <h3 className="mono-label text-slate mt-8">Opening Hours</h3>
            <ul className="text-ash mt-3 space-y-2 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-bone">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* The wordmark as architecture: set to the full width of the page so the
          site signs off at the scale of a shopfront rather than a byline. It is
          decorative here — the accessible name is already on every page. */}
      <div aria-hidden className="mt-20 overflow-hidden px-5 sm:px-8 lg:px-14">
        {/* Sized in vw and held to one line, so it spans the page at every
            width instead of breaking into an accidental two-line stack. */}
        <span className="font-display text-smoke block w-full text-center text-[8.5vw] leading-[0.9] font-medium tracking-tight whitespace-nowrap select-none">
          {site.businessName}
        </span>
      </div>

      <Container>
        <div className="border-smoke text-slate mt-8 flex flex-col items-center justify-between gap-3 border-t py-7 text-center sm:flex-row sm:text-left">
          <p className="mono-label">
            &copy; {year} {site.businessName}
          </p>
          <p className="mono-label">Furnishing homes &amp; hotels across Pokhara, Nepal</p>
        </div>
      </Container>
    </footer>
  );
}
