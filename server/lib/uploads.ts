import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 20,
  },
});

export const uploadPostAssets = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "gallery", maxCount: 12 },
]);

export const uploadGalleryAssets = upload.array("images", 12);
