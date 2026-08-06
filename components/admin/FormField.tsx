export const fieldInputClassName =
  "w-full border-0 border-b border-stone bg-transparent py-2.5 text-ink outline-none transition-colors duration-300 focus:border-gold";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
}

export default function FormField({ label, htmlFor, children, error }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label mb-2 block text-ink-muted">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
