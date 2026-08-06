"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";

const galleryItemSchema = z.object({
  image: z.url(),
  caption: z.string().min(1),
  category: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export interface GalleryItemFormState {
  error?: string;
}

export async function createGalleryItem(
  _prevState: GalleryItemFormState,
  formData: FormData
): Promise<GalleryItemFormState> {
  await verifySession();

  const parsed = galleryItemSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.galleryItem.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createGalleryItem failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function updateGalleryItem(
  id: string,
  _prevState: GalleryItemFormState,
  formData: FormData
): Promise<GalleryItemFormState> {
  await verifySession();

  const parsed = galleryItemSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await prisma.galleryItem.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateGalleryItem failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  await verifySession();
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}
