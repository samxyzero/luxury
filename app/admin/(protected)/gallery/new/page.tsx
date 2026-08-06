import GalleryItemForm from "@/components/admin/GalleryItemForm";

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">New Gallery Image</h1>
      <div className="mt-8">
        <GalleryItemForm />
      </div>
    </div>
  );
}
