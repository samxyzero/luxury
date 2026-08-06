"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingLabel?: string;
}

export default function SubmitButton({ children, pendingLabel = "Saving..." }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="label border border-ink px-6 py-3 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper disabled:opacity-50"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
