export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  createdAt: Date | string | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  displayOrder: number | null;
}

export interface GalleryItem {
  id: number;
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
