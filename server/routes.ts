import type { Express } from "express";
import { storage } from "./storage";
import { z } from "zod";
import type { InsertContactMessage } from "@shared/types";

const API_PATHS = {
  posts: "/api/posts",
  postBySlug: "/api/posts/:slug",
  team: "/api/team",
  gallery: "/api/gallery",
  testimonials: "/api/testimonials",
  contact: "/api/contact",
} as const;

const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function registerRoutes(
  app: Express
): Promise<void> {
  // API Routes
  app.get(API_PATHS.posts, async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(API_PATHS.postBySlug, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.get(API_PATHS.team, async (_req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  app.get(API_PATHS.gallery, async (_req, res) => {
    const items = await storage.getGalleryItems();
    res.json(items);
  });

  app.get(API_PATHS.testimonials, async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  app.post(API_PATHS.contact, async (req, res) => {
    try {
      const input = insertContactMessageSchema.parse(req.body) as InsertContactMessage;
      await storage.createContactMessage(input);
      res.status(201).json({ success: true, message: "Message received (Mock Mode)" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });
}

// Seed Data Function (No-op in mock mode)
export async function seedDatabase() {}
