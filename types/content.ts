export interface BusinessHour {
  day: string;
  time: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  metaDescription: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: {
    line1: string;
    area: string;
    city: string;
    postalCode: string;
    country: string;
    mapEmbedUrl: string;
    mapsUrl: string;
  };
  hours: BusinessHour[];
  social: {
    facebook: string;
    instagram: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    highlight: string;
    subheadline: string;
    image: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string[];
    image: string;
    yearsExperience: number;
    highlights: string[];
  };
  stats: {
    id: string;
    label: string;
    value: number;
    suffix: string;
  }[];
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string | null;
  color: string | null;
  sku: string | null;
  /** Minor units (paisa). Null until pricing is published. */
  price: number | null;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  idealFor: "Homes" | "Hotels" | "Homes & Hotels";

  /** One-line summary for cards and meta descriptions. */
  shortDescription?: string | null;
  /** Fabric / construction notes. */
  material?: string | null;
  /** Washing and upkeep guidance. */
  care?: string | null;
  highlights?: string[];

  /** What we stock for households, and how it differs from the trade range. */
  homesSummary?: string | null;
  homesPoints?: string[];
  /** The equivalent for hotels, resorts, apartments and other trade buyers. */
  hotelsSummary?: string | null;
  hotelsPoints?: string[];

  /**
   * Minor units (paisa). Null until pricing is published — storefront price UI
   * is hidden entirely while this is unset, so nothing shows "NPR 0".
   */
  basePrice?: number | null;
  currency?: string;
  inStock?: boolean;
  featured?: boolean;
  variants?: ProductVariant[];

  /** Present on database-backed rows; absent in the static fallback content. */
  updatedAt?: Date | string;
}

/** Derived from products rather than stored — see getProductCategories(). */
export interface ProductCategory {
  name: string;
  count: number;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  source: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Partner {
  id: string;
  name: string;
}
