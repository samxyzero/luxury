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

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
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
