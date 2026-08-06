import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">New Service</h1>
      <div className="mt-8">
        <ServiceForm />
      </div>
    </div>
  );
}
