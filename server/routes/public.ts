import { Router } from "express";
import { z } from "zod";
import {
  listGalleryByCategory,
  listProgramsByCategory,
  listPublishedPosts,
  getPostBySlug,
  getProgramById,
  listTeamMembers,
  listTestimonials,
  createContactMessage,
} from "../services/cms";

const publicRouter = Router();

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
