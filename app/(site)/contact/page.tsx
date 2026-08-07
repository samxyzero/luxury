import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { getSiteSettings, getFaqs } from "@/lib/content";
import { pageMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return pageMetadata({
    title: "Contact & FAQ",
    description: `Visit our showroom at ${site.address.line1}, ${site.address.city}, or call ${site.phoneDisplay}. Request a quote for home or hotel furnishing, and read answers to common questions about delivery, installation and bulk orders.`,
    path: "/contact",
    keywords: [
      "contact Luxury Enterprises",
      "furnishing store Pokhara address",
      "furnishing quote Nepal",
      "furnishing FAQ Pokhara",
      "delivery installation Nepal",
    ],
  });
}

export default async function ContactPage() {
  const [site, faqs] = await Promise.all([getSiteSettings(), getFaqs()]);

  return (
    <PageShell trail={[{ name: "Contact", path: "/contact" }]}>
      {/* FAQPage schema — keeps the rich-result eligibility the standalone
          /faq route had before it was merged in here. */}
      <JsonLd data={faqJsonLd(faqs)} />
      <Contact site={site} as="h1" />
      <Faq faqs={faqs} />
    </PageShell>
  );
}
