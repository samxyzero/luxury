import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductsGrid from "@/components/ProductsGrid";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Partners from "@/components/Partners";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import {
  getSiteSettings,
  getProducts,
  getServices,
  getGallery,
  getReviews,
  getFaqs,
  getPartners,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return pageMetadata({
    title: `${site.businessName} | ${site.tagline}`,
    description: site.metaDescription,
    path: "/",
    image: site.hero.image,
    // Already contains the business name — don't run it through the template.
    absoluteTitle: true,
  });
}

export default async function Home() {
  const site = await getSiteSettings();
  const products = await getProducts();
  const services = await getServices();
  const gallery = await getGallery();
  const reviews = await getReviews();
  const faqs = await getFaqs();
  const partners = await getPartners();

  return (
    <>
      <Hero
        hero={site.hero}
        whatsapp={site.whatsapp}
        mapsUrl={site.address.mapsUrl}
        stats={site.stats}
      />

      {/* Each section below is a teaser — the full listing lives on its own
          route, so the homepage links through rather than duplicating it. */}
      <About
        about={{ ...site.about, body: site.about.body.slice(0, 1) }}
        footerLink={{ href: "/about", label: "Read Our Story" }}
      />

      <ProductsGrid
        products={products.slice(0, 8)}
        showFilters={false}
        intro="A selection from our catalogue — premium furnishings chosen for comfort, craftsmanship and lasting quality."
        footerLink={{ href: "/products", label: `All ${products.length} Products` }}
      />

      <Services
        services={services.slice(0, 6)}
        footerLink={{ href: "/services", label: "All Services" }}
      />

      <WhyChooseUs stats={site.stats} />

      <Gallery
        items={gallery.slice(0, 6)}
        footerLink={{ href: "/gallery", label: "View Full Gallery" }}
      />

      <Reviews reviews={reviews.slice(0, 3)} mapsUrl={site.address.mapsUrl} />

      <Partners partners={partners} />

      <Faq
        faqs={faqs.slice(0, 5)}
        footerLink={{ href: "/faq", label: "All Questions" }}
      />

      <Contact site={site} />
    </>
  );
}
