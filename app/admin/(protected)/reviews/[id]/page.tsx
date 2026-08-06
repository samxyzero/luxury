import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReviewForm from "@/components/admin/ReviewForm";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Edit Review</h1>
      <div className="mt-8">
        <ReviewForm review={review} />
      </div>
    </div>
  );
}
