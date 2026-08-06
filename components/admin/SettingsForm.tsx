"use client";

import { useActionState } from "react";
import { updateSettings, type SettingsState } from "@/lib/actions/settings";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { SiteSettings as SiteSettingsRow } from "@/lib/generated/prisma/client";

interface SettingsFormProps {
  settings: SiteSettingsRow;
}

interface HourRow {
  day: string;
  time: string;
}
interface StatRow {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

const initialState: SettingsState = {};

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [state, formAction] = useActionState(updateSettings, initialState);

  const hoursText = (settings.hours as unknown as HourRow[])
    .map((h) => `${h.day} | ${h.time}`)
    .join("\n");
  const statsText = (settings.stats as unknown as StatRow[])
    .map((s) => `${s.id} | ${s.label} | ${s.value} | ${s.suffix}`)
    .join("\n");

  return (
    <form action={formAction} className="space-y-12">
      <fieldset className="space-y-6">
        <legend className="label mb-2 text-gold-dim">Business Info</legend>
        <FormField label="Business Name" htmlFor="businessName">
          <input
            id="businessName"
            name="businessName"
            defaultValue={settings.businessName}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Tagline" htmlFor="tagline">
          <input
            id="tagline"
            name="tagline"
            defaultValue={settings.tagline}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="SEO Meta Description" htmlFor="metaDescription">
          <textarea
            id="metaDescription"
            name="metaDescription"
            defaultValue={settings.metaDescription}
            required
            rows={3}
            className={fieldInputClassName}
          />
        </FormField>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Phone (tel: format)" htmlFor="phone">
            <input id="phone" name="phone" defaultValue={settings.phone} required className={fieldInputClassName} />
          </FormField>
          <FormField label="Phone (display)" htmlFor="phoneDisplay">
            <input
              id="phoneDisplay"
              name="phoneDisplay"
              defaultValue={settings.phoneDisplay}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="WhatsApp (digits only, with country code)" htmlFor="whatsapp">
            <input
              id="whatsapp"
              name="whatsapp"
              defaultValue={settings.whatsapp}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={settings.email}
              required
              className={fieldInputClassName}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="label mb-2 text-gold-dim">Address</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Street / Landmark" htmlFor="addressLine1">
            <input
              id="addressLine1"
              name="addressLine1"
              defaultValue={settings.addressLine1}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Area" htmlFor="addressArea">
            <input
              id="addressArea"
              name="addressArea"
              defaultValue={settings.addressArea}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="City" htmlFor="addressCity">
            <input
              id="addressCity"
              name="addressCity"
              defaultValue={settings.addressCity}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Postal Code" htmlFor="addressPostalCode">
            <input
              id="addressPostalCode"
              name="addressPostalCode"
              defaultValue={settings.addressPostalCode}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Country" htmlFor="addressCountry">
            <input
              id="addressCountry"
              name="addressCountry"
              defaultValue={settings.addressCountry}
              required
              className={fieldInputClassName}
            />
          </FormField>
        </div>
        <FormField label="Google Maps Embed URL" htmlFor="mapEmbedUrl">
          <input
            id="mapEmbedUrl"
            name="mapEmbedUrl"
            defaultValue={settings.mapEmbedUrl}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Google Maps Link URL" htmlFor="mapsUrl">
          <input
            id="mapsUrl"
            name="mapsUrl"
            defaultValue={settings.mapsUrl}
            required
            className={fieldInputClassName}
          />
        </FormField>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="label mb-2 text-gold-dim">Social</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Facebook URL" htmlFor="socialFacebook">
            <input
              id="socialFacebook"
              name="socialFacebook"
              defaultValue={settings.socialFacebook}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Instagram URL" htmlFor="socialInstagram">
            <input
              id="socialInstagram"
              name="socialInstagram"
              defaultValue={settings.socialInstagram}
              required
              className={fieldInputClassName}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="label mb-2 text-gold-dim">Hero Section</legend>
        <FormField label="Eyebrow" htmlFor="heroEyebrow">
          <input
            id="heroEyebrow"
            name="heroEyebrow"
            defaultValue={settings.heroEyebrow}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Headline" htmlFor="heroHeadline">
            <input
              id="heroHeadline"
              name="heroHeadline"
              defaultValue={settings.heroHeadline}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Highlighted Word" htmlFor="heroHighlight">
            <input
              id="heroHighlight"
              name="heroHighlight"
              defaultValue={settings.heroHighlight}
              required
              className={fieldInputClassName}
            />
          </FormField>
        </div>
        <FormField label="Subheadline" htmlFor="heroSubheadline">
          <textarea
            id="heroSubheadline"
            name="heroSubheadline"
            defaultValue={settings.heroSubheadline}
            required
            rows={3}
            className={fieldInputClassName}
          />
        </FormField>
        <ImageUploadField label="Hero Background Image" name="heroImage" defaultValue={settings.heroImage} required />
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Primary Button Label" htmlFor="heroCtaPrimaryLabel">
            <input
              id="heroCtaPrimaryLabel"
              name="heroCtaPrimaryLabel"
              defaultValue={settings.heroCtaPrimaryLabel}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Secondary Button Label" htmlFor="heroCtaSecondaryLabel">
            <input
              id="heroCtaSecondaryLabel"
              name="heroCtaSecondaryLabel"
              defaultValue={settings.heroCtaSecondaryLabel}
              required
              className={fieldInputClassName}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="label mb-2 text-gold-dim">About Section</legend>
        <FormField label="Eyebrow" htmlFor="aboutEyebrow">
          <input
            id="aboutEyebrow"
            name="aboutEyebrow"
            defaultValue={settings.aboutEyebrow}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Heading" htmlFor="aboutHeading">
          <input
            id="aboutHeading"
            name="aboutHeading"
            defaultValue={settings.aboutHeading}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <ImageUploadField label="About Section Image" name="aboutImage" defaultValue={settings.aboutImage} required />
        <FormField label="Years of Experience" htmlFor="aboutYearsExperience">
          <input
            id="aboutYearsExperience"
            name="aboutYearsExperience"
            type="number"
            min={0}
            defaultValue={settings.aboutYearsExperience}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Body Paragraphs (one per line)" htmlFor="aboutBody">
          <textarea
            id="aboutBody"
            name="aboutBody"
            defaultValue={settings.aboutBody.join("\n")}
            required
            rows={4}
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Highlights (one per line)" htmlFor="aboutHighlights">
          <textarea
            id="aboutHighlights"
            name="aboutHighlights"
            defaultValue={settings.aboutHighlights.join("\n")}
            required
            rows={4}
            className={fieldInputClassName}
          />
        </FormField>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="label mb-2 text-gold-dim">Hours &amp; Stats</legend>
        <FormField label="Business Hours — one per line, format: Day(s) | Time" htmlFor="hours">
          <textarea
            id="hours"
            name="hours"
            defaultValue={hoursText}
            required
            rows={4}
            className={fieldInputClassName}
            placeholder="Sunday – Friday | 8:30 AM – 7:30 PM"
          />
        </FormField>
        <FormField
          label="Trust Stats — one per line, format: id | label | value | suffix"
          htmlFor="stats"
        >
          <textarea
            id="stats"
            name="stats"
            defaultValue={statsText}
            required
            rows={5}
            className={fieldInputClassName}
            placeholder="years | Years of Trusted Service | 7 | +"
          />
        </FormField>
      </fieldset>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      {state.success && <p className="text-sm text-gold-dim">Saved — the live site is updating now.</p>}

      <SubmitButton>Save Changes</SubmitButton>
    </form>
  );
}
