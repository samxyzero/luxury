import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteGalleryItem } from "@/lib/actions/gallery";
import DataTable from "@/components/admin/DataTable";
import type { GalleryItem } from "@/lib/generated/prisma/client";

export default async function GalleryListPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Gallery</h1>
          <p className="mt-2 text-ink-muted">{items.length} total</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="label border border-navy px-6 py-3 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper"
        >
          + New Image
        </Link>
      </div>

      <div className="mt-8">
        <DataTable<GalleryItem>
          rows={items}
          editHref={(row) => `/admin/gallery/${row.id}`}
          deleteAction={deleteGalleryItem}
          itemLabel={(row) => row.caption}
          emptyLabel="No gallery images yet."
          columns={[
            {
              header: "Image",
              render: (row) => (
                // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-entered URLs
                <img src={row.image} alt={row.caption} className="h-12 w-12 object-cover" />
              ),
            },
            { header: "Caption", render: (row) => row.caption },
            { header: "Category", render: (row) => row.category },
          ]}
        />
      </div>
    </div>
  );
}
