import "server-only";

import { createHash } from "node:crypto";
import { getCloudinaryEnv } from "@/src/lib/env/server";
import type { UploadMediaInput, UploadedMedia } from "@/src/lib/storage/types";

type CloudinaryResponse = {
  secure_url: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
  error?: {
    message?: string;
  };
};

function buildSignature(timestamp: number, folder: string | undefined, apiSecret: string): string {
  const toSign = folder ? `folder=${folder}&timestamp=${timestamp}` : `timestamp=${timestamp}`;
  return createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");
}

export async function uploadToCloudinary(input: UploadMediaInput): Promise<UploadedMedia> {
  const env = getCloudinaryEnv();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildSignature(timestamp, env.uploadFolder, env.apiSecret);

  const form = new FormData();
  form.append("file", input.file);
  form.append("api_key", env.apiKey);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  if (env.uploadFolder) {
    form.append("folder", env.uploadFolder);
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${env.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });

  const payload = (await response.json()) as CloudinaryResponse;
  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Cloudinary upload failed.");
  }

  return {
    url: payload.secure_url,
    width: payload.width,
    height: payload.height,
    bytes: payload.bytes,
    format: payload.format,
  };
}
