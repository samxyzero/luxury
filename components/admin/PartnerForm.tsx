"use client";

import { useActionState } from "react";
import { createPartner, updatePartner, type PartnerFormState } from "@/lib/actions/partners";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import FormActions from "@/components/admin/FormActions";
import type { Partner } from "@/lib/generated/prisma/client";

interface PartnerFormProps {
  partner?: Partner;
}

const initialState: PartnerFormState = {};

export default function PartnerForm({ partner }: PartnerFormProps) {
  const action = partner ? updatePartner.bind(null, partner.id) : createPartner;
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Name" htmlFor="name" error={errors.name}>
        <input
          id="name"
          name="name"
          defaultValue={partner?.name}
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
          defaultValue={partner?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      <FormActions
        label={partner ? "Save Changes" : "Create Partner"}
        error={state.error}
        fieldErrors={state.fieldErrors}
      />
    </form>
  );
}
