import type { Request } from "express";
import multer from "multer";

function uploadFileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile?: boolean) => void,
): void {
  if (file.fieldname === "resourcePdf") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
      return;
    }
    cb(new Error("resourcePdf must be an application/pdf file."));
    return;
  }

  if (["thumbnail", "gallery", "images"].includes(file.fieldname)) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }
    cb(new Error(`${file.fieldname} must be an image file.`));
    return;
  }

  cb(new Error(`Unsupported upload field: ${file.fieldname}`));
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 20,
  },
  fileFilter: uploadFileFilter,
});

export const uploadPostAssets = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "gallery", maxCount: 12 },
  { name: "resourcePdf", maxCount: 1 },
]);

export const uploadGalleryAssets = upload.array("images", 12);
