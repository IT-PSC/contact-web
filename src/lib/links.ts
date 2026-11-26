function ensureUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("t.me/")) return `https://${trimmed}`;
  return `https://${trimmed}`;
}

export function ensureExternalHref(
  value: string,
  kind: "phone" | "url" | "email",
): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (kind === "phone") return `tel:${trimmed.replace(/\s+/g, "")}`;
  if (kind === "email") return `mailto:${trimmed}`;
  return ensureUrl(trimmed);
}
