import { prisma } from "@/lib/prisma";
import type {
  SiteSettings,
  Product,
  Service,
  GalleryItem,
  Review,
  FaqItem,
  Partner,
} from "@/types/content";
import fallbackSite from "@/content/fallback/site.json";
import fallbackProducts from "@/content/fallback/products.json";
import fallbackServices from "@/content/fallback/services.json";
import fallbackGallery from "@/content/fallback/gallery.json";
import fallbackReviews from "@/content/fallback/reviews.json";
import fallbackFaq from "@/content/fallback/faq.json";
import fallbackPartners from "@/content/fallback/partners.json";

type SiteSettingsRow = NonNullable<
  Awaited<ReturnType<typeof prisma.siteSettings.findUnique>>
>;

function mapSiteSettings(row: SiteSettingsRow): SiteSettings {
  return {
    businessName: row.businessName,
    tagline: row.tagline,
    metaDescription: row.metaDescription,
    phone: row.phone,
    phoneDisplay: row.phoneDisplay,
    whatsapp: row.whatsapp,
    email: row.email,
    address: {
      line1: row.addressLine1,
      area: row.addressArea,
      city: row.addressCity,
      postalCode: row.addressPostalCode,
      country: row.addressCountry,
      mapEmbedUrl: row.mapEmbedUrl,
      mapsUrl: row.mapsUrl,
    },
    hours: row.hours as unknown as SiteSettings["hours"],
    social: {
      facebook: row.socialFacebook,
      instagram: row.socialInstagram,
    },
    hero: {
      eyebrow: row.heroEyebrow,
      headline: row.heroHeadline,
      highlight: row.heroHighlight,
      subheadline: row.heroSubheadline,
      image: row.heroImage,
      ctaPrimaryLabel: row.heroCtaPrimaryLabel,
      ctaSecondaryLabel: row.heroCtaSecondaryLabel,
    },
    about: {
      eyebrow: row.aboutEyebrow,
      heading: row.aboutHeading,
      body: row.aboutBody,
      image: row.aboutImage,
      yearsExperience: row.aboutYearsExperience,
      highlights: row.aboutHighlights,
    },
    stats: row.stats as unknown as SiteSettings["stats"],
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (!row) throw new Error("SiteSettings row not found in database");
    return mapSiteSettings(row);
  } catch (error) {
    console.error("[content] getSiteSettings: falling back to static content —", error);
    return fallbackSite as SiteSettings;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({ orderBy: { order: "asc" } });
    return rows.map((r) => ({ ...r, idealFor: r.idealFor as Product["idealFor"] }));
  } catch (error) {
    console.error("[content] getProducts: falling back to static content —", error);
    return (fallbackProducts as { items: Product[] }).items;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const row = await prisma.product.findUnique({ where: { slug } });
    if (!row) return null;
    return { ...row, idealFor: row.idealFor as Product["idealFor"] };
  } catch (error) {
    console.error("[content] getProductBySlug: falling back to static content —", error);
    return (
      (fallbackProducts as { items: Product[] }).items.find((p) => p.slug === slug) ?? null
    );
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    return await prisma.service.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("[content] getServices: falling back to static content —", error);
    return (fallbackServices as { items: Service[] }).items;
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    return await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("[content] getGallery: falling back to static content —", error);
    return (fallbackGallery as { items: GalleryItem[] }).items;
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    return await prisma.review.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("[content] getReviews: falling back to static content —", error);
    return (fallbackReviews as { items: Review[] }).items;
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    return await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("[content] getFaqs: falling back to static content —", error);
    return (fallbackFaq as { items: FaqItem[] }).items;
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    return await prisma.partner.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("[content] getPartners: falling back to static content —", error);
    return (fallbackPartners as { items: Partner[] }).items;
  }
}
