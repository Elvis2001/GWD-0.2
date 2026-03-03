-- Extend existing posts table for CMS features without dropping or recreating it.
-- Safe to run multiple times.

alter table public.posts
  add column if not exists excerpt text,
  add column if not exists content text,
  add column if not exists thumbnail_url text,
  add column if not exists gallery_images text[] default '{}',
  add column if not exists featured boolean not null default false,
  add column if not exists published boolean not null default false,
  add column if not exists content_type text not null default 'post',
  add column if not exists author text,
  add column if not exists name text,
  add column if not exists role text,
  add column if not exists image_url text,
  add column if not exists impact_report text,
  add column if not exists key_activities text[] default '{}',
  add column if not exists updated_at timestamptz not null default now();

create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_category_idx on public.posts (category);
create index if not exists posts_content_type_idx on public.posts (content_type);
create index if not exists posts_published_idx on public.posts (published);

-- Optional trigger to maintain updated_at.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();
