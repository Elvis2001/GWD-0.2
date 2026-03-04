import { buildApiUrl } from "./api";
import { clearAdminToken, getAdminToken } from "./admin-auth";

type AdminPostPayload = {
  title: string;
  slug?: string;
  category: "flic" | "hubs" | "activities" | "blog";
  excerpt?: string;
  content?: string;
  featured?: boolean;
  published?: boolean;
  author?: string;
  impactReport?: string;
  keyActivities?: string[];
  thumbnail?: File | null;
  gallery?: File[];
};

function buildAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  if (!token) {
    throw new Error("Admin session missing. Please log in again.");
  }
  return { Authorization: `Bearer ${token}` };
}

function appendPostFormData(formData: FormData, payload: AdminPostPayload): void {
  formData.append("title", payload.title);
  formData.append("category", payload.category);
  if (payload.slug) formData.append("slug", payload.slug);
  if (payload.excerpt) formData.append("excerpt", payload.excerpt);
  if (payload.content) formData.append("content", payload.content);
  if (payload.author) formData.append("author", payload.author);
  if (payload.impactReport) formData.append("impactReport", payload.impactReport);
  if (payload.keyActivities?.length) {
    formData.append("keyActivities", JSON.stringify(payload.keyActivities));
  }
  formData.append("featured", String(Boolean(payload.featured)));
  formData.append("published", String(payload.published ?? true));
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail);
  payload.gallery?.forEach((file) => formData.append("gallery", file));
}

async function parseApiError(
  res: Response,
  fallback: string,
  sessionExpiredFallback: string,
): Promise<Error> {
  const error = await res.json().catch(() => ({ message: fallback }));
  const message = typeof error.message === "string" ? error.message : fallback;

  if (res.status === 401 || message.toLowerCase().includes("invalid token")) {
    clearAdminToken();
    return new Error(sessionExpiredFallback);
  }

  return new Error(message || fallback);
}

export async function createAdminPost(payload: AdminPostPayload): Promise<unknown> {
  const formData = new FormData();
  appendPostFormData(formData, payload);

  const res = await fetch(buildApiUrl("/api/admin/post"), {
    method: "POST",
    headers: buildAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    throw await parseApiError(
      res,
      "Failed to create post",
      "Session expired or invalid. Please log in again.",
    );
  }
  return res.json();
}

export async function createAdminProgram(payload: AdminPostPayload): Promise<unknown> {
  const formData = new FormData();
  appendPostFormData(formData, payload);

  const res = await fetch(buildApiUrl("/api/admin/program"), {
    method: "POST",
    headers: buildAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    throw await parseApiError(
      res,
      "Failed to create program",
      "Session expired or invalid. Please log in again.",
    );
  }
  return res.json();
}
