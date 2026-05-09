import "server-only";

import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Env } from "@/src/lib/env/server";
import type { UploadMediaInput, UploadedMedia } from "@/src/lib/storage/types";

function sanitizeName(fileName: string): string {
  return fileName
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function buildObjectKey(prefix: string | undefined, fileName: string): string {
  const safeName = sanitizeName(fileName);
  const basePrefix = prefix ? prefix.replace(/^\/+|\/+$/g, "") : "cms";
  return `${basePrefix}/${Date.now()}-${randomUUID()}-${safeName}`;
}

export async function uploadToS3(input: UploadMediaInput): Promise<UploadedMedia> {
  const env = getS3Env();
  const buffer = Buffer.from(await input.file.arrayBuffer());
  const key = buildObjectKey(env.uploadPrefix, input.fileName);

  const client = new S3Client({
    region: env.region,
    forcePathStyle: env.forcePathStyle,
    credentials: {
      accessKeyId: env.accessKeyId,
      secretAccessKey: env.secretAccessKey,
    },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: env.bucket,
      Key: key,
      Body: buffer,
      ContentType: input.file.type || "application/octet-stream",
    }),
  );

  const publicBase = env.publicUrlBase?.replace(/\/+$/g, "");
  const defaultUrl = `https://${env.bucket}.s3.${env.region}.amazonaws.com/${key}`;
  return {
    url: publicBase ? `${publicBase}/${key}` : defaultUrl,
    bytes: buffer.byteLength,
  };
}
