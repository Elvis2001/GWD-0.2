import { useQuery, useMutation } from "@tanstack/react-query";
import { buildApiUrl } from "@/lib/api";
import type {
  ApiError,
  InsertContactMessage,
  Post,
  TeamMember,
  Testimonial,
  CmsProgram,
} from "@shared/types";

const api = {
  posts: "/api/posts",
  postBySlug: "/api/posts/:slug",
  team: "/api/team",
  gallery: "/api/gallery",
  galleryByCategory: "/api/gallery/:category",
  programsByCategory: "/api/programs/:category",
  programById: "/api/program/:id",
  testimonials: "/api/testimonials",
  contact: "/api/contact",
} as const;

function buildPostUrl(slug: string): string {
  return buildApiUrl(api.postBySlug.replace(":slug", encodeURIComponent(slug)));
}

function buildGalleryByCategoryUrl(category: string): string {
  return buildApiUrl(api.galleryByCategory.replace(":category", encodeURIComponent(category)));
}

function buildProgramsByCategoryUrl(category: string): string {
  return buildApiUrl(api.programsByCategory.replace(":category", encodeURIComponent(category)));
}

function buildProgramByIdUrl(id: string): string {
  return buildApiUrl(api.programById.replace(":id", encodeURIComponent(id)));
}

// Posts
export function usePosts() {
  return useQuery({
    queryKey: [api.posts],
    queryFn: async () => {
      const res = await fetch(buildApiUrl(api.posts), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch posts");
      return (await res.json()) as Post[];
    },
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: [api.postBySlug, slug],
    queryFn: async () => {
      const res = await fetch(buildPostUrl(slug), { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      return (await res.json()) as Post;
    },
    enabled: !!slug,
  });
}

// Team
export function useTeam() {
  return useQuery({
    queryKey: [api.team],
    queryFn: async () => {
      const res = await fetch(buildApiUrl(api.team), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch team members");
      return (await res.json()) as TeamMember[];
    },
  });
}

// Gallery
export function useGallery() {
  return useQuery({
    queryKey: [api.gallery],
    queryFn: async () => {
      const res = await fetch(buildApiUrl(api.gallery), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch gallery items");
      return (await res.json()) as Post[];
    },
  });
}

export function useGalleryByCategory(category: string) {
  return useQuery({
    queryKey: [api.galleryByCategory, category],
    queryFn: async () => {
      const res = await fetch(buildGalleryByCategoryUrl(category), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch category gallery");
      return (await res.json()) as Post[];
    },
    enabled: !!category,
  });
}

export function useProgramsByCategory(category: string) {
  return useQuery({
    queryKey: [api.programsByCategory, category],
    queryFn: async () => {
      const res = await fetch(buildProgramsByCategoryUrl(category), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch programs");
      return (await res.json()) as CmsProgram[];
    },
    enabled: !!category,
  });
}

export function useProgramById(id: string) {
  return useQuery({
    queryKey: [api.programById, id],
    queryFn: async () => {
      const res = await fetch(buildProgramByIdUrl(id), { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch program");
      return (await res.json()) as CmsProgram;
    },
    enabled: !!id,
  });
}

// Testimonials
export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials],
    queryFn: async () => {
      const res = await fetch(buildApiUrl(api.testimonials), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return (await res.json()) as Testimonial[];
    },
  });
}

// Contact
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch(buildApiUrl(api.contact), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = (await res.json()) as ApiError;
          throw new Error(error.message);
        }
        throw new Error("Failed to submit message");
      }
      return (await res.json()) as { success: boolean; message: string };
    },
  });
}
