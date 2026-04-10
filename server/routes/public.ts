import { Router } from "express";
import { z } from "zod";
import {
  listGalleryByCategory,
  listProgramsByCategory,
  listPublishedPosts,
  getPostBySlug,
  getPostById,
  getProgramById,
  listTeamMembers,
  listTestimonials,
  createContactMessage,
} from "../services/cms";

const publicRouter = Router();

function sanitizeFilename(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return base || "resource";
}

function sanitizeAttachmentFilename(input: string): string {
  const cleaned = input.replace(/[\u0000-\u001f"<>:|?*]+/g, "").trim();
  if (!cleaned) return "resource.pdf";
  const withExtension = /\.pdf$/i.test(cleaned) ? cleaned : `${cleaned}.pdf`;
  return withExtension.slice(0, 180);
}

function isPdfResponse(contentType: string, bytes: Buffer): boolean {
  if (contentType.includes("pdf")) return true;
  // PDF files start with "%PDF-"
  return bytes.subarray(0, 5).toString("utf8") === "%PDF-";
}

publicRouter.get("/posts", async (_req, res, next) => {
  try {
    const posts = await listPublishedPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/team", async (_req, res, next) => {
  try {
    const team = await listTeamMembers();
    res.json(team);
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/testimonials", async (_req, res, next) => {
  try {
    const testimonials = await listTestimonials();
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/posts/:slug", async (req, res, next) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  } catch (error) {
    return next(error);
  }
});

publicRouter.get("/gallery/:category", async (req, res, next) => {
  try {
    const items = await listGalleryByCategory(req.params.category);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/gallery", async (_req, res, next) => {
  try {
    const categories = ["flic", "hubs", "activities", "blog"];
    const grouped = await Promise.all(categories.map((category) => listGalleryByCategory(category)));
    res.json(grouped.flat());
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/programs/:category", async (req, res, next) => {
  try {
    const programs = await listProgramsByCategory(req.params.category);
    res.json(programs);
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/program/:id", async (req, res, next) => {
  try {
    const program = await getProgramById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    return res.json(program);
  } catch (error) {
    return next(error);
  }
});

publicRouter.get("/resources/:id/view", async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post || !post.resourcePdfUrl) {
      return res.status(404).json({ message: "Resource PDF not found" });
    }

    const upstream = await fetch(post.resourcePdfUrl);
    if (!upstream.ok) {
      const cloudinaryError =
        upstream.headers.get("x-cld-error") ||
        (await upstream.text().catch(() => ""));
      return res.status(502).json({
        message: cloudinaryError
          ? `Failed to retrieve PDF from Cloudinary: ${cloudinaryError}`
          : "Failed to retrieve PDF from Cloudinary",
      });
    }

    const bytes = Buffer.from(await upstream.arrayBuffer());
    const contentType = (upstream.headers.get("content-type") || "").toLowerCase();
    if (!isPdfResponse(contentType, bytes)) {
      return res.status(502).json({
        message:
          "Cloudinary returned a non-PDF response. Check Cloudinary PDF delivery/security settings.",
      });
    }

    const filename = post.resourcePdfName
      ? sanitizeAttachmentFilename(post.resourcePdfName)
      : `${sanitizeFilename(post.title)}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=\"${filename}\"`);
    return res.send(bytes);
  } catch (error) {
    return next(error);
  }
});

publicRouter.get("/resources/:id/download", async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post || !post.resourcePdfUrl) {
      return res.status(404).json({ message: "Resource PDF not found" });
    }

    const upstream = await fetch(post.resourcePdfUrl);
    if (!upstream.ok) {
      const cloudinaryError =
        upstream.headers.get("x-cld-error") ||
        (await upstream.text().catch(() => ""));
      return res.status(502).json({
        message: cloudinaryError
          ? `Failed to retrieve PDF from Cloudinary: ${cloudinaryError}`
          : "Failed to retrieve PDF from Cloudinary",
      });
    }

    const bytes = Buffer.from(await upstream.arrayBuffer());
    const contentType = (upstream.headers.get("content-type") || "").toLowerCase();
    if (!isPdfResponse(contentType, bytes)) {
      return res.status(502).json({
        message:
          "Cloudinary returned a non-PDF response. Check Cloudinary PDF delivery/security settings.",
      });
    }

    const filename = post.resourcePdfName
      ? sanitizeAttachmentFilename(post.resourcePdfName)
      : `${sanitizeFilename(post.title)}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
    return res.send(bytes);
  } catch (error) {
    return next(error);
  }
});

publicRouter.post("/contact", async (req, res, next) => {
  try {
    const parsed = z
      .object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(1),
      })
      .parse(req.body);

    await createContactMessage(parsed);
    res.status(201).json({ success: true, message: "Message received" });
  } catch (error) {
    next(error);
  }
});

export { publicRouter };
