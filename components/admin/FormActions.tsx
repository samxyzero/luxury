import SubmitButton from "@/components/admin/SubmitButton";

interface FormActionsProps {
  label: string;
  pendingLabel?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Sticky action bar so long admin forms (Settings especially) can be saved
 * without scrolling to the bottom. Also surfaces the form-level error next to
 * the button that produced it, rather than stranding it at the end of the page.
 */
export default function FormActions({
  label,
  pendingLabel,
  error,
  fieldErrors,
}: FormActionsProps) {
  const fieldErrorCount = Object.keys(fieldErrors ?? {}).length;

  return (
    <div className="sticky bottom-0 z-10 mt-10 border-t border-stone bg-paper/95 py-4 backdrop-blur-sm">
      {error && (
        <p className="mb-3 border-l-2 border-red-700 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
          {fieldErrorCount > 0 && (
            <span className="mt-1 block text-red-700/80">
              {fieldErrorCount} field{fieldErrorCount === 1 ? "" : "s"} need
              {fieldErrorCount === 1 ? "s" : ""} attention — see the highlighted field
              {fieldErrorCount === 1 ? "" : "s"} above.
            </span>
          )}
        </p>
      )}
      <SubmitButton pendingLabel={pendingLabel}>{label}</SubmitButton>
    </div>
  );
}
