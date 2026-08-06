import FaqItemForm from "@/components/admin/FaqItemForm";

export default function NewFaqItemPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">New FAQ</h1>
      <div className="mt-8">
        <FaqItemForm />
      </div>
    </div>
  );
}
