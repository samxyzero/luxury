"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const partnerSchema = z.object({
  name: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export interface PartnerFormState {
  error?: string;
}

export async function createPartner(
  _prevState: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  await verifySession();

  const parsed = partnerSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.partner.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createPartner failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}

export async function updatePartner(
  id: string,
  _prevState: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  await verifySession();

  const parsed = partnerSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.partner.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updatePartner failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}

export async function deletePartner(id: string) {
  await verifySession();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/partners");
}
