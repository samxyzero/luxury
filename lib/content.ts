import fs from "fs";
import path from "path";
import type {
  SiteSettings,
  Product,
  Service,
  GalleryItem,
  Review,
  FaqItem,
  Partner,
} from "@/types/content";

const contentDir = path.join(process.cwd(), "content");

function readJson<T>(fileName: string): T {
  const filePath = path.join(contentDir, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function readJsonItems<T>(fileName: string): T[] {
  return readJson<{ items: T[] }>(fileName).items;
}

export function getSiteSettings(): SiteSettings {
  return readJson<SiteSettings>("site.json");
}

export function getProducts(): Product[] {
  return readJsonItems<Product>("products.json");
}

export function getServices(): Service[] {
  return readJsonItems<Service>("services.json");
}

export function getGallery(): GalleryItem[] {
  return readJsonItems<GalleryItem>("gallery.json");
}

export function getReviews(): Review[] {
  return readJsonItems<Review>("reviews.json");
}

export function getFaqs(): FaqItem[] {
  return readJsonItems<FaqItem>("faq.json");
}

export function getPartners(): Partner[] {
  return readJsonItems<Partner>("partners.json");
}
