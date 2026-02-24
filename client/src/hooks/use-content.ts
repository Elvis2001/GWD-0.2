import { useQuery, useMutation } from "@tanstack/react-query";
import { buildApiUrl } from "@/lib/api";
import type { ApiError, GalleryItem, InsertContactMessage, Post, TeamMember, Testimonial } from "@shared/types";

const api = {
  posts: "/api/posts",
  postBySlug: "/api/posts/:slug",
  team: "/api/team",
  gallery: "/api/gallery",
  testimonials: "/api/testimonials",
  contact: "/api/contact",
} as const;

function buildPostUrl(slug: string): string {
  return buildApiUrl(api.postBySlug.replace(":slug", encodeURIComponent(slug)));
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
      return (await res.json()) as GalleryItem[];
    },
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
