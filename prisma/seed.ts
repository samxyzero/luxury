import { readFileSync } from "fs";
import path from "path";
import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { hashPassword } from "@/lib/password";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function readJson<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), "content", "fallback", fileName);
  return JSON.parse(readFileSync(filePath, "utf-8")) as T;
}

interface SiteJson {
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
  hours: { day: string; time: string }[];
  social: { facebook: string; instagram: string };
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
  stats: { id: string; label: string; value: number; suffix: string }[];
}

async function main() {
  const site = readJson<SiteJson>("site.json");
  const products = readJson<{ items: Record<string, unknown>[] }>("products.json").items;
  const services = readJson<{ items: Record<string, unknown>[] }>("services.json").items;
  const gallery = readJson<{ items: Record<string, unknown>[] }>("gallery.json").items;
  const reviews = readJson<{ items: Record<string, unknown>[] }>("reviews.json").items;
  const faqs = readJson<{ items: Record<string, unknown>[] }>("faq.json").items;
  const partners = readJson<{ items: Record<string, unknown>[] }>("partners.json").items;

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      businessName: site.businessName,
      tagline: site.tagline,
      metaDescription: site.metaDescription,
      phone: site.phone,
      phoneDisplay: site.phoneDisplay,
      whatsapp: site.whatsapp,
      email: site.email,
      addressLine1: site.address.line1,
      addressArea: site.address.area,
      addressCity: site.address.city,
      addressPostalCode: site.address.postalCode,
      addressCountry: site.address.country,
      mapEmbedUrl: site.address.mapEmbedUrl,
      mapsUrl: site.address.mapsUrl,
      socialFacebook: site.social.facebook,
      socialInstagram: site.social.instagram,
      heroEyebrow: site.hero.eyebrow,
      heroHeadline: site.hero.headline,
      heroHighlight: site.hero.highlight,
      heroSubheadline: site.hero.subheadline,
      heroImage: site.hero.image,
      heroCtaPrimaryLabel: site.hero.ctaPrimaryLabel,
      heroCtaSecondaryLabel: site.hero.ctaSecondaryLabel,
      aboutEyebrow: site.about.eyebrow,
      aboutHeading: site.about.heading,
      aboutImage: site.about.image,
      aboutYearsExperience: site.about.yearsExperience,
      aboutBody: site.about.body,
      aboutHighlights: site.about.highlights,
      hours: site.hours,
      stats: site.stats,
    },
    update: {},
  });
  console.log("Seeded SiteSettings");

  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: products.map((p, i) => ({ ...p, order: i } as never)),
  });
  console.log(`Seeded ${products.length} Products`);

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: services.map((s, i) => ({ ...s, order: i } as never)),
  });
  console.log(`Seeded ${services.length} Services`);

  await prisma.galleryItem.deleteMany();
  await prisma.galleryItem.createMany({
    data: gallery.map((g, i) => ({ ...g, order: i } as never)),
  });
  console.log(`Seeded ${gallery.length} GalleryItems`);

  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: reviews.map((r, i) => ({ ...r, order: i } as never)),
  });
  console.log(`Seeded ${reviews.length} Reviews`);

  await prisma.faqItem.deleteMany();
  await prisma.faqItem.createMany({
    data: faqs.map((f, i) => ({ ...f, order: i } as never)),
  });
  console.log(`Seeded ${faqs.length} FaqItems`);

  await prisma.partner.deleteMany();
  await prisma.partner.createMany({
    data: partners.map((p, i) => ({ ...p, order: i } as never)),
  });
  console.log(`Seeded ${partners.length} Partners`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await hashPassword(adminPassword);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      create: { email: adminEmail, passwordHash },
      update: { passwordHash },
    });
    console.log(`Seeded AdminUser (${adminEmail})`);
  } else {
    console.log("Skipped AdminUser seed — ADMIN_EMAIL/ADMIN_SEED_PASSWORD not set");
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
