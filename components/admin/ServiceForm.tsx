"use client";

import { useActionState } from "react";
import { createService, updateService, type ServiceFormState } from "@/lib/actions/services";
import { SERVICE_ICON_OPTIONS } from "@/lib/constants";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import FormActions from "@/components/admin/FormActions";
import type { Service } from "@/lib/generated/prisma/client";

interface ServiceFormProps {
  service?: Service;
}

const initialState: ServiceFormState = {};

export default function ServiceForm({ service }: ServiceFormProps) {
  const action = service ? updateService.bind(null, service.id) : createService;
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Title" htmlFor="title" error={errors.title}>
        <input
          id="title"
          name="title"
          defaultValue={service?.title}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Description" htmlFor="description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          defaultValue={service?.description}
          required
          rows={4}
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Icon" htmlFor="icon" error={errors.icon}>
        <select
          id="icon"
          name="icon"
          defaultValue={service?.icon ?? SERVICE_ICON_OPTIONS[0]}
          className={fieldInputClassName}
        >
          {SERVICE_ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
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
          defaultValue={service?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      <FormActions
        label={service ? "Save Changes" : "Create Service"}
        error={state.error}
        fieldErrors={state.fieldErrors}
      />
    </form>
  );
}
