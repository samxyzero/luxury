"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { zodToFormState, prismaToFormState, type FormState } from "@/lib/actions/form-errors";

const partnerSchema = z.object({
  name: z.string().trim().min(1, "Enter the partner or brand name."),
  order: z.coerce
    .number({ message: "Display order must be a number." })
    .int("Display order must be a whole number.")
    .default(0),
});

export type PartnerFormState = FormState;

export async function createPartner(
  _prevState: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  await verifySession();

  const parsed = partnerSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.partner.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createPartner failed:", error);
    return prismaToFormState(error, "partner");
  }

  revalidatePath("/", "layout");
  redirect("/admin/partners");
}

export async function updatePartner(
  id: string,
  _prevState: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  await verifySession();

  const parsed = partnerSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.partner.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updatePartner failed:", error);
    return prismaToFormState(error, "partner");
  }

  revalidatePath("/", "layout");
  redirect("/admin/partners");
}

export async function deletePartner(id: string) {
  await verifySession();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/", "layout");
}
