"use client";

import { useState } from "react";

interface DeleteButtonProps {
  action: (formData: FormData) => void | Promise<void>;
  itemLabel?: string;
}

export default function DeleteButton({ action, itemLabel = "this item" }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <form action={action} className="flex items-center gap-3">
        <span className="text-xs text-ink-muted">Delete {itemLabel}?</span>
        <button type="submit" className="label text-red-700 underline underline-offset-2">
          Confirm
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="label text-ink-muted underline underline-offset-2"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="label text-ink-muted transition-colors duration-300 hover:text-red-700"
    >
      Delete
    </button>
  );
}
