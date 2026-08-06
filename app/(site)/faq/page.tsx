import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { getSiteSettings, getFaqs } from "@/lib/content";
import { pageMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const faqs = await getFaqs();

  return pageMetadata({
    title: "Frequently Asked Questions",
    description: `Answers to ${faqs.length} common questions about delivery, installation, bulk hotel orders, fabric selection and after-sales support at Luxury Enterprises, Pokhara.`,
    path: "/faq",
    keywords: [
      "furnishing FAQ Pokhara",
      "delivery installation Nepal",
      "bulk hotel order questions",
    ],
  });
}

export default async function FaqPage() {
  const site = await getSiteSettings();
  const faqs = await getFaqs();

  return (
    <PageShell trail={[{ name: "FAQ", path: "/faq" }]}>
      {/* FAQPage schema — makes these eligible for rich results in search. */}
      <JsonLd data={faqJsonLd(faqs)} />
      <Faq faqs={faqs} as="h1" />
      <Contact site={site} />
    </PageShell>
  );
}
