import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import DualPath from "@/components/home/DualPath";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProcessSteps from "@/components/home/ProcessSteps";
import GalleryMosaic from "@/components/home/GalleryMosaic";
import AboutStrip from "@/components/home/AboutStrip";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import CtaBand from "@/components/home/CtaBand";
import {
  getSiteSettings,
  getFeaturedProducts,
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
  const [site, featured, gallery, reviews, partners] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(4),
    getGallery(),
    getReviews(),
    getPartners(),
  ]);

  return (
    <>
      <Hero hero={site.hero} whatsapp={site.whatsapp} mapsUrl={site.address.mapsUrl} />

      {/* Tone and layout shape alternate deliberately — thin light strip, dark
          full-bleed split, light editorial grid, tinted timeline, dark mosaic —
          so the page never reads as one card block repeated down the screen. */}
      <TrustStrip stats={site.stats} partners={partners} />
      <DualPath />
      <FeaturedProducts products={featured} />
      <ProcessSteps />
      <GalleryMosaic items={gallery} />
      <AboutStrip about={site.about} />
      <ReviewsStrip reviews={reviews.slice(0, 3)} mapsUrl={site.address.mapsUrl} />
      <CtaBand site={site} />
    </>
  );
}
