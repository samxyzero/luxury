"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { SERVICE_ICON_OPTIONS } from "@/lib/constants";
import { zodToFormState, prismaToFormState, type FormState } from "@/lib/actions/form-errors";

const serviceSchema = z.object({
  title: z.string().trim().min(1, "Enter a service title."),
  description: z
    .string()
    .trim()
    .min(1, "Enter a description so visitors know what this service covers."),
  icon: z.enum(SERVICE_ICON_OPTIONS, {
    message: `Choose one of the available icons (${SERVICE_ICON_OPTIONS.join(", ")}).`,
  }),
  order: z.coerce
    .number({ message: "Display order must be a number." })
    .int("Display order must be a whole number.")
    .default(0),
});

export type ServiceFormState = FormState;

export async function createService(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await verifySession();

  const parsed = serviceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.service.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createService failed:", error);
    return prismaToFormState(error, "service");
  }

  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await verifySession();

  const parsed = serviceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.service.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateService failed:", error);
    return prismaToFormState(error, "service");
  }

  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await verifySession();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/", "layout");
}
