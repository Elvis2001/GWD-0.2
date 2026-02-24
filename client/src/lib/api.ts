export const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL is required.");
}
const normalizedApiBase = API_BASE.replace(/\/$/, "");

export function buildApiUrl(path: string): string {
  return `${normalizedApiBase}${path.startsWith("/") ? path : `/${path}`}`;
}
