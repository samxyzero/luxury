import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Edit Service</h1>
      <div className="mt-8">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
