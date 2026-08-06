import type { Metadata } from "next";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxuryenterprises.com.np"
).replace(/\/$/, "");

export interface Crumb {
  name: string;
  path: string;
}

interface PageMetadataInput {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/products". Used for the canonical URL. */
  path: string;
  image?: string;
  keywords?: string[];
  /**
   * Bypass the root layout's "%s | Luxury Enterprises" template. Used by the
   * homepage, whose title already contains the business name.
   */
  absoluteTitle?: boolean;
}

/**
 * Per-page metadata with a self-referencing canonical. The root layout supplies
 * `metadataBase` and the "%s | Luxury Enterprises" title template, so `title`
 * here is just the page name.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
  absoluteTitle,
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function breadcrumbJsonLd(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function itemListJsonLd(
  items: { name: string; path: string }[],
  listName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${siteUrl}${item.path}`,
    })),
  };
}
