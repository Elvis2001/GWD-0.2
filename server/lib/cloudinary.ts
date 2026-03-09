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

export function resolveCategoryFolder(rawCategory: string): UploadFolder {
  const category = rawCategory.trim().toLowerCase();
  if (category === "flic") return "gwd/flic";
  if (category === "hubs") return "gwd/hubs";
  if (category === "activities") return "gwd/activities";
  return "gwd/blog";
}

export async function uploadBufferToCloudinary(
  fileBuffer: Buffer,
  folder: UploadFolder,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
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
