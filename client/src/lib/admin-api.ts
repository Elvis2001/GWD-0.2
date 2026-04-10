import { buildApiUrl } from "./api";
import { clearAdminToken, getAdminToken } from "./admin-auth";

export type AdminPostSummary = {
  id: string | number;
  title: string;
  category: string;
  createdAt: string | null;
  contentType?: "post" | "program" | "gallery";
};

type AdminPostPayload = {
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
    contentType: entry.contentType as "post" | "program" | "gallery" | undefined,
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
