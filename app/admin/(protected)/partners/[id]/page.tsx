import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PartnerForm from "@/components/admin/PartnerForm";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });

  if (!partner) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Edit Partner</h1>
      <div className="mt-8">
        <PartnerForm partner={partner} />
      </div>
    </div>
  );
}
