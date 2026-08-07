"use client";

import { useActionState, useState } from "react";
import { createProduct, updateProduct, type ProductFormState } from "@/lib/actions/products";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FormActions from "@/components/admin/FormActions";
import { slugify } from "@/lib/slug";
import type { Product } from "@/lib/generated/prisma/client";

interface ProductFormProps {
  product?: Product;
}

const initialState: ProductFormState = {};

export default function ProductForm({ product }: ProductFormProps) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  // Only auto-fill the slug for new products, so editing a live product never
  // silently changes its URL (and breaks inbound links) just by retitling it.
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const effectiveSlug = slugTouched ? slug : slugify(name);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Name" htmlFor="name" error={errors.name}>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={fieldInputClassName}
        />
      </FormField>

      <FormField label="URL Slug" htmlFor="slug" error={errors.slug}>
        <input
          id="slug"
          name="slug"
          value={effectiveSlug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className={fieldInputClassName}
          placeholder="auto-generated from the name"
        />
        <p className="mt-1.5 text-xs text-ink-muted">
          Page address: /products/{effectiveSlug || "…"}
          {product && " — changing this breaks existing links to this product."}
        </p>
      </FormField>

      <FormField label="Category" htmlFor="category" error={errors.category}>
        <input
          id="category"
          name="category"
          defaultValue={product?.category}
          required
          className={fieldInputClassName}
          placeholder="e.g. Sleep Comfort"
        />
      </FormField>

      <FormField label="Description" htmlFor="description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
          rows={4}
          className={fieldInputClassName}
        />
      </FormField>

      <ImageUploadField
        label="Product Image"
        name="image"
        defaultValue={product?.image}
        required
        error={errors.image}
      />

      <FormField label="Ideal For" htmlFor="idealFor" error={errors.idealFor}>
        <select
          id="idealFor"
          name="idealFor"
          defaultValue={product?.idealFor ?? "Homes & Hotels"}
          className={fieldInputClassName}
        >
          <option value="Homes">Homes</option>
          <option value="Hotels">Hotels</option>
          <option value="Homes & Hotels">Homes &amp; Hotels</option>
        </select>
      </FormField>

      <FormField
        label="Short Description (used on cards)"
        htmlFor="shortDescription"
        error={errors.shortDescription}
      >
        <input
          id="shortDescription"
          name="shortDescription"
          defaultValue={product?.shortDescription ?? ""}
          maxLength={200}
          className={fieldInputClassName}
          placeholder="One line — falls back to the full description if left blank"
        />
      </FormField>

      <FormField
        label="Materials & Quality"
        htmlFor="material"
        error={errors.material}
      >
        <textarea
          id="material"
          name="material"
          defaultValue={product?.material ?? ""}
          rows={3}
          className={fieldInputClassName}
          placeholder="e.g. 300TC long-staple cotton sateen"
        />
      </FormField>

      <FormField label="Care Instructions" htmlFor="care" error={errors.care}>
        <textarea
          id="care"
          name="care"
          defaultValue={product?.care ?? ""}
          rows={2}
          className={fieldInputClassName}
          placeholder="e.g. Machine wash warm. Tumble dry low."
        />
      </FormField>

      <FormField
        label="Highlights — one per line"
        htmlFor="highlights"
        error={errors.highlights}
      >
        <textarea
          id="highlights"
          name="highlights"
          defaultValue={(product?.highlights ?? []).join("\n")}
          rows={4}
          className={fieldInputClassName}
          placeholder={"Blackout linings for guest rooms\nMeasured and installed by our team"}
        />
      </FormField>

      <fieldset className="space-y-6 border-t border-stone pt-8">
        <legend className="label mb-2 text-gold-dim">For Homes</legend>
        <FormField
          label="Summary — how the household range differs"
          htmlFor="homesSummary"
          error={errors.homesSummary}
        >
          <textarea
            id="homesSummary"
            name="homesSummary"
            defaultValue={product?.homesSummary ?? ""}
            rows={3}
            className={fieldInputClassName}
            placeholder="e.g. Households get the colour and the pattern — printed cotton in softer sateen finishes."
          />
        </FormField>
        <FormField
          label="Points — one per line"
          htmlFor="homesPoints"
          error={errors.homesPoints}
        >
          <textarea
            id="homesPoints"
            name="homesPoints"
            defaultValue={(product?.homesPoints ?? []).join("\n")}
            rows={4}
            className={fieldInputClassName}
            placeholder={"Printed and colourful cotton\nSofter sateen finishes"}
          />
        </FormField>
      </fieldset>

      <fieldset className="space-y-6 border-t border-stone pt-8">
        <legend className="label mb-2 text-gold-dim">For Hotels, Resorts &amp; Apartments</legend>
        <FormField
          label="Summary — how the trade range differs"
          htmlFor="hotelsSummary"
          error={errors.hotelsSummary}
        >
          <textarea
            id="hotelsSummary"
            name="hotelsSummary"
            defaultValue={product?.hotelsSummary ?? ""}
            rows={3}
            className={fieldInputClassName}
            placeholder="e.g. Properties get plain white cotton and linen — bleach-tolerant and held as a stock line."
          />
        </FormField>
        <FormField
          label="Points — one per line"
          htmlFor="hotelsPoints"
          error={errors.hotelsPoints}
        >
          <textarea
            id="hotelsPoints"
            name="hotelsPoints"
            defaultValue={(product?.hotelsPoints ?? []).join("\n")}
            rows={4}
            className={fieldInputClassName}
            placeholder={"Plain white and ivory only\nBleach-tolerant for commercial laundry"}
          />
        </FormField>
      </fieldset>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <label htmlFor="featured" className="flex items-center gap-3 text-sm text-ink">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={product?.featured ?? false}
            className="h-4 w-4 accent-gold"
          />
          Show on the homepage
        </label>
        <label htmlFor="inStock" className="flex items-center gap-3 text-sm text-ink">
          <input
            id="inStock"
            name="inStock"
            type="checkbox"
            defaultChecked={product?.inStock ?? true}
            className="h-4 w-4 accent-gold"
          />
          In stock
        </label>
      </div>

      <FormField
        label="Display Order (lower shows first)"
        htmlFor="order"
        error={errors.order}
      >
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={product?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      <FormActions
        label={product ? "Save Changes" : "Create Product"}
        error={state.error}
        fieldErrors={state.fieldErrors}
      />
    </form>
  );
}
