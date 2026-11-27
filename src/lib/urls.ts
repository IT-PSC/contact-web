export function getSiteOrigin() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    "";

  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  return "http://localhost:3001";
}

/** Physical card preview (QR host page). */
export function physicalCardPath(slug: string) {
  return `/card/${encodeURIComponent(slug)}/physical`;
}

/** Digital namecard — same page for shared links and QR scans. */
export function digitalCardPath(slug: string) {
  return `/card/${encodeURIComponent(slug)}/digital`;
}

export function digitalCardUrl(slug: string) {
  return `${getSiteOrigin()}${digitalCardPath(slug)}`;
}
