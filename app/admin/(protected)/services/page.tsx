import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteService } from "@/lib/actions/services";
import DataTable from "@/components/admin/DataTable";
import type { Service } from "@/lib/generated/prisma/client";

export default async function ServicesListPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Services</h1>
          <p className="mt-2 text-ink-muted">{services.length} total</p>
        </div>
        <Link
          href="/admin/services/new"
          className="label border border-ink px-6 py-3 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          + New Service
        </Link>
      </div>

      <div className="mt-8">
        <DataTable<Service>
          rows={services}
          editHref={(row) => `/admin/services/${row.id}`}
          deleteAction={deleteService}
          itemLabel={(row) => row.title}
          emptyLabel="No services yet."
          columns={[
            { header: "Title", render: (row) => row.title },
            { header: "Icon", render: (row) => row.icon },
            {
              header: "Description",
              render: (row) => <span className="line-clamp-1 text-ink-muted">{row.description}</span>,
            },
          ]}
        />
      </div>
    </div>
  );
}
