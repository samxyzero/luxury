"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { slugify } from "@/lib/slug";
import { zodToFormState, prismaToFormState, type FormState } from "@/lib/actions/form-errors";

/** Textarea lists are one item per line; blanks are dropped. */
function splitLines(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const productSchema = z.object({
  name: z.string().trim().min(1, "Enter a product name."),
  slug: z
    .string()
    .trim()
    .transform((v) => slugify(v))
    .pipe(
      z
        .string()
        .min(1, "Enter a URL slug, or leave it blank to generate one from the name.")
        .regex(
          /^[a-z0-9]+(-[a-z0-9]+)*$/,
          "Slug can only contain lowercase letters, numbers and single hyphens."
        )
    ),
  category: z
    .string()
    .trim()
    .min(1, "Enter a category (e.g. Sleep Comfort) — it drives the product filters."),
  description: z.string().trim().min(1, "Enter a description for this product."),
  image: z.url("Enter a valid image URL, or use the Upload Image button above."),
  idealFor: z.enum(["Homes", "Hotels", "Homes & Hotels"], {
    message: "Choose whether this suits Homes, Hotels, or both.",
  }),
  shortDescription: z
    .string()
    .trim()
    .max(200, "Keep the short description under 200 characters — it's used on cards.")
    .optional()
    .transform((v) => v || null),
  material: z.string().trim().optional().transform((v) => v || null),
  care: z.string().trim().optional().transform((v) => v || null),
  highlights: z.string().optional().transform(splitLines),
  homesSummary: z.string().trim().optional().transform((v) => v || null),
  homesPoints: z.string().optional().transform(splitLines),
  hotelsSummary: z.string().trim().optional().transform((v) => v || null),
  hotelsPoints: z.string().optional().transform(splitLines),
  // Unchecked checkboxes are absent from FormData, which coerces to false —
  // exactly the intended semantics, so no default is needed here.
  inStock: z.coerce.boolean(),
  featured: z.coerce.boolean(),
  order: z.coerce
    .number({ message: "Display order must be a number." })
    .int("Display order must be a whole number.")
    .default(0),
});

export type ProductFormState = FormState;

/** Falls back to a slug derived from the name when the field is left blank. */
function withDerivedSlug(raw: Record<string, unknown>): Record<string, unknown> {
  const slug = typeof raw.slug === "string" ? raw.slug.trim() : "";
  if (slug) return raw;
  const name = typeof raw.name === "string" ? raw.name : "";
  return { ...raw, slug: slugify(name) };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await verifySession();

  const parsed = productSchema.safeParse(
    withDerivedSlug(Object.fromEntries(formData.entries()))
  );
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.product.create({ data: parsed.data });
  } catch (error) {
    console.error("[admin] createProduct failed:", error);
    return prismaToFormState(error, "product");
  }

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await verifySession();

  const parsed = productSchema.safeParse(
    withDerivedSlug(Object.fromEntries(formData.entries()))
  );
  if (!parsed.success) return zodToFormState(parsed.error);

  try {
    await prisma.product.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error("[admin] updateProduct failed:", error);
    return prismaToFormState(error, "product");
  }

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await verifySession();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/", "layout");
}
