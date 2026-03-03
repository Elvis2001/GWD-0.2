import type { NextFunction, Request, Response } from "express";
import { supabase } from "../lib/supabase";

function parseAllowedAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const allowedEmails = parseAllowedAdminEmails();
    if (allowedEmails.length > 0) {
      const email = data.user.email?.toLowerCase();
      if (!email || !allowedEmails.includes(email)) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }

    req.adminUser = data.user;
    return next();
  } catch (error) {
    return next(error);
  }
}
