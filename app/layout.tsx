import type { Metadata } from "next";
import { Archivo, Fraunces, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Grain from "@/components/fx/Grain";
import { getSiteSettings } from "@/lib/content";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

/**
 * The third voice. Display serif states, sans explains, mono specifies — every
 * measurement, index number and micro-label on the site is set in it, which is
 * what keeps the decorative type from reading as the whole personality.
 */
const jet = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxuryenterprises.com.np";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
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
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${jet.variable} h-full antialiased`}
    >
      <body className="bg-void text-bone flex min-h-full flex-col">
        {/* Every heading and section on the site enters from behind a clipping
            mask, and framer-motion renders that starting transform into the
            server HTML. With scripting off nothing ever animates it back, so
            the page would ship its content invisible. This neutralises the
            entrance in that case — no animation, but everything readable. */}
        <noscript>
          <style>{`.mask-line > *, [data-reveal] { transform: none !important; opacity: 1 !important; }`}</style>
        </noscript>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <Grain />
      </body>
    </html>
  );
}
