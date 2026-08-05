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

export default function Home() {
  const site = getSiteSettings();
  const products = getProducts();
  const services = getServices();
  const gallery = getGallery();
  const reviews = getReviews();
  const faqs = getFaqs();
  const partners = getPartners();

  return (
    <>
      <Hero hero={site.hero} whatsapp={site.whatsapp} mapsUrl={site.address.mapsUrl} />
      <About about={site.about} />
      <ProductsGrid products={products} whatsapp={site.whatsapp} />
      <Services services={services} />
      <WhyChooseUs stats={site.stats} />
      <Gallery items={gallery} />
      <Reviews reviews={reviews} mapsUrl={site.address.mapsUrl} />
      <Partners partners={partners} />
      <Faq faqs={faqs} />
      <Contact site={site} />
    </>
  );
}
