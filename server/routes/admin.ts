import { Router } from "express";
import { z } from "zod";
import { verifyAdmin } from "../middleware/auth";
import { uploadGalleryAssets, uploadPostAssets } from "../lib/uploads";
import { resolveCategoryFolder, uploadBufferToCloudinary } from "../lib/cloudinary";
import { createPost, deletePost, updatePost } from "../services/cms";

const adminRouter = Router();

const basePostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  category: z.enum(["flic", "hubs", "activities", "blog"]),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  featured: z.enum(["true", "false"]).optional(),
  published: z.enum(["true", "false"]).optional(),
  author: z.string().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
  imageUrl: z.string().url().optional(),
  impactReport: z.string().optional(),
  keyActivities: z.string().optional(),
});

type UploadedFile = {
  buffer: Buffer;
};

function parseBoolean(value: "true" | "false" | undefined, defaultValue = false): boolean {
  if (value === undefined) return defaultValue;
  return value === "true";
}

function parseStringArray(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((entry): entry is string => typeof entry === "string");
    }
  } catch {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
}

adminRouter.post("/admin/post", verifyAdmin, uploadPostAssets, async (req, res, next) => {
  try {
    const parsed = basePostSchema.parse(req.body);
    const files = req.files as Record<string, UploadedFile[]>;

    const folder = resolveCategoryFolder(parsed.category);
    const thumbnailFile = files?.thumbnail?.[0];
    const galleryFiles = files?.gallery ?? [];

    const thumbnailUrl = thumbnailFile
      ? await uploadBufferToCloudinary(thumbnailFile.buffer, folder)
      : null;

    const galleryUrls = await Promise.all(
      galleryFiles.map((file) => uploadBufferToCloudinary(file.buffer, folder)),
    );

    const keyActivities = parseStringArray(parsed.keyActivities);
    const created = await createPost({
      title: parsed.title,
      slug: parsed.slug,
      category: parsed.category,
      excerpt: parsed.excerpt,
      content: parsed.content,
      featured: parseBoolean(parsed.featured),
      published: parseBoolean(parsed.published, true),
      author: parsed.author,
      name: parsed.name,
      role: parsed.role,
      imageUrl: parsed.imageUrl,
      impactReport: parsed.impactReport,
      keyActivities,
      thumbnailUrl,
      galleryImages: galleryUrls,
      contentType: "post",
    });

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/admin/post/:id", verifyAdmin, uploadPostAssets, async (req, res, next) => {
  try {
    const parsed = basePostSchema.partial().parse(req.body);
    const files = req.files as Record<string, UploadedFile[]>;

    const category = parsed.category ?? "blog";
    const folder = resolveCategoryFolder(category);
    const thumbnailFile = files?.thumbnail?.[0];
    const galleryFiles = files?.gallery ?? [];

    const thumbnailUrl = thumbnailFile
      ? await uploadBufferToCloudinary(thumbnailFile.buffer, folder)
      : undefined;
    const galleryUrls = await Promise.all(
      galleryFiles.map((file) => uploadBufferToCloudinary(file.buffer, folder)),
    );

    const updated = await updatePost(String(req.params.id), {
      title: parsed.title,
      slug: parsed.slug,
      category: parsed.category,
      excerpt: parsed.excerpt,
      content: parsed.content,
      featured: parsed.featured ? parseBoolean(parsed.featured) : undefined,
      published: parsed.published ? parseBoolean(parsed.published) : undefined,
      author: parsed.author,
      name: parsed.name,
      role: parsed.role,
      imageUrl: parsed.imageUrl,
      impactReport: parsed.impactReport,
      keyActivities: parseStringArray(parsed.keyActivities),
      thumbnailUrl,
      galleryImages: galleryUrls.length > 0 ? galleryUrls : undefined,
      contentType: "post",
    });

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
});

adminRouter.delete("/admin/post/:id", verifyAdmin, async (req, res, next) => {
  try {
    await deletePost(String(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/admin/gallery", verifyAdmin, uploadGalleryAssets, async (req, res, next) => {
  try {
    const parsed = z
      .object({
        title: z.string().min(1),
        category: z.enum(["flic", "hubs", "activities", "blog"]),
        excerpt: z.string().optional(),
      })
      .parse(req.body);

    const folder = resolveCategoryFolder(parsed.category);
    const files = (req.files as UploadedFile[]) ?? [];
    const galleryUrls = await Promise.all(
      files.map((file) => uploadBufferToCloudinary(file.buffer, folder)),
    );

    const created = await createPost({
      title: parsed.title,
      category: parsed.category,
      excerpt: parsed.excerpt,
      contentType: "gallery",
      published: true,
      galleryImages: galleryUrls,
      thumbnailUrl: galleryUrls[0] ?? null,
    });

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/admin/program", verifyAdmin, uploadPostAssets, async (req, res, next) => {
  try {
    const parsed = basePostSchema.parse(req.body);
    const files = req.files as Record<string, UploadedFile[]>;
    const folder = resolveCategoryFolder(parsed.category);

    const thumbnailFile = files?.thumbnail?.[0];
    const galleryFiles = files?.gallery ?? [];
    const thumbnailUrl = thumbnailFile
      ? await uploadBufferToCloudinary(thumbnailFile.buffer, folder)
      : null;
    const galleryUrls = await Promise.all(
      galleryFiles.map((file) => uploadBufferToCloudinary(file.buffer, folder)),
    );

    const created = await createPost({
      title: parsed.title,
      slug: parsed.slug,
      category: parsed.category,
      excerpt: parsed.excerpt,
      content: parsed.content,
      featured: parseBoolean(parsed.featured),
      published: parseBoolean(parsed.published, true),
      author: parsed.author,
      name: parsed.name,
      role: parsed.role,
      imageUrl: parsed.imageUrl,
      impactReport: parsed.impactReport,
      keyActivities: parseStringArray(parsed.keyActivities),
      thumbnailUrl,
      galleryImages: galleryUrls,
      contentType: "program",
    });

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
