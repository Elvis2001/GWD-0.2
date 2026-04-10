export interface Post {
  id: number | string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  thumbnailImage?: string;
  coverImage: string;
  galleryImages?: string[];
  featured?: boolean;
  published?: boolean;
  author: string;
  name?: string;
  role?: string;
  imageUrl?: string;
  impactReport?: string;
  resourcePdfUrl?: string;
  resourcePdfName?: string;
  keyActivities?: string[];
  contentType?: "post" | "program" | "gallery";
  createdAt: Date | string | null;
  updatedAt?: Date | string | null;
}

export type CmsPost = Post;
export type CmsProgram = Post & { contentType: "program" };

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  displayOrder: number | null;
}

export interface GalleryItem {
  id: number | string;
  title: string;
  category: string;
  imageUrl: string;
  type: string | null;
  createdAt: Date | string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  content: string;
  imageUrl: string | null;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: Date | string | null;
}

export interface InsertContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ApiError {
  message: string;
  field?: string;
}
