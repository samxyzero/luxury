import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteReview } from "@/lib/actions/reviews";
import DataTable from "@/components/admin/DataTable";
import type { Review } from "@/lib/generated/prisma/client";

export default async function ReviewsListPage() {
  const reviews = await prisma.review.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Reviews</h1>
          <p className="mt-2 text-ink-muted">{reviews.length} total</p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="label border border-navy px-6 py-3 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper"
        >
          + New Review
        </Link>
      </div>

      <div className="mt-8">
        <DataTable<Review>
          rows={reviews}
          editHref={(row) => `/admin/reviews/${row.id}`}
          deleteAction={deleteReview}
          itemLabel={(row) => row.name}
          emptyLabel="No reviews yet."
          columns={[
            { header: "Name", render: (row) => row.name },
            { header: "Rating", render: (row) => `${row.rating} / 5` },
            {
              header: "Quote",
              render: (row) => <span className="line-clamp-1 text-ink-muted">{row.quote}</span>,
            },
          ]}
        />
      </div>
    </div>
  );
}
