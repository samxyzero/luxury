import type { Metadata } from "next";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import PageShell from "@/components/PageShell";
import { getSiteSettings, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServices();

  return pageMetadata({
    title: "Services",
    description: `From on-site measurement and fabric consultation to delivery, installation and bulk hotel supply — ${services.length} services covering every step of furnishing a home or hospitality project in Pokhara.`,
    path: "/services",
    keywords: [
      "furnishing services Pokhara",
      "curtain installation Nepal",
      "hotel furnishing consultation",
      "bulk furnishing supply Nepal",
    ],
  });
}

export default async function ServicesPage() {
  const site = await getSiteSettings();
  const services = await getServices();

  return (
    <PageShell trail={[{ name: "Services", path: "/services" }]}>
      <Services services={services} as="h1" />
      <Contact site={site} />
    </PageShell>
  );
}
