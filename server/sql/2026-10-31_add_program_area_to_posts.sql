-- Group posts under the Our Programs pages, separately from category
-- (which still drives the Gallery and Blog). Null means no program page.
-- Safe to run multiple times.

alter table public.posts
  add column if not exists program_area text;

create index if not exists posts_program_area_idx on public.posts (program_area);

update public.posts
set program_area = 'financial-literacy'
where category = 'flic' and program_area is null;

update public.posts
set program_area = 'financial-literacy'
where id in (13, 20, 12, 21, 36, 37, 38, 39) and program_area is null;

update public.posts
set program_area = 'digital-skills'
where id in (11, 52, 41) and program_area is null;

update public.posts
set program_area = 'entrepreneurship'
where id in (46, 35, 40) and program_area is null;
