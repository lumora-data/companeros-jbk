import "server-only";

import { getMediaEnv } from "@/src/lib/env/server";
import { uploadToCloudinary } from "@/src/lib/storage/cloudinary";
import { uploadToS3 } from "@/src/lib/storage/s3";
import type { UploadMediaInput, UploadedMedia } from "@/src/lib/storage/types";

export async function uploadMedia(input: UploadMediaInput): Promise<UploadedMedia> {
  const mediaEnv = getMediaEnv();
  if (mediaEnv.provider === "s3") {
    return uploadToS3(input);
  }
  return uploadToCloudinary(input);
}
