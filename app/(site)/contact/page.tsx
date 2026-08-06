import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageShell from "@/components/PageShell";
import { getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return pageMetadata({
    title: "Contact",
    description: `Visit our showroom at ${site.address.line1}, ${site.address.city}, or call ${site.phoneDisplay}. Request a quote for home or hotel furnishing from Luxury Enterprises, Pokhara.`,
    path: "/contact",
    keywords: [
      "contact Luxury Enterprises",
      "furnishing store Pokhara address",
      "furnishing quote Nepal",
    ],
  });
}

export default async function ContactPage() {
  const site = await getSiteSettings();

  return (
    <PageShell trail={[{ name: "Contact", path: "/contact" }]}>
      <Contact site={site} as="h1" />
    </PageShell>
  );
}
