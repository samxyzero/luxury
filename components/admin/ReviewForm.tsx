"use client";

import { useActionState } from "react";
import { createReview, updateReview, type ReviewFormState } from "@/lib/actions/reviews";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import FormActions from "@/components/admin/FormActions";
import type { Review } from "@/lib/generated/prisma/client";

interface ReviewFormProps {
  review?: Review;
}

const initialState: ReviewFormState = {};

export default function ReviewForm({ review }: ReviewFormProps) {
  const action = review ? updateReview.bind(null, review.id) : createReview;
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            defaultValue={review?.name}
            required
            className={fieldInputClassName}
          />
        </FormField>
        <FormField label="Role / Context" htmlFor="role" error={errors.role}>
          <input
            id="role"
            name="role"
            defaultValue={review?.role}
            required
            className={fieldInputClassName}
            placeholder="e.g. Homeowner, Pokhara"
          />
        </FormField>
      </div>
      <FormField label="Rating (1–5)" htmlFor="rating" error={errors.rating}>
        <input
          id="rating"
          name="rating"
          type="number"
          min={1}
          max={5}
          defaultValue={review?.rating ?? 5}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Quote" htmlFor="quote" error={errors.quote}>
        <textarea
          id="quote"
          name="quote"
          defaultValue={review?.quote}
          required
          rows={4}
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Source" htmlFor="source" error={errors.source}>
        <input
          id="source"
          name="source"
          defaultValue={review?.source ?? "Google Review"}
          required
          className={fieldInputClassName}
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
          defaultValue={review?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      <FormActions
        label={review ? "Save Changes" : "Create Review"}
        error={state.error}
        fieldErrors={state.fieldErrors}
      />
    </form>
  );
}
