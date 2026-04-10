-- Preserve original uploaded PDF filename for download responses.
-- Safe to run multiple times.

alter table public.posts
  add column if not exists resource_pdf_name text;
