import type { Metadata } from "next";
import Reviews from "@/components/Reviews";
import Partners from "@/components/Partners";
import PageShell from "@/components/PageShell";
import { getSiteSettings, getReviews, getPartners } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const reviews = await getReviews();
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);

  return pageMetadata({
    title: "Reviews",
    description: `Rated ${avg.toFixed(1)}/5 across ${
      reviews.length
    } reviews from homeowners, hoteliers and resort operators around Pokhara. Read what our customers say about Luxury Enterprises.`,
    path: "/reviews",
    keywords: [
      "Luxury Enterprises reviews",
      "furnishing store reviews Pokhara",
      "customer testimonials Nepal",
    ],
  });
}

export default async function ReviewsPage() {
  const site = await getSiteSettings();
  const reviews = await getReviews();
  const partners = await getPartners();

  return (
    <PageShell trail={[{ name: "Reviews", path: "/reviews" }]}>
      <Reviews reviews={reviews} mapsUrl={site.address.mapsUrl} as="h1" />
      <Partners partners={partners} />
    </PageShell>
  );
}
