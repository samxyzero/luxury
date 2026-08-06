"use client";

import { useActionState } from "react";
import { updateSettings, type SettingsState } from "@/lib/actions/settings";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FormActions from "@/components/admin/FormActions";
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
  const errors = state.fieldErrors ?? {};

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
        <FormField label="Business Name" htmlFor="businessName" error={errors.businessName}>
          <input
            id="businessName"
            name="businessName"
            defaultValue={settings.businessName}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Tagline" htmlFor="tagline" error={errors.tagline}>
          <input
            id="tagline"
            name="tagline"
            defaultValue={settings.tagline}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="SEO Meta Description" htmlFor="metaDescription" error={errors.metaDescription}>
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
          <FormField label="Phone (tel: format)" htmlFor="phone" error={errors.phone}>
            <input id="phone" name="phone" defaultValue={settings.phone} required className={fieldInputClassName} />
          </FormField>
          <FormField label="Phone (display)" htmlFor="phoneDisplay" error={errors.phoneDisplay}>
            <input
              id="phoneDisplay"
              name="phoneDisplay"
              defaultValue={settings.phoneDisplay}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="WhatsApp (digits only, with country code)" htmlFor="whatsapp" error={errors.whatsapp}>
            <input
              id="whatsapp"
              name="whatsapp"
              defaultValue={settings.whatsapp}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Email" htmlFor="email" error={errors.email}>
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
          <FormField label="Street / Landmark" htmlFor="addressLine1" error={errors.addressLine1}>
            <input
              id="addressLine1"
              name="addressLine1"
              defaultValue={settings.addressLine1}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Area" htmlFor="addressArea" error={errors.addressArea}>
            <input
              id="addressArea"
              name="addressArea"
              defaultValue={settings.addressArea}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="City" htmlFor="addressCity" error={errors.addressCity}>
            <input
              id="addressCity"
              name="addressCity"
              defaultValue={settings.addressCity}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Postal Code" htmlFor="addressPostalCode" error={errors.addressPostalCode}>
            <input
              id="addressPostalCode"
              name="addressPostalCode"
              defaultValue={settings.addressPostalCode}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Country" htmlFor="addressCountry" error={errors.addressCountry}>
            <input
              id="addressCountry"
              name="addressCountry"
              defaultValue={settings.addressCountry}
              required
              className={fieldInputClassName}
            />
          </FormField>
        </div>
        <FormField label="Google Maps Embed URL" htmlFor="mapEmbedUrl" error={errors.mapEmbedUrl}>
          <input
            id="mapEmbedUrl"
            name="mapEmbedUrl"
            defaultValue={settings.mapEmbedUrl}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Google Maps Link URL" htmlFor="mapsUrl" error={errors.mapsUrl}>
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
          <FormField label="Facebook URL" htmlFor="socialFacebook" error={errors.socialFacebook}>
            <input
              id="socialFacebook"
              name="socialFacebook"
              defaultValue={settings.socialFacebook}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Instagram URL" htmlFor="socialInstagram" error={errors.socialInstagram}>
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
        <FormField label="Eyebrow" htmlFor="heroEyebrow" error={errors.heroEyebrow}>
          <input
            id="heroEyebrow"
            name="heroEyebrow"
            defaultValue={settings.heroEyebrow}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Headline" htmlFor="heroHeadline" error={errors.heroHeadline}>
            <input
              id="heroHeadline"
              name="heroHeadline"
              defaultValue={settings.heroHeadline}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Highlighted Word" htmlFor="heroHighlight" error={errors.heroHighlight}>
            <input
              id="heroHighlight"
              name="heroHighlight"
              defaultValue={settings.heroHighlight}
              required
              className={fieldInputClassName}
            />
          </FormField>
        </div>
        <FormField label="Subheadline" htmlFor="heroSubheadline" error={errors.heroSubheadline}>
          <textarea
            id="heroSubheadline"
            name="heroSubheadline"
            defaultValue={settings.heroSubheadline}
            required
            rows={3}
            className={fieldInputClassName}
          />
        </FormField>
        <ImageUploadField label="Hero Background Image" name="heroImage" defaultValue={settings.heroImage} required error={errors.heroImage} />
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Primary Button Label" htmlFor="heroCtaPrimaryLabel" error={errors.heroCtaPrimaryLabel}>
            <input
              id="heroCtaPrimaryLabel"
              name="heroCtaPrimaryLabel"
              defaultValue={settings.heroCtaPrimaryLabel}
              required
              className={fieldInputClassName}
            />
          </FormField>
          <FormField label="Secondary Button Label" htmlFor="heroCtaSecondaryLabel" error={errors.heroCtaSecondaryLabel}>
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
        <FormField label="Eyebrow" htmlFor="aboutEyebrow" error={errors.aboutEyebrow}>
          <input
            id="aboutEyebrow"
            name="aboutEyebrow"
            defaultValue={settings.aboutEyebrow}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Heading" htmlFor="aboutHeading" error={errors.aboutHeading}>
          <input
            id="aboutHeading"
            name="aboutHeading"
            defaultValue={settings.aboutHeading}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <ImageUploadField label="About Section Image" name="aboutImage" defaultValue={settings.aboutImage} required error={errors.aboutImage} />
        <FormField label="Years of Experience" htmlFor="aboutYearsExperience" error={errors.aboutYearsExperience}>
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
        <FormField label="Body Paragraphs (one per line)" htmlFor="aboutBody" error={errors.aboutBody}>
          <textarea
            id="aboutBody"
            name="aboutBody"
            defaultValue={settings.aboutBody.join("\n")}
            required
            rows={4}
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Highlights (one per line)" htmlFor="aboutHighlights" error={errors.aboutHighlights}>
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
        <FormField label="Business Hours — one per line, format: Day(s) | Time" htmlFor="hours" error={errors.hours}>
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
          htmlFor="stats" error={errors.stats}
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

      {state.success && (
        <p className="border-l-2 border-gold bg-gold/5 px-3 py-2 text-sm text-gold-dim">
          Saved — the live site is updating now.
        </p>
      )}

      <FormActions label="Save Changes" error={state.error} fieldErrors={state.fieldErrors} />
    </form>
  );
}
