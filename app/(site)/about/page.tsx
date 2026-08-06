import type { Metadata } from "next";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Partners from "@/components/Partners";
import PageShell from "@/components/PageShell";
import { getSiteSettings, getPartners } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return pageMetadata({
    title: "About Us",
    description: `${site.businessName} has furnished homes, hotels and resorts across Pokhara for ${site.about.yearsExperience}+ years — premium mattresses, linens, curtains and carpets backed by end-to-end consultation.`,
    path: "/about",
    image: site.about.image,
    keywords: [
      "about Luxury Enterprises",
      "furnishing company Pokhara",
      "hotel furnishing supplier Nepal",
    ],
  });
}

export default async function AboutPage() {
  const site = await getSiteSettings();
  const partners = await getPartners();

  return (
    <PageShell trail={[{ name: "About", path: "/about" }]}>
      <About about={site.about} as="h1" />
      <WhyChooseUs stats={site.stats} />
      <Partners partners={partners} />
    </PageShell>
  );
}
