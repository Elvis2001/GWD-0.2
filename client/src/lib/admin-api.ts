import { buildApiUrl } from "./api";
import { clearAdminToken, getAdminToken } from "./admin-auth";

export type AdminPostSummary = {
  id: string | number;
  title: string;
  category: string;
  createdAt: string | null;
  contentType?: "post" | "program" | "gallery" | "resource";
};

export type AdminPostDetails = AdminPostSummary & {
  slug: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  published?: boolean;
  author: string;
  name?: string;
  impactReport?: string;
  keyActivities?: string[];
  thumbnailImage?: string;
  coverImage?: string;
  galleryImages?: string[];
  resourcePdfUrl?: string;
  resourcePdfName?: string;
  updatedAt?: string | null;
};

export type AdminPostPayload = {
  title: string;
  name?: string;
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
  resourcePdf?: File | null;
};

type AdminResourcePayload = {
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  points?: string[];
  published?: boolean;
  resourcePdf: File;
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
  if (payload.name) formData.append("name", payload.name);
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
  if (payload.resourcePdf) formData.append("resourcePdf", payload.resourcePdf);
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

export async function getAdminPost(id: string): Promise<AdminPostDetails> {
  const res = await fetch(buildApiUrl(`/api/admin/post/${id}`), {
    headers: buildAuthHeaders(),
  });

  if (!res.ok) {
    throw await parseApiError(
      res,
      "Failed to load post",
      "Session expired or invalid. Please log in again.",
    );
  }

  return (await res.json()) as AdminPostDetails;
}

export async function updateAdminPost(
  id: string,
  payload: AdminPostPayload,
): Promise<AdminPostDetails> {
  const formData = new FormData();
  appendPostFormData(formData, payload);

  const res = await fetch(buildApiUrl(`/api/admin/post/${id}`), {
    method: "PUT",
    headers: buildAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    throw await parseApiError(
      res,
      "Failed to update post",
      "Session expired or invalid. Please log in again.",
    );
  }
  return (await res.json()) as AdminPostDetails;
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

export async function createAdminResource(payload: AdminResourcePayload): Promise<unknown> {
  const formData = new FormData();
  formData.append("title", payload.title);
  if (payload.description) formData.append("description", payload.description);
  if (payload.icon) formData.append("icon", payload.icon);
  if (payload.color) formData.append("color", payload.color);
  if (payload.points?.length) formData.append("points", JSON.stringify(payload.points));
  formData.append("published", String(payload.published ?? true));
  formData.append("resourcePdf", payload.resourcePdf);

  const res = await fetch(buildApiUrl("/api/admin/resource"), {
    method: "POST",
    headers: buildAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    throw await parseApiError(
      res,
      "Failed to create resource",
      "Session expired or invalid. Please log in again.",
    );
  }
  return res.json();
}

export async function listAdminPosts(): Promise<AdminPostSummary[]> {
  const res = await fetch(buildApiUrl("/api/posts"));
  if (!res.ok) {
    throw new Error("Failed to load posts");
  }

  const data = (await res.json()) as Array<Record<string, unknown>>;
  return data.map((entry) => ({
    id: entry.id as string | number,
    title: (entry.title as string) ?? "",
    category: (entry.category as string) ?? "",
    createdAt: (entry.createdAt as string) ?? null,
    contentType: entry.contentType as "post" | "program" | "gallery" | "resource" | undefined,
  }));
}

export async function listAdminResources(): Promise<AdminPostSummary[]> {
  const res = await fetch(buildApiUrl("/api/resources"));
  if (!res.ok) {
    throw new Error("Failed to load resources");
  }

  const data = (await res.json()) as Array<Record<string, unknown>>;
  return data.map((entry) => ({
    id: entry.id as string | number,
    title: (entry.title as string) ?? "",
    category: (entry.category as string) ?? "activities",
    createdAt: (entry.createdAt as string) ?? null,
    contentType: "resource" as const,
  }));
}

export async function deleteAdminPost(id: string): Promise<void> {
  const res = await fetch(buildApiUrl(`/api/admin/post/${id}`), {
    method: "DELETE",
    headers: buildAuthHeaders(),
  });

  if (!res.ok) {
    throw await parseApiError(
      res,
      "Failed to delete post",
      "Session expired or invalid. Please log in again.",
    );
  }
}
