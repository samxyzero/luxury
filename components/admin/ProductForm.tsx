"use client";

import { useActionState } from "react";
import { createProduct, updateProduct, type ProductFormState } from "@/lib/actions/products";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Product } from "@/lib/generated/prisma/client";

interface ProductFormProps {
  product?: Product;
}

const initialState: ProductFormState = {};

export default function ProductForm({ product }: ProductFormProps) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Name" htmlFor="name">
        <input
          id="name"
          name="name"
          defaultValue={product?.name}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Category" htmlFor="category">
        <input
          id="category"
          name="category"
          defaultValue={product?.category}
          required
          className={fieldInputClassName}
          placeholder="e.g. Sleep Comfort"
        />
      </FormField>
      <FormField label="Description" htmlFor="description">
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
          rows={4}
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Image URL" htmlFor="image">
        <input
          id="image"
          name="image"
          defaultValue={product?.image}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Ideal For" htmlFor="idealFor">
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
      <FormField label="Display Order (lower shows first)" htmlFor="order">
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={product?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <SubmitButton>{product ? "Save Changes" : "Create Product"}</SubmitButton>
    </form>
  );
}
