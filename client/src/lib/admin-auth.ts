const TOKEN_KEY = "gwd_admin_access_token";

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAdminLoggedIn(): boolean {
  return Boolean(getAdminToken());
}
