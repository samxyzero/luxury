import ReviewForm from "@/components/admin/ReviewForm";

export default function NewReviewPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">New Review</h1>
      <div className="mt-8">
        <ReviewForm />
      </div>
    </div>
  );
}
