import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteFaqItem } from "@/lib/actions/faq";
import DataTable from "@/components/admin/DataTable";
import type { FaqItem } from "@/lib/generated/prisma/client";

export default async function FaqListPage() {
  const faqs = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">FAQ</h1>
          <p className="mt-2 text-ink-muted">{faqs.length} total</p>
        </div>
        <Link
          href="/admin/faq/new"
          className="label border border-ink px-6 py-3 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          + New Question
        </Link>
      </div>

      <div className="mt-8">
        <DataTable<FaqItem>
          rows={faqs}
          editHref={(row) => `/admin/faq/${row.id}`}
          deleteAction={deleteFaqItem}
          itemLabel={(row) => row.question}
          emptyLabel="No FAQs yet."
          columns={[
            { header: "Question", render: (row) => row.question },
            {
              header: "Answer",
              render: (row) => <span className="line-clamp-1 text-ink-muted">{row.answer}</span>,
            },
          ]}
        />
      </div>
    </div>
  );
}
