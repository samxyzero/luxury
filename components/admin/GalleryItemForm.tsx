"use client";

import { useActionState } from "react";
import {
  createGalleryItem,
  updateGalleryItem,
  type GalleryItemFormState,
} from "@/lib/actions/gallery";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FormActions from "@/components/admin/FormActions";
import type { GalleryItem } from "@/lib/generated/prisma/client";

interface GalleryItemFormProps {
  item?: GalleryItem;
}

const initialState: GalleryItemFormState = {};

export default function GalleryItemForm({ item }: GalleryItemFormProps) {
  const action = item ? updateGalleryItem.bind(null, item.id) : createGalleryItem;
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <ImageUploadField
        label="Gallery Image"
        name="image"
        defaultValue={item?.image}
        required
        error={errors.image}
      />
      <FormField label="Caption" htmlFor="caption" error={errors.caption}>
        <input
          id="caption"
          name="caption"
          defaultValue={item?.caption}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Category" htmlFor="category" error={errors.category}>
        <input
          id="category"
          name="category"
          defaultValue={item?.category}
          required
          className={fieldInputClassName}
          placeholder="e.g. Hotels"
        />
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
          defaultValue={item?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      <FormActions
        label={item ? "Save Changes" : "Create Gallery Item"}
        error={state.error}
        fieldErrors={state.fieldErrors}
      />
    </form>
  );
}
