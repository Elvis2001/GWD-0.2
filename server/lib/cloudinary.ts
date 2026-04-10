import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set.",
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

type UploadFolder = "gwd/flic" | "gwd/hubs" | "gwd/activities" | "gwd/blog";
type CloudinaryResourceType = "image" | "raw";

type CloudinaryUploadOptions = {
  public_id?: string;
  format?: string;
  filename_override?: string;
  overwrite?: boolean;
  use_filename?: boolean;
  unique_filename?: boolean;
};

export function resolveCategoryFolder(rawCategory: string): UploadFolder {
  const category = rawCategory.trim().toLowerCase();
  if (category === "flic") return "gwd/flic";
  if (category === "hubs") return "gwd/hubs";
  if (category === "activities") return "gwd/activities";
  return "gwd/blog";
}

async function uploadBufferWithResourceType(
  fileBuffer: Buffer,
  folder: UploadFolder,
  resourceType: CloudinaryResourceType,
  options: CloudinaryUploadOptions = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType, ...options },
      (error: unknown, result: { secure_url?: string } | undefined) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result?.secure_url) {
          reject(new Error("Cloudinary upload failed to return secure_url."));
          return;
        }
        resolve(result.secure_url);
      },
    );
    stream.end(fileBuffer);
  });
}

export async function uploadBufferToCloudinary(
  fileBuffer: Buffer,
  folder: UploadFolder,
): Promise<string> {
  return uploadBufferWithResourceType(fileBuffer, folder, "image");
}

export async function uploadPdfBufferToCloudinary(
  fileBuffer: Buffer,
  folder: UploadFolder,
  originalFilename?: string,
): Promise<string> {
  const rawName = originalFilename?.trim() || "resource-file";
  const noExt = rawName.replace(/\.pdf$/i, "");
  const safeBaseName =
    noExt
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "resource-file";

  // Keep stable human-readable names while still avoiding collisions.
  const publicId = `${safeBaseName}-${Date.now()}`;

  return uploadBufferWithResourceType(fileBuffer, folder, "raw", {
    public_id: publicId,
    format: "pdf",
    filename_override: `${safeBaseName}.pdf`,
    overwrite: false,
    use_filename: false,
    unique_filename: false,
  });
}
