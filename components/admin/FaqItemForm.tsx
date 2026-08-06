"use client";

import { useActionState } from "react";
import { createFaqItem, updateFaqItem, type FaqFormState } from "@/lib/actions/faq";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import FormActions from "@/components/admin/FormActions";
import type { FaqItem } from "@/lib/generated/prisma/client";

interface FaqItemFormProps {
  faq?: FaqItem;
}

const initialState: FaqFormState = {};

export default function FaqItemForm({ faq }: FaqItemFormProps) {
  const action = faq ? updateFaqItem.bind(null, faq.id) : createFaqItem;
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Question" htmlFor="question" error={errors.question}>
        <input
          id="question"
          name="question"
          defaultValue={faq?.question}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Answer" htmlFor="answer" error={errors.answer}>
        <textarea
          id="answer"
          name="answer"
          defaultValue={faq?.answer}
          required
          rows={4}
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
          defaultValue={faq?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      <FormActions
        label={faq ? "Save Changes" : "Create FAQ"}
        error={state.error}
        fieldErrors={state.fieldErrors}
      />
    </form>
  );
}
