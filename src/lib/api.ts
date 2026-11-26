import type { CardPayload } from "./types";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

export function getBackendApiUrl() {
  return BACKEND_API_URL;
}

export function mediaUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return `${BACKEND_API_URL}${path}`;
  return `${BACKEND_API_URL}/${path}`;
}

export async function fetchCard(slug: string): Promise<CardPayload | null> {
  const res = await fetch(
    `${BACKEND_API_URL}/api/public/cards/${encodeURIComponent(slug)}`,
    {
      next: { revalidate: 0 },
      cache: "no-store",
    },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load card (${res.status})`);
  }
  return (await res.json()) as CardPayload;
}

export function vcardUrl(slug: string): string {
  return `${BACKEND_API_URL}/api/public/cards/${encodeURIComponent(slug)}/vcard`;
}
