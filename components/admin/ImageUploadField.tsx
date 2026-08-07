"use client";

import { useId, useState } from "react";
import { uploadImage } from "@/lib/actions/upload";
import { fieldInputClassName } from "@/components/admin/FormField";

interface ImageUploadFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  /** Server-side validation error for this field. */
  error?: string;
}

export default function ImageUploadField({
  label,
  name,
  defaultValue,
  required,
  error: fieldError,
}: ImageUploadFieldProps) {
  const fileInputId = useId();
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(undefined);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadImage(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setUrl(result.url);
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label htmlFor={fileInputId} className="label mb-2 block text-ink-muted">
        {label}
      </label>
      <div className="flex items-start gap-4">
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-20 w-20 shrink-0 border border-stone object-cover" />
        )}
        <div className="flex-1 space-y-3">
          <input
            type="text"
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required={required}
            placeholder="https://... or upload a file below"
            className={fieldInputClassName}
          />
          <div className="flex items-center gap-3">
            <label
              htmlFor={fileInputId}
              className="label inline-block cursor-pointer border border-navy px-4 py-2 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </label>
            <input
              id={fileInputId}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </div>
          {(error || fieldError) && (
            <p className="border-l-2 border-red-700 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error ?? fieldError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
