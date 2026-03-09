import type { Express } from "express";
import { Router } from "express";
import { publicRouter } from "./public";
import { adminRouter } from "./admin";

export async function registerRoutes(app: Express): Promise<void> {
  const router = Router();
  router.use(publicRouter);
  router.use(adminRouter);

  // Keep /api for existing clients while also supporting direct route paths.
  app.use("/api", router);
  app.use(router);
}
