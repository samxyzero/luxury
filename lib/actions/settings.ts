"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { zodToFormState, prismaToFormState, type FormState } from "@/lib/actions/form-errors";

const required = (label: string) => z.string().trim().min(1, `${label} is required.`);
const urlField = (label: string) =>
  z.url(`${label} must be a full URL starting with https://`);

const settingsSchema = z.object({
  businessName: required("Business name"),
  tagline: required("Tagline"),
  metaDescription: required("Meta description"),
  phone: required("Phone number"),
  phoneDisplay: required("Display phone number"),
  whatsapp: required("WhatsApp number"),
  email: z.email("Enter a valid email address (e.g. info@example.com)."),
  addressLine1: required("Address line 1"),
  addressArea: required("Area"),
  addressCity: required("City"),
  addressPostalCode: required("Postal code"),
  addressCountry: required("Country"),
  mapEmbedUrl: urlField("Map embed URL"),
  mapsUrl: urlField("Google Maps URL"),
  socialFacebook: urlField("Facebook URL"),
  socialInstagram: urlField("Instagram URL"),
  heroEyebrow: required("Hero eyebrow"),
  heroHeadline: required("Hero headline"),
  heroHighlight: required("Hero highlight"),
  heroSubheadline: required("Hero subheadline"),
  heroImage: urlField("Hero background image"),
  heroCtaPrimaryLabel: required("Primary button label"),
  heroCtaSecondaryLabel: required("Secondary button label"),
  aboutEyebrow: required("About eyebrow"),
  aboutHeading: required("About heading"),
  aboutImage: urlField("About section image"),
  aboutYearsExperience: z.coerce
    .number({ message: "Years of experience must be a number." })
    .int("Years of experience must be a whole number.")
    .min(0, "Years of experience can't be negative."),
  aboutBody: required("About body"),
  aboutHighlights: required("About highlights"),
  hours: required("Opening hours"),
  stats: required("Trust stats"),
});

export type SettingsState = FormState & { success?: boolean };

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
  if (!parsed.success) return zodToFormState(parsed.error);

  const data = parsed.data;

  // These two are free-text pipe-delimited lists, so validate their shape here
  // rather than letting a typo silently write blank rows to the live site.
  const hourLines = parseLines(data.hours);
  const badHour = hourLines.find((line) => line.split("|").filter((s) => s.trim()).length < 2);
  if (badHour) {
    return {
      error: "One of the opening-hours lines is malformed.",
      fieldErrors: {
        hours: `"${badHour}" — expected "Day | Time", e.g. "Sunday – Friday | 8:30 AM – 7:30 PM".`,
      },
    };
  }

  const statLines = parseLines(data.stats);
  const badStat = statLines.find((line) => line.split("|").filter((s) => s.trim()).length < 3);
  if (badStat) {
    return {
      error: "One of the trust-stat lines is malformed.",
      fieldErrors: {
        stats: `"${badStat}" — expected "id | label | value | suffix", e.g. "years | Years of Trusted Service | 7 | +".`,
      },
    };
  }

  const nonNumericStat = statLines.find((line) => {
    const value = line.split("|")[2]?.trim();
    return value !== undefined && value !== "" && Number.isNaN(Number(value));
  });
  if (nonNumericStat) {
    return {
      error: "A trust stat has a non-numeric value.",
      fieldErrors: {
        stats: `"${nonNumericStat}" — the third field (value) must be a number.`,
      },
    };
  }

  const hours = hourLines.map((line) => {
    const [day = "", time = ""] = line.split("|").map((s) => s.trim());
    return { day, time };
  });

  const stats = statLines.map((line) => {
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
    return prismaToFormState(error, "site settings");
  }

  revalidatePath("/", "layout");
  return { success: true };
}
