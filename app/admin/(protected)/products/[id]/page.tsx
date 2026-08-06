import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Edit Product</h1>
      <div className="mt-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
