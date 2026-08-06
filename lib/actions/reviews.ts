"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const reviewSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  quote: z.string().min(1),
  source: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export interface ReviewFormState {
  error?: string;
}

export async function createReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  await verifySession();

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.review.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createReview failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  redirect("/admin/reviews");
}

export async function updateReview(
  id: string,
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  await verifySession();

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.review.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateReview failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  redirect("/admin/reviews");
}

export async function deleteReview(id: string) {
  await verifySession();
  await prisma.review.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/reviews");
}
