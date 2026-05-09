import "server-only";

type AdminAuthEnv = {
  username: string;
  passwordHash?: string;
  password?: string;
  sessionSecret: string;
  strictUsername: boolean;
};

type GitHubEnv = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

type MediaProvider = "cloudinary" | "s3";

type MediaEnv = {
  provider: MediaProvider;
  maxUploadMb: number;
  allowedTypes: string[];
};

type CloudinaryEnv = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadFolder?: string;
  secureDistribution?: string;
};

type S3Env = {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrlBase?: string;
  uploadPrefix?: string;
  forcePathStyle: boolean;
};

function readRequired(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function readOptional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function parsePositiveNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error("ADMIN_UPLOAD_MAX_MB must be a positive number.");
  }
  return parsed;
}

function parseBoolean(value: string | undefined, fallback = false): boolean {
  if (!value) {
    return fallback;
  }
  return value.toLowerCase() === "true";
}

export function getAdminAuthEnv(): AdminAuthEnv {
  const username = (readOptional("ADMIN_USERNAME") || "admin").replace(/^['"`]+|['"`]+$/g, "").trim() || "admin";
  const passwordHash = readOptional("ADMIN_PASSWORD_HASH");
  const password = readOptional("ADMIN_PASSWORD");
  const sessionSecret = readRequired("ADMIN_SESSION_SECRET");
  const strictUsername = parseBoolean(readOptional("ADMIN_STRICT_USERNAME"), false);

  if (!passwordHash && !password) {
    throw new Error("Provide ADMIN_PASSWORD_HASH or ADMIN_PASSWORD.");
  }

  return {
    username,
    passwordHash,
    password,
    sessionSecret,
    strictUsername,
  };
}

export function getGitHubEnv(): GitHubEnv {
  return {
    token: readRequired("GITHUB_TOKEN"),
    owner: readRequired("GITHUB_OWNER"),
    repo: readRequired("GITHUB_REPO"),
    branch: readOptional("GITHUB_BRANCH") || "main",
  };
}

export function getMediaEnv(): MediaEnv {
  const providerRaw = (readOptional("MEDIA_PROVIDER") || "cloudinary").toLowerCase();
  if (providerRaw !== "cloudinary" && providerRaw !== "s3") {
    throw new Error("MEDIA_PROVIDER must be either 'cloudinary' or 's3'.");
  }

  const allowedRaw =
    readOptional("ADMIN_UPLOAD_ALLOWED_TYPES") || "image/jpeg,image/png,image/webp,image/avif";
  const allowedTypes = allowedRaw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  if (allowedTypes.length === 0) {
    throw new Error("ADMIN_UPLOAD_ALLOWED_TYPES must define at least one MIME type.");
  }

  return {
    provider: providerRaw,
    maxUploadMb: parsePositiveNumber(readOptional("ADMIN_UPLOAD_MAX_MB"), 8),
    allowedTypes,
  };
}

export function getCloudinaryEnv(): CloudinaryEnv {
  return {
    cloudName: readRequired("CLOUDINARY_CLOUD_NAME"),
    apiKey: readRequired("CLOUDINARY_API_KEY"),
    apiSecret: readRequired("CLOUDINARY_API_SECRET"),
    uploadFolder: readOptional("CLOUDINARY_UPLOAD_FOLDER"),
    secureDistribution: readOptional("CLOUDINARY_SECURE_DISTRIBUTION"),
  };
}

export function getS3Env(): S3Env {
  return {
    bucket: readRequired("S3_BUCKET"),
    region: readRequired("S3_REGION"),
    accessKeyId: readRequired("S3_ACCESS_KEY_ID"),
    secretAccessKey: readRequired("S3_SECRET_ACCESS_KEY"),
    publicUrlBase: readOptional("S3_PUBLIC_URL_BASE"),
    uploadPrefix: readOptional("S3_UPLOAD_PREFIX"),
    forcePathStyle: parseBoolean(readOptional("S3_FORCE_PATH_STYLE"), false),
  };
}
