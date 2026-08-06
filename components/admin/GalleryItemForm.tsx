"use client";

import { useActionState } from "react";
import {
  createGalleryItem,
  updateGalleryItem,
  type GalleryItemFormState,
} from "@/lib/actions/gallery";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { GalleryItem } from "@/lib/generated/prisma/client";

interface GalleryItemFormProps {
  item?: GalleryItem;
}

const initialState: GalleryItemFormState = {};

export default function GalleryItemForm({ item }: GalleryItemFormProps) {
  const action = item ? updateGalleryItem.bind(null, item.id) : createGalleryItem;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Image URL" htmlFor="image">
        <input
          id="image"
          name="image"
          defaultValue={item?.image}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Caption" htmlFor="caption">
        <input
          id="caption"
          name="caption"
          defaultValue={item?.caption}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Category" htmlFor="category">
        <input
          id="category"
          name="category"
          defaultValue={item?.category}
          required
          className={fieldInputClassName}
          placeholder="e.g. Hotels"
        />
      </FormField>
      <FormField label="Display Order (lower shows first)" htmlFor="order">
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={item?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <SubmitButton>{item ? "Save Changes" : "Create Gallery Item"}</SubmitButton>
    </form>
  );
}
