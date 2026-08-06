"use client";

import { useActionState } from "react";
import { createPartner, updatePartner, type PartnerFormState } from "@/lib/actions/partners";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Partner } from "@/lib/generated/prisma/client";

interface PartnerFormProps {
  partner?: Partner;
}

const initialState: PartnerFormState = {};

export default function PartnerForm({ partner }: PartnerFormProps) {
  const action = partner ? updatePartner.bind(null, partner.id) : createPartner;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Name" htmlFor="name">
        <input
          id="name"
          name="name"
          defaultValue={partner?.name}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Display Order (lower shows first)" htmlFor="order">
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={partner?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <SubmitButton>{partner ? "Save Changes" : "Create Partner"}</SubmitButton>
    </form>
  );
}
