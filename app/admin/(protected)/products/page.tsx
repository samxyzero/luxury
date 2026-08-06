import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions/products";
import DataTable from "@/components/admin/DataTable";
import type { Product } from "@/lib/generated/prisma/client";

export default async function ProductsListPage() {
  const products = await prisma.product.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Products</h1>
          <p className="mt-2 text-ink-muted">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="label border border-ink px-6 py-3 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          + New Product
        </Link>
      </div>

      <div className="mt-8">
        <DataTable<Product>
          rows={products}
          editHref={(row) => `/admin/products/${row.id}`}
          deleteAction={deleteProduct}
          itemLabel={(row) => row.name}
          emptyLabel="No products yet."
          columns={[
            {
              header: "Image",
              render: (row) => (
                // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-entered URLs, not in next.config.ts remotePatterns
                <img
                  src={row.image}
                  alt={row.name}
                  className="h-12 w-12 object-cover"
                />
              ),
            },
            { header: "Name", render: (row) => row.name },
            { header: "Category", render: (row) => row.category },
            { header: "Ideal For", render: (row) => row.idealFor },
          ]}
        />
      </div>
    </div>
  );
}
