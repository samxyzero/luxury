"use server";

import { verifySession } from "@/lib/dal";
import { cloudinary } from "@/lib/cloudinary";

/**
 * Keep in sync with `serverActions.bodySizeLimit` in next.config.ts, which must
 * sit above this value to absorb multipart overhead. If this ever exceeds the
 * framework limit, oversized uploads fail with an opaque network error instead
 * of the specific message below.
 */
const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/webp": "WebP",
  "image/avif": "AVIF",
  "image/gif": "GIF",
};

export interface UploadImageResult {
  url?: string;
  error?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export async function uploadImage(formData: FormData): Promise<UploadImageResult> {
  await verifySession();

  const missing = (
    ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"] as const
  ).filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error("[admin] uploadImage: missing Cloudinary env vars:", missing.join(", "));
    return {
      error: `Image uploads are not configured — ${missing.join(", ")} ${
        missing.length === 1 ? "is" : "are"
      } missing from the environment. Paste an image URL instead, or set the variable${
        missing.length === 1 ? "" : "s"
      } and restart the server.`,
    };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file was received. Please choose an image and try again." };
  }

  if (!ALLOWED_TYPES[file.type]) {
    const readable = file.type || "an unrecognised file type";
    return {
      error: `"${file.name}" is ${readable}, which can't be used. Supported formats: ${Object.values(
        ALLOWED_TYPES
      ).join(", ")}.`,
    };
  }

  if (file.size > MAX_BYTES) {
    return {
      error: `"${file.name}" is ${formatSize(file.size)} — the limit is ${formatSize(
        MAX_BYTES
      )}. Please compress or resize the image and try again.`,
    };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "luxury-enterprises", resource_type: "image" },
        (error, uploadResult) => {
          if (error) return reject(error);
          if (!uploadResult) return reject(new Error("Cloudinary returned an empty response"));
          resolve(uploadResult as { secure_url: string });
        }
      );
      stream.end(buffer);
    });
    return { url: result.secure_url };
  } catch (error) {
    console.error("[admin] uploadImage failed:", error);

    const message = error instanceof Error ? error.message : String(error);
    const httpCode = (error as { http_code?: number })?.http_code;

    if (httpCode === 401 || /cloud_name mismatch|Invalid Signature|api_key/i.test(message)) {
      return {
        error:
          "Cloudinary rejected the credentials (check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET match the same account). Paste an image URL instead for now.",
      };
    }
    if (httpCode === 420 || /rate limit/i.test(message)) {
      return { error: "Cloudinary rate limit reached. Wait a minute and try again." };
    }
    if (/ENOTFOUND|ECONNREFUSED|ETIMEDOUT|network/i.test(message)) {
      return { error: "Couldn't reach Cloudinary — check your internet connection and try again." };
    }
    return { error: `Upload failed: ${message}` };
  }
}
