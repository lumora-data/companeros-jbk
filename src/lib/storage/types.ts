import "server-only";

export type UploadedMedia = {
  url: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
};

export type UploadMediaInput = {
  file: File;
  fileName: string;
};
