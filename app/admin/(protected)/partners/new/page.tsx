import PartnerForm from "@/components/admin/PartnerForm";

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">New Partner</h1>
      <div className="mt-8">
        <PartnerForm />
      </div>
    </div>
  );
}
