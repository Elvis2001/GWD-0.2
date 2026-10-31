-- Store Contact page submissions for the admin Messages page.
-- RLS with no policies keeps these private: only the backend's service role can reach them.
-- Safe to run multiple times.

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;
