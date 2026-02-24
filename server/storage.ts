import { 
  type Post, 
  type TeamMember, 
  type GalleryItem, 
  type Testimonial, 
  type ContactMessage, 
  type InsertContactMessage 
} from "@shared/types";

export interface IStorage {
  getPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getTeamMembers(): Promise<TeamMember[]>;
  getGalleryItems(): Promise<GalleryItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MockStorage implements IStorage {
  private posts: Post[] = [
    {
      id: 1,
      title: "GWDYF Partners with North-East Humanitarian Innovation Hub",
      slug: "gwdyf-partners-nehub",
      excerpt: "Facilitating Social Innovation Entrepreneurship Bootcamp for young minds.",
      content: "We are excited to announce our partnership with the North-East Humanitarian Innovation Hub to facilitate a Social Innovation Entrepreneurship Bootcamp. This program aims to equip young people with the skills needed to solve community problems through innovative business solutions.",
      coverImage: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80",
      author: "GWDYF Team",
      category: "Partnership",
      createdAt: new Date()
    },
    {
      id: 2,
      title: "Training 50 Youths on Tech and Entrepreneurship",
      slug: "training-50-youths-tech",
      excerpt: "Partnering with ACT Foundation and Sunlight to empower 50 youths.",
      content: "In collaboration with the ACT Foundation and Sunlight, GWDYF has successfully trained 50 youths on essential technology and entrepreneurial skills. The program covered digital literacy, business planning, and financial management.",
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
      author: "Nnenna Mosugu",
      category: "Impact",
      createdAt: new Date()
    }
  ];

  private team: TeamMember[] = [
    {
      id: 1,
      name: "Nnenna Mosugu",
      role: "Executive Director & Founder",
      bio: "Nnenna Mosugu is the founder of GWDYF, dedicated to empowering Nigerian youth through financial literacy and leadership development.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
      displayOrder: 1
    }
  ];

  private gallery: GalleryItem[] = [
    {
      id: 1,
      title: "FLiC Launch 2024",
      category: "FLiC",
      imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop",
      type: "photo",
      createdAt: new Date()
    }
  ];

  private testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Student A",
      role: "FLiC Member",
      content: "Joining the Financial Literacy Club changed my perspective on money.",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
    }
  ];

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return this.posts.find(p => p.slug === slug);
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return this.team;
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return this.gallery;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...message,
      id: Math.floor(Math.random() * 10000),
      createdAt: new Date(),
      phone: message.phone || null
    };
    console.log("Mock saved contact message:", newMessage);
    return newMessage;
  }
}

export const storage = new MockStorage();
