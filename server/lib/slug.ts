export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildSlug(input: string): string {
  const base = slugify(input);
  if (!base) {
    return `post-${Date.now()}`;
  }
  return base;
}
