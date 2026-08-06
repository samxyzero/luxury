"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { zodToFormState, prismaToFormState, type FormState } from "@/lib/actions/form-errors";

const galleryItemSchema = z.object({
  image: z.url("Enter a valid image URL, or use the Upload Image button above."),
  caption: z.string().trim().min(1, "Enter a caption describing this photo."),
  category: z
    .string()
    .trim()
    .min(1, "Enter a category (e.g. Hotels) — it drives the gallery filters."),
  order: z.coerce
    .number({ message: "Display order must be a number." })
    .int("Display order must be a whole number.")
    .default(0),
});

export type GalleryItemFormState = FormState;

export async function createGalleryItem(
  _prevState: GalleryItemFormState,
  formData: FormData
): Promise<GalleryItemFormState> {
  await verifySession();

  const parsed = galleryItemSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.galleryItem.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createGalleryItem failed:", error);
    return prismaToFormState(error, "gallery item");
  }

  revalidatePath("/", "layout");
  redirect("/admin/gallery");
}

export async function updateGalleryItem(
  id: string,
  _prevState: GalleryItemFormState,
  formData: FormData
): Promise<GalleryItemFormState> {
  await verifySession();

  const parsed = galleryItemSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.galleryItem.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateGalleryItem failed:", error);
    return prismaToFormState(error, "gallery item");
  }

  revalidatePath("/", "layout");
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  await verifySession();
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/", "layout");
}
