import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Ribbon from "@/components/home/Ribbon";
import DualPath from "@/components/home/DualPath";
import Ledger from "@/components/home/Ledger";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProcessSteps from "@/components/home/ProcessSteps";
import GalleryMosaic from "@/components/home/GalleryMosaic";
import AboutStrip from "@/components/home/AboutStrip";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import CtaBand from "@/components/home/CtaBand";
import {
  getSiteSettings,
  getProducts,
  getFeaturedProducts,
  getProductCategories,
  getGallery,
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
  const [site, products, featured, categories, gallery, reviews, partners] =
    await Promise.all([
      getSiteSettings(),
      getProducts(),
      getFeaturedProducts(6),
      getProductCategories(),
      getGallery(),
      getReviews(),
      getPartners(),
    ]);

  return (
    <>
      <Hero
        hero={site.hero}
        whatsapp={site.whatsapp}
        mapsUrl={site.address.mapsUrl}
        location={`${site.address.line1}, ${site.address.city}`}
      />

      {/* Tone and layout shape alternate deliberately down the page — dark
          composition, saffron sliver, full-bleed fork, a section of daylight,
          a pinned horizontal rail, a stacking deck — so no two consecutive
          blocks are the same shape and the scroll never settles into a rhythm
          the visitor can stop looking at. */}
      <Ribbon items={categories.map((c) => c.name)} />
      <DualPath />
      <Ledger stats={site.stats} partners={partners} />
      <FeaturedProducts products={featured} total={products.length} />
      <ProcessSteps />
      <GalleryMosaic items={gallery} />
      <AboutStrip about={site.about} />
      <ReviewsStrip reviews={reviews.slice(0, 3)} mapsUrl={site.address.mapsUrl} />
      <CtaBand site={site} />
    </>
  );
}
