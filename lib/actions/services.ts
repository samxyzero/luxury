"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { SERVICE_ICON_OPTIONS } from "@/lib/constants";

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.enum(SERVICE_ICON_OPTIONS),
  order: z.coerce.number().int().default(0),
});

export interface ServiceFormState {
  error?: string;
}

export async function createService(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await verifySession();

  const parsed = serviceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.service.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createService failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await verifySession();

  const parsed = serviceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.service.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateService failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await verifySession();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}
