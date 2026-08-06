"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { zodToFormState, prismaToFormState, type FormState } from "@/lib/actions/form-errors";

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Enter the reviewer's name."),
  role: z
    .string()
    .trim()
    .min(1, "Enter the reviewer's role or location (e.g. Hotel Owner, Lakeside)."),
  rating: z.coerce
    .number({ message: "Rating must be a number." })
    .int("Rating must be a whole number.")
    .min(1, "Rating must be between 1 and 5.")
    .max(5, "Rating must be between 1 and 5."),
  quote: z.string().trim().min(1, "Enter the review text."),
  source: z.string().trim().min(1, "Enter where this review came from (e.g. Google Reviews)."),
  order: z.coerce
    .number({ message: "Display order must be a number." })
    .int("Display order must be a whole number.")
    .default(0),
});

export type ReviewFormState = FormState;

export async function createReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  await verifySession();

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.review.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createReview failed:", error);
    return prismaToFormState(error, "review");
  }

  revalidatePath("/", "layout");
  redirect("/admin/reviews");
}

export async function updateReview(
  id: string,
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  await verifySession();

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.review.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateReview failed:", error);
    return prismaToFormState(error, "review");
  }

  revalidatePath("/", "layout");
  redirect("/admin/reviews");
}

export async function deleteReview(id: string) {
  await verifySession();
  await prisma.review.delete({ where: { id } });
  revalidatePath("/", "layout");
}
