-- Add resource PDF support for CMS posts/programs.
-- Safe to run multiple times.

alter table public.posts
  add column if not exists resource_pdf_url text;
