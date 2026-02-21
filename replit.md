# Overview

This is the **Grow With Data Youth Foundation (GWDYF)** website — a modern, responsive nonprofit website for a Nigerian organization that empowers youth through financial literacy, leadership development, and entrepreneurship training. The site is built as a full-stack TypeScript application with a React frontend and Express backend, backed by PostgreSQL.

The website includes pages for: Home, About, Programs (FLiC, HUBs, AI & Digital Skills), Gallery, Blog, Get Involved, Donate, and Contact. It features animated UI, a contact form that saves to the database, and content served via REST API endpoints.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives, styled with Tailwind CSS and CSS variables
- **Animations:** Framer Motion for page transitions, scroll-triggered animations, and hover effects
- **Forms:** React Hook Form with Zod resolvers for validation
- **Styling:** Tailwind CSS with custom theme (green primary, amber secondary, yellow accent). Fonts are Montserrat (headings) and Open Sans (body)
- **Build Tool:** Vite with React plugin
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend

- **Framework:** Express 5 on Node.js
- **Language:** TypeScript, run via `tsx` in development
- **API Pattern:** RESTful JSON API under `/api/` prefix
- **Route Definitions:** Centralized in `shared/routes.ts` with Zod schemas for request/response validation
- **Build:** esbuild bundles server code to `dist/index.cjs` for production; Vite builds client to `dist/public`

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/posts` | List all blog posts |
| GET | `/api/posts/:slug` | Get single post by slug |
| GET | `/api/team` | List team members |
| GET | `/api/gallery` | List gallery items |
| GET | `/api/testimonials` | List testimonials |
| POST | `/api/contact` | Submit contact form message |

### Data Layer

- **Database:** PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM:** Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema Location:** `shared/schema.ts` — shared between frontend and backend
- **Migrations:** Generated via `drizzle-kit` to `./migrations` directory
- **Schema Push:** Use `npm run db:push` to push schema changes directly

### Database Tables

- **posts** — Blog posts (title, slug, excerpt, content, coverImage, author, category, createdAt)
- **team_members** — Team/staff (name, role, bio, imageUrl, displayOrder)
- **gallery_items** — Gallery photos/videos (title, category, imageUrl, type, createdAt)
- **testimonials** — User testimonials (name, role, content, imageUrl)
- **contact_messages** — Contact form submissions (name, email, phone, subject, message)

### Storage Pattern

- `server/storage.ts` defines an `IStorage` interface and `DatabaseStorage` class implementing it
- All database operations go through the storage layer, making it easy to swap implementations

### Development vs Production

- **Dev:** Vite dev server runs as middleware inside Express with HMR support. Run with `npm run dev`
- **Production:** Client is built with Vite, server is bundled with esbuild. Run with `npm run build` then `npm start`
- Static files in production are served from `dist/public` with SPA fallback to `index.html`

### Key Design Decisions

1. **Shared schema between client and server** — The `shared/` directory contains both the database schema and API route definitions, ensuring type safety across the full stack
2. **Zod validation everywhere** — Insert schemas are generated from Drizzle tables via `drizzle-zod`, used on both client forms and server route handlers
3. **shadcn/ui component library** — Pre-built accessible components that can be customized; located in `client/src/components/ui/`
4. **CSS variables for theming** — Colors defined as HSL CSS variables in `index.css`, making theme changes centralized
5. **Content currently mixed** — Some pages (Blog, Gallery) use hardcoded data alongside API hooks, indicating the database seeding may still be needed

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable using `pg` Pool
- **Unsplash** — Hero and gallery images loaded from Unsplash CDN URLs
- **Google Fonts** — Montserrat, Open Sans, DM Sans, Geist Mono, Architects Daughter, Fira Code loaded via Google Fonts CDN
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` for Replit development environment integration
- **No authentication** — The site is currently public-facing with no auth system
- **No payment integration yet** — The Donate page exists but payment processing is not implemented (Stripe is listed in build allowlist for future use)





- **MY PROMPT** -
# GWD Platform – Admin, Gallery & Dynamic Routing Implementation

## Objective

Implement a protected admin system with structured publishing logic, automatic frontend updates, gallery routing, and dynamic detailed pages.

---

# 1️⃣ Admin Authentication (Dummy Login System)

## Requirement

When a user navigates to:

/admin

If NOT authenticated:
→ Automatically redirect to:

/admin/login

If authenticated:
→ Redirect to:

/admin/dashboard

---

## Dummy Credentials (For Now)

Email:
admin@gwd.com.ng

Password:
admin123

---

## Authentication Logic

- Use LocalStorage or Context API to manage auth state
- On successful login → Save auth state
- On logout → Clear auth state and redirect to login page
- Protect all `/admin/*` routes

---

# 2️⃣ Simplified Admin Dashboard Structure

Modify the admin dashboard to contain ONLY these four categories:

1. FLICs  
2. HUBs  
3. Blogs & News  
4. Financial Literacy Games & Activities  

Remove all other categories.

---

# 3️⃣ Smart Content Publishing Logic

When content is posted from the Admin Dashboard, it must automatically update the frontend based on category.

---

## 🟢 If Category = FLICs

Automatically:

- Add to Homepage → “Success Stories”
- Add to `/programs/flic`
- Add to FLIC Gallery

---

## 🔵 If Category = HUBs

Automatically:

- Add to Homepage → “Success Stories”
- Add to `/programs/hubs`
- Add to HUBs Gallery

---

## 🟡 If Category = Financial Literacy Games & Activities

Automatically:

- Add to Games Section
- Add to Games Gallery

---

## 📰 If Category = Blogs & News

Automatically:

- Add to `/blog`
- Add to Homepage → “Latest Updates”

---

# 4️⃣ Gallery Page Structure

Main Gallery Page should display:

- FLIC Gallery
- HUBs / Youth Tech Bootcamps
- Financial Literacy Games & Activities

---

## Routing Behavior

When clicked:

FLIC → `/gallery/flic`  
HUBs → `/gallery/hubs`  
Games → `/gallery/games`  

---

# 5️⃣ Dynamic Detailed Pages

Each Gallery Category must have dynamic routing using slugs.

---

## 🔹 FLIC Gallery

Route:
/gallery/flic

Display:
- List of FLIC Schools
- Each school card should show:
  - School Name
  - Description
  - Images
  - Impact Report
  - Key Activities

When a school is clicked:

/gallery/flic/[schoolSlug]

Load:
DetailedPage.tsx

---

## 🔹 HUBs / Youth Tech Bootcamps

Route:
/gallery/hubs

Display:
- HUB Institutions
- Achievements
- Key Activities
- Images
- Impact Reports

When clicked:

/gallery/hubs/[hubSlug]

Load:
DetailedPage.tsx

---

## 🔹 Financial Literacy Games & Activities

Route:
/gallery/games

Display:
- Game Categories
- Activity Types
- Images
- Descriptions

When clicked:

/gallery/games/[gameSlug]

Load:
DetailedPage.tsx

---

# 6️⃣ Technical Architecture Requirements

- Use reusable components
- Use slug-based dynamic routing
- Use modular content types
- Maintain clean state management
- Implement scalable file structure
- All dynamic pages must load using:

DetailedPage.tsx

---

# Final Goal

Create a smart content-driven system where:

- Admin posts once
- Frontend updates automatically
- Gallery organizes itself
- Dynamic pages generate based on slugs
- Routing is clean and scalable
