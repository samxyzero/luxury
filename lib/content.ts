import { prisma } from "@/lib/prisma";
import type {
  SiteSettings,
  Product,
  Service,
  GalleryItem,
  Review,
  FaqItem,
  Partner,
  ProductCategory,
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

/**
 * Connection-level failures rather than genuine query errors. Neon suspends
 * idle compute, so the first request after a quiet spell can land on a socket
 * the server has already closed — retrying wakes it and succeeds.
 */
const TRANSIENT_CODES = new Set([
  "P1001", // can't reach database server
  "P1002", // reached but timed out
  "P1017", // server has closed the connection
  "ECONNRESET",
  "ETIMEDOUT",
  "EPIPE",
]);

const TRANSIENT_MESSAGE =
  /server has closed the connection|connection terminated|connection is closed|socket hang up|timed out fetching a new connection|econnreset/i;

function isTransient(error: unknown): boolean {
  const code = (error as { code?: string })?.code;
  if (code && TRANSIENT_CODES.has(code)) return true;
  const message = error instanceof Error ? error.message : String(error);
  return TRANSIENT_MESSAGE.test(message);
}

/**
 * Runs a database read, retrying once on a dropped connection before giving up
 * to the bundled static snapshot. Without the retry a single recycled socket
 * served a visitor stale content for that whole request.
 */
async function fromDb<T>(
  label: string,
  run: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  const attempts = 2;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await run();
    } catch (error) {
      if (attempt < attempts && isTransient(error)) {
        console.warn(`[content] ${label}: connection dropped, retrying…`);
        await new Promise((resolve) => setTimeout(resolve, 150));
        continue;
      }
      console.error(`[content] ${label}: falling back to static content —`, error);
      return fallback();
    }
  }
  return fallback();
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fromDb(
    "getSiteSettings",
    async () => {
      const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
      if (!row) throw new Error("SiteSettings row not found in database");
      return mapSiteSettings(row);
    },
    () => fallbackSite as SiteSettings
  );
}

/** Variants always travel with their product, ordered for display. */
const withVariants = {
  variants: { orderBy: { order: "asc" } },
} as const;

export async function getProducts(): Promise<Product[]> {
  return fromDb(
    "getProducts",
    async () => {
      const rows = await prisma.product.findMany({
        orderBy: { order: "asc" },
        include: withVariants,
      });
      return rows.map((r) => ({ ...r, idealFor: r.idealFor as Product["idealFor"] }));
    },
    () => (fallbackProducts as { items: Product[] }).items
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return fromDb(
    "getProductBySlug",
    async () => {
      const row = await prisma.product.findUnique({
        where: { slug },
        include: withVariants,
      });
      if (!row) return null;
      return { ...row, idealFor: row.idealFor as Product["idealFor"] };
    },
    () =>
      (fallbackProducts as { items: Product[] }).items.find((p) => p.slug === slug) ?? null
  );
}

/**
 * Homepage selection. Falls back to the first `limit` products so the section
 * is never empty if nobody has flagged anything as featured yet.
 */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

/** Derived from products rather than stored, so categories stay self-maintaining. */
export async function getProductCategories(): Promise<ProductCategory[]> {
  const products = await getProducts();
  const byName = new Map<string, ProductCategory>();

  for (const product of products) {
    const existing = byName.get(product.category);
    if (existing) {
      existing.count += 1;
    } else {
      byName.set(product.category, {
        name: product.category,
        count: 1,
        image: product.image,
      });
    }
  }

  return [...byName.values()];
}

export async function getServices(): Promise<Service[]> {
  return fromDb(
    "getServices",
    () => prisma.service.findMany({ orderBy: { order: "asc" } }),
    () => (fallbackServices as { items: Service[] }).items
  );
}

export async function getGallery(): Promise<GalleryItem[]> {
  return fromDb(
    "getGallery",
    () => prisma.galleryItem.findMany({ orderBy: { order: "asc" } }),
    () => (fallbackGallery as { items: GalleryItem[] }).items
  );
}

export async function getReviews(): Promise<Review[]> {
  return fromDb(
    "getReviews",
    () => prisma.review.findMany({ orderBy: { order: "asc" } }),
    () => (fallbackReviews as { items: Review[] }).items
  );
}

export async function getFaqs(): Promise<FaqItem[]> {
  return fromDb(
    "getFaqs",
    () => prisma.faqItem.findMany({ orderBy: { order: "asc" } }),
    () => (fallbackFaq as { items: FaqItem[] }).items
  );
}

export async function getPartners(): Promise<Partner[]> {
  return fromDb(
    "getPartners",
    () => prisma.partner.findMany({ orderBy: { order: "asc" } }),
    () => (fallbackPartners as { items: Partner[] }).items
  );
}
