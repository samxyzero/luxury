import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSiteSettings, getReviews } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxuryenterprises.com.np";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function expandDayRange(day: string): string[] {
  const [start, end] = day.split(/[–-]/).map((s) => s.trim());
  const startIdx = WEEK_DAYS.indexOf(start);
  const endIdx = end ? WEEK_DAYS.indexOf(end) : -1;
  if (startIdx === -1 || endIdx === -1) return [day];

  const days: string[] = [];
  let i = startIdx;
  while (true) {
    days.push(WEEK_DAYS[i]);
    if (i === endIdx) break;
    i = (i + 1) % 7;
  }
  return days;
}

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteSettings();
  const title = `${site.businessName} | ${site.tagline}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${site.businessName}`,
    },
    description: site.metaDescription,
    keywords: [
      "furnishing store Pokhara",
      "hotel furnishing Nepal",
      "mattresses Pokhara",
      "curtains Nepal",
      "home furnishing Nepal",
      "hospitality furnishing",
      "Luxury Enterprises",
    ],
    authors: [{ name: site.businessName }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: site.businessName,
      title,
      description: site.metaDescription,
      images: [{ url: site.hero.image, width: 1200, height: 630, alt: site.businessName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.metaDescription,
      images: [site.hero.image],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const site = getSiteSettings();
  const reviews = getReviews();
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: site.businessName,
    description: site.metaDescription,
    image: site.hero.image,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: "NP",
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.time.toLowerCase() !== "closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: expandDayRange(h.day),
        opens: h.time.split("–")[0]?.trim(),
        closes: h.time.split("–")[1]?.trim(),
      })),
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
    },
    url: siteUrl,
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <Navbar
          businessName={site.businessName}
          phoneDisplay={site.phoneDisplay}
          phone={site.phone}
        />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
        <WhatsAppButton whatsapp={site.whatsapp} />
      </body>
    </html>
  );
}
