import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutStrip from "@/components/home/AboutStrip";
import ProcessSteps from "@/components/home/ProcessSteps";
import Reviews from "@/components/Reviews";
import CtaBand from "@/components/home/CtaBand";
import {
  getSiteSettings,
  getFeaturedProducts,
  getProductCategories,
  getReviews,
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
  const [site, featured, categories, reviews, partners] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(4),
    getProductCategories(),
    getReviews(),
    getPartners(),
  ]);

  return (
    <>
      <Hero
        hero={site.hero}
        whatsapp={site.whatsapp}
        mapsUrl={site.address.mapsUrl}
        stats={site.stats}
      />

      {/* Deliberately lighter than before: the full About, Services, Gallery,
          FAQ and Contact blocks now live on their own routes, so the homepage
          is a route into them rather than a copy of them. */}
      <TrustStrip stats={site.stats} partners={partners} />
      <CategoryTiles categories={categories} />
      <FeaturedProducts products={featured} />
      <AboutStrip about={site.about} />
      <ProcessSteps />
      <Reviews reviews={reviews.slice(0, 3)} mapsUrl={site.address.mapsUrl} />
      <CtaBand site={site} />
    </>
  );
}
