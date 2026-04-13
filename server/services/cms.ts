import { supabase } from "../lib/supabase";
import { buildSlug } from "../lib/slug";
import type {
  CmsPost,
  CmsProgram,
  TeamMember,
  Testimonial,
  InsertContactMessage,
  ContactMessage,
} from "@shared/types";

const POSTS_TABLE = process.env.SUPABASE_POSTS_TABLE || "posts";
const TEAM_TABLE = process.env.SUPABASE_TEAM_TABLE || "team_members";
const TESTIMONIALS_TABLE = process.env.SUPABASE_TESTIMONIALS_TABLE || "testimonials";
const CONTACT_TABLE = process.env.SUPABASE_CONTACT_TABLE || "contact_messages";

type DbPost = {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  thumbnail_url: string | null;
  gallery_images: string[] | null;
  featured: boolean | null;
  published: boolean | null;
  author: string | null;
  name: string | null;
  role: string | null;
  image_url: string | null;
  impact_report: string | null;
  resource_pdf_url: string | null;
  resource_pdf_name: string | null;
  key_activities: string[] | null;
  content_type: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type UpsertInput = {
  title: string;
  slug?: string;
  category: string;
  excerpt?: string;
  content?: string;
  thumbnailUrl?: string | null;
  galleryImages?: string[];
  featured?: boolean;
  published?: boolean;
  author?: string;
  name?: string;
  role?: string;
  imageUrl?: string;
  impactReport?: string;
  resourcePdfUrl?: string | null;
  resourcePdfName?: string | null;
  keyActivities?: string[];
  contentType?: "post" | "program" | "gallery" | "resource";
};

function mapDbPost(row: DbPost): CmsPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    thumbnailImage: row.thumbnail_url ?? "",
    coverImage: row.thumbnail_url ?? "",
    galleryImages: row.gallery_images ?? [],
    featured: Boolean(row.featured),
    published: row.published ?? true,
    author: row.author ?? "",
    name: row.name ?? undefined,
    role: row.role ?? undefined,
    imageUrl: row.image_url ?? undefined,
    impactReport: row.impact_report ?? undefined,
    resourcePdfUrl: row.resource_pdf_url ?? undefined,
    resourcePdfName: row.resource_pdf_name ?? undefined,
    keyActivities: row.key_activities ?? [],
    contentType: (row.content_type as CmsPost["contentType"]) ?? "post",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapDbProgram(row: DbPost): CmsProgram {
  return {
    ...mapDbPost(row),
    contentType: "program",
  };
}

async function assertNoError<T>(
  result: { data: T | null; error: { message: string } | null },
  defaultMessage: string,
): Promise<T> {
  if (result.error) {
    throw new Error(`${defaultMessage}: ${result.error.message}`);
  }
  if (result.data === null) {
    throw new Error(defaultMessage);
  }
  return result.data;
}

export async function listPublishedPosts(): Promise<CmsPost[]> {
  const result = await supabase
    .from(POSTS_TABLE)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .eq("published", true)
    .in("content_type", ["post", "program"])
    .order("created_at", { ascending: false });

  const rows = await assertNoError(result, "Failed to fetch posts");
  return (rows as DbPost[]).map(mapDbPost);
}

export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  const result = await supabase
    .from(POSTS_TABLE)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (result.error) {
    throw new Error(`Failed to fetch post: ${result.error.message}`);
  }
  if (!result.data) {
    return null;
  }
  return mapDbPost(result.data as DbPost);
}

export async function listGalleryByCategory(category: string): Promise<CmsPost[]> {
  const result = await supabase
    .from(POSTS_TABLE)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .eq("published", true)
    .eq("category", category.toLowerCase())
    .order("created_at", { ascending: false });

  const rows = await assertNoError(result, "Failed to fetch gallery");
  return (rows as DbPost[])
    .filter((row) => Boolean(row.thumbnail_url) || (row.gallery_images?.length ?? 0) > 0)
    .map(mapDbPost);
}

export async function listProgramsByCategory(category: string): Promise<CmsProgram[]> {
  const result = await supabase
    .from(POSTS_TABLE)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .eq("published", true)
    .eq("category", category.toLowerCase())
    .eq("content_type", "program")
    .order("created_at", { ascending: false });

  const rows = await assertNoError(result, "Failed to fetch programs");
  return (rows as DbPost[]).map(mapDbProgram);
}

export async function listResources(): Promise<CmsPost[]> {
  const result = await supabase
    .from(POSTS_TABLE)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .eq("published", true)
    .eq("content_type", "resource")
    .order("created_at", { ascending: false });

  const rows = await assertNoError(result, "Failed to fetch resources");
  return (rows as DbPost[]).map(mapDbPost);
}

export async function getProgramById(id: string): Promise<CmsProgram | null> {
  const result = await supabase
    .from(POSTS_TABLE)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .eq("id", id)
    .eq("content_type", "program")
    .maybeSingle();

  if (result.error) {
    throw new Error(`Failed to fetch program: ${result.error.message}`);
  }
  if (!result.data) {
    return null;
  }
  return mapDbProgram(result.data as DbPost);
}

export async function getPostById(id: string): Promise<CmsPost | null> {
  const result = await supabase
    .from(POSTS_TABLE)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  if (result.error) {
    throw new Error(`Failed to fetch post: ${result.error.message}`);
  }
  if (!result.data) {
    return null;
  }
  return mapDbPost(result.data as DbPost);
}

export async function createPost(input: UpsertInput): Promise<CmsPost> {
  const slug = input.slug?.trim() || buildSlug(input.title);
  const payload = {
    title: input.title,
    slug,
    category: input.category.toLowerCase(),
    excerpt: input.excerpt ?? "",
    content: input.content ?? "",
    thumbnail_url: input.thumbnailUrl ?? null,
    gallery_images: input.galleryImages ?? [],
    featured: Boolean(input.featured),
    published: input.published ?? false,
    author: input.author ?? null,
    name: input.name ?? null,
    role: input.role ?? null,
    image_url: input.imageUrl ?? null,
    impact_report: input.impactReport ?? null,
    resource_pdf_url: input.resourcePdfUrl ?? null,
    resource_pdf_name: input.resourcePdfName ?? null,
    key_activities: input.keyActivities ?? [],
    content_type: input.contentType ?? "post",
  };

  const result = await supabase
    .from(POSTS_TABLE)
    .insert(payload)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .single();

  const row = await assertNoError(result, "Failed to create post");
  return mapDbPost(row as DbPost);
}

export async function updatePost(
  id: string,
  input: Partial<UpsertInput>,
): Promise<CmsPost | null> {
  const payload: Record<string, unknown> = {};
  if (input.title !== undefined) payload.title = input.title;
  if (input.slug !== undefined) payload.slug = input.slug || buildSlug(input.title ?? "");
  if (input.category !== undefined) payload.category = input.category.toLowerCase();
  if (input.excerpt !== undefined) payload.excerpt = input.excerpt;
  if (input.content !== undefined) payload.content = input.content;
  if (input.thumbnailUrl !== undefined) payload.thumbnail_url = input.thumbnailUrl;
  if (input.galleryImages !== undefined) payload.gallery_images = input.galleryImages;
  if (input.featured !== undefined) payload.featured = input.featured;
  if (input.published !== undefined) payload.published = input.published;
  if (input.author !== undefined) payload.author = input.author;
  if (input.name !== undefined) payload.name = input.name;
  if (input.role !== undefined) payload.role = input.role;
  if (input.imageUrl !== undefined) payload.image_url = input.imageUrl;
  if (input.impactReport !== undefined) payload.impact_report = input.impactReport;
  if (input.resourcePdfUrl !== undefined) payload.resource_pdf_url = input.resourcePdfUrl;
  if (input.resourcePdfName !== undefined) payload.resource_pdf_name = input.resourcePdfName;
  if (input.keyActivities !== undefined) payload.key_activities = input.keyActivities;
  if (input.contentType !== undefined) payload.content_type = input.contentType;

  const result = await supabase
    .from(POSTS_TABLE)
    .update(payload)
    .eq("id", id)
    .select(
      "id,title,slug,category,excerpt,content,thumbnail_url,gallery_images,featured,published,author,name,role,image_url,impact_report,resource_pdf_url,resource_pdf_name,key_activities,content_type,created_at,updated_at",
    )
    .maybeSingle();

  if (result.error) {
    throw new Error(`Failed to update post: ${result.error.message}`);
  }
  if (!result.data) {
    return null;
  }
  return mapDbPost(result.data as DbPost);
}

export async function deletePost(id: string): Promise<boolean> {
  const result = await supabase.from(POSTS_TABLE).delete().eq("id", id);
  if (result.error) {
    throw new Error(`Failed to delete post: ${result.error.message}`);
  }
  return true;
}

export async function listTeamMembers(): Promise<TeamMember[]> {
  const result = await supabase
    .from(TEAM_TABLE)
    .select("id,name,role,bio,image_url,display_order")
    .order("display_order", { ascending: true, nullsFirst: false });

  if (result.error) {
    if (result.error.message.includes("relation")) return [];
    throw new Error(`Failed to fetch team members: ${result.error.message}`);
  }

  return ((result.data ?? []) as Array<Record<string, unknown>>).map((row) => ({
    id: row.id as number,
    name: (row.name as string) ?? "",
    role: (row.role as string) ?? "",
    bio: (row.bio as string) ?? "",
    imageUrl: (row.image_url as string) ?? "",
    displayOrder: (row.display_order as number) ?? null,
  }));
}

export async function listTestimonials(): Promise<Testimonial[]> {
  const result = await supabase.from(TESTIMONIALS_TABLE).select("id,name,role,content,image_url");
  if (result.error) {
    if (result.error.message.includes("relation")) return [];
    throw new Error(`Failed to fetch testimonials: ${result.error.message}`);
  }

  return ((result.data ?? []) as Array<Record<string, unknown>>).map((row) => ({
    id: row.id as number,
    name: (row.name as string) ?? "",
    role: (row.role as string) ?? null,
    content: (row.content as string) ?? "",
    imageUrl: (row.image_url as string) ?? null,
  }));
}

export async function createContactMessage(input: InsertContactMessage): Promise<ContactMessage> {
  const result = await supabase
    .from(CONTACT_TABLE)
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      subject: input.subject,
      message: input.message,
    })
    .select("id,name,email,phone,subject,message,created_at")
    .single();

  if (result.error || !result.data) {
    throw new Error(`Failed to save contact message: ${result.error?.message ?? "Unknown error"}`);
  }

  return {
    id: result.data.id as number,
    name: result.data.name as string,
    email: result.data.email as string,
    phone: (result.data.phone as string) ?? null,
    subject: result.data.subject as string,
    message: result.data.message as string,
    createdAt: (result.data.created_at as string) ?? null,
  };
}
