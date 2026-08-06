"use client";

import { useActionState } from "react";
import { createService, updateService, type ServiceFormState } from "@/lib/actions/services";
import { SERVICE_ICON_OPTIONS } from "@/lib/constants";
import FormField, { fieldInputClassName } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Service } from "@/lib/generated/prisma/client";

interface ServiceFormProps {
  service?: Service;
}

const initialState: ServiceFormState = {};

export default function ServiceForm({ service }: ServiceFormProps) {
  const action = service ? updateService.bind(null, service.id) : createService;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <FormField label="Title" htmlFor="title">
        <input
          id="title"
          name="title"
          defaultValue={service?.title}
          required
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Description" htmlFor="description">
        <textarea
          id="description"
          name="description"
          defaultValue={service?.description}
          required
          rows={4}
          className={fieldInputClassName}
        />
      </FormField>
      <FormField label="Icon" htmlFor="icon">
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
      <FormField label="Display Order (lower shows first)" htmlFor="order">
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={service?.order ?? 0}
          className={fieldInputClassName}
        />
      </FormField>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <SubmitButton>{service ? "Save Changes" : "Create Service"}</SubmitButton>
    </form>
  );
}
