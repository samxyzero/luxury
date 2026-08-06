"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { zodToFormState, prismaToFormState, type FormState } from "@/lib/actions/form-errors";

const faqSchema = z.object({
  question: z.string().trim().min(1, "Enter the question visitors are asking."),
  answer: z.string().trim().min(1, "Enter an answer — this is indexed by search engines."),
  order: z.coerce
    .number({ message: "Display order must be a number." })
    .int("Display order must be a whole number.")
    .default(0),
});

export type FaqFormState = FormState;

export async function createFaqItem(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await verifySession();

  const parsed = faqSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.faqItem.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createFaqItem failed:", error);
    return prismaToFormState(error, "FAQ item");
  }

  revalidatePath("/", "layout");
  redirect("/admin/faq");
}

export async function updateFaqItem(
  id: string,
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await verifySession();

  const parsed = faqSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.faqItem.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateFaqItem failed:", error);
    return prismaToFormState(error, "FAQ item");
  }

  revalidatePath("/", "layout");
  redirect("/admin/faq");
}

export async function deleteFaqItem(id: string) {
  await verifySession();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/", "layout");
}
