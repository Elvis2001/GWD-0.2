import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { registerRoutes } from "./routes";

dotenv.config();

const app = express();
const frontendUrl = process.env.FRONTEND_URL;
if (!frontendUrl) {
  throw new Error("FRONTEND_URL environment variable must be set.");
}

app.use(express.json());
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);

const port = Number(process.env.PORT);
if (Number.isNaN(port)) {
  throw new Error("PORT environment variable must be set to a valid number.");
}

async function start() {
  await registerRoutes(app);

  if (process.env.NODE_ENV === "production") {
    const clientDistPath = path.resolve(__dirname, "..", "..", "client", "dist");
    const indexPath = path.join(clientDistPath, "index.html");

    if (fs.existsSync(indexPath)) {
      app.use(express.static(clientDistPath));
      app.get("*", (req, res) => {
        if (req.path.startsWith("/api")) {
          res.status(404).json({ message: "Not Found" });
          return;
        }
        res.sendFile(indexPath);
      });
    }
  }

  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      next(err);
      return;
    }

    const statusCode =
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      typeof (err as { status?: unknown }).status === "number"
        ? (err as { status: number }).status
        : 500;

    const message =
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message?: unknown }).message === "string"
        ? (err as { message: string }).message
        : "Internal Server Error";

    res.status(statusCode).json({ message });
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`API server listening on port ${port}`);
  });
}

void start();
