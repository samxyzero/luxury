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
