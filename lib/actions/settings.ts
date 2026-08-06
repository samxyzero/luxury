"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const settingsSchema = z.object({
  businessName: z.string().min(1),
  tagline: z.string().min(1),
  metaDescription: z.string().min(1),
  phone: z.string().min(1),
  phoneDisplay: z.string().min(1),
  whatsapp: z.string().min(1),
  email: z.email(),
  addressLine1: z.string().min(1),
  addressArea: z.string().min(1),
  addressCity: z.string().min(1),
  addressPostalCode: z.string().min(1),
  addressCountry: z.string().min(1),
  mapEmbedUrl: z.url(),
  mapsUrl: z.url(),
  socialFacebook: z.url(),
  socialInstagram: z.url(),
  heroEyebrow: z.string().min(1),
  heroHeadline: z.string().min(1),
  heroHighlight: z.string().min(1),
  heroSubheadline: z.string().min(1),
  heroImage: z.url(),
  heroCtaPrimaryLabel: z.string().min(1),
  heroCtaSecondaryLabel: z.string().min(1),
  aboutEyebrow: z.string().min(1),
  aboutHeading: z.string().min(1),
  aboutImage: z.url(),
  aboutYearsExperience: z.coerce.number().int().min(0),
  aboutBody: z.string().min(1),
  aboutHighlights: z.string().min(1),
  hours: z.string().min(1),
  stats: z.string().min(1),
});

export interface SettingsState {
  error?: string;
  success?: boolean;
}

function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateSettings(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await verifySession();

  const parsed = settingsSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  const data = parsed.data;

  const hours = parseLines(data.hours).map((line) => {
    const [day = "", time = ""] = line.split("|").map((s) => s.trim());
    return { day, time };
  });

  const stats = parseLines(data.stats).map((line) => {
    const [id = "", label = "", value = "0", suffix = ""] = line.split("|").map((s) => s.trim());
    return { id, label, value: Number(value) || 0, suffix };
  });

  try {
    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        businessName: data.businessName,
        tagline: data.tagline,
        metaDescription: data.metaDescription,
        phone: data.phone,
        phoneDisplay: data.phoneDisplay,
        whatsapp: data.whatsapp,
        email: data.email,
        addressLine1: data.addressLine1,
        addressArea: data.addressArea,
        addressCity: data.addressCity,
        addressPostalCode: data.addressPostalCode,
        addressCountry: data.addressCountry,
        mapEmbedUrl: data.mapEmbedUrl,
        mapsUrl: data.mapsUrl,
        socialFacebook: data.socialFacebook,
        socialInstagram: data.socialInstagram,
        heroEyebrow: data.heroEyebrow,
        heroHeadline: data.heroHeadline,
        heroHighlight: data.heroHighlight,
        heroSubheadline: data.heroSubheadline,
        heroImage: data.heroImage,
        heroCtaPrimaryLabel: data.heroCtaPrimaryLabel,
        heroCtaSecondaryLabel: data.heroCtaSecondaryLabel,
        aboutEyebrow: data.aboutEyebrow,
        aboutHeading: data.aboutHeading,
        aboutImage: data.aboutImage,
        aboutYearsExperience: data.aboutYearsExperience,
        aboutBody: parseLines(data.aboutBody),
        aboutHighlights: parseLines(data.aboutHighlights),
        hours,
        stats,
      },
    });
  } catch (error) {
    console.error("[admin] updateSettings failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}
