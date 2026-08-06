import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GalleryItemForm from "@/components/admin/GalleryItemForm";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });

  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Edit Gallery Image</h1>
      <div className="mt-8">
        <GalleryItemForm item={item} />
      </div>
    </div>
  );
}
