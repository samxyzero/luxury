import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">New Product</h1>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
