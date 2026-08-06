import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
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
      className={`${archivo.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
