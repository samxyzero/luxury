"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export interface FaqFormState {
  error?: string;
}

export async function createFaqItem(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await verifySession();

  const parsed = faqSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.faqItem.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createFaqItem failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function updateFaqItem(
  id: string,
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await verifySession();

  const parsed = faqSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.faqItem.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateFaqItem failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function deleteFaqItem(id: string) {
  await verifySession();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/faq");
}
