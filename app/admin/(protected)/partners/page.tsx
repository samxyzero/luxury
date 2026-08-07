import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePartner } from "@/lib/actions/partners";
import DataTable from "@/components/admin/DataTable";
import type { Partner } from "@/lib/generated/prisma/client";

export default async function PartnersListPage() {
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Partners</h1>
          <p className="mt-2 text-ink-muted">{partners.length} total</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="label border border-navy px-6 py-3 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper"
        >
          + New Partner
        </Link>
      </div>

      <div className="mt-8">
        <DataTable<Partner>
          rows={partners}
          editHref={(row) => `/admin/partners/${row.id}`}
          deleteAction={deletePartner}
          itemLabel={(row) => row.name}
          emptyLabel="No partners yet."
          columns={[{ header: "Name", render: (row) => row.name }]}
        />
      </div>
    </div>
  );
}
