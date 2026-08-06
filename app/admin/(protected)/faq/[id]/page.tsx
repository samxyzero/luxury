import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FaqItemForm from "@/components/admin/FaqItemForm";

export default async function EditFaqItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.faqItem.findUnique({ where: { id } });

  if (!faq) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Edit FAQ</h1>
      <div className="mt-8">
        <FaqItemForm faq={faq} />
      </div>
    </div>
  );
}
