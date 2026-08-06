"use server";

import { verifySession } from "@/lib/dal";
import { cloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export interface UploadImageResult {
  url?: string;
  error?: string;
}

export async function uploadImage(formData: FormData): Promise<UploadImageResult> {
  await verifySession();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image file." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Please upload a JPEG, PNG, WebP, AVIF or GIF image." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be under 10MB." };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "luxury-enterprises", resource_type: "image" },
        (error, uploadResult) => {
          if (error || !uploadResult) return reject(error ?? new Error("Upload failed"));
          resolve(uploadResult as { secure_url: string });
        }
      );
      stream.end(buffer);
    });
    return { url: result.secure_url };
  } catch (error) {
    console.error("[admin] uploadImage failed:", error);
    return { error: "Upload failed. Please try again." };
  }
}
