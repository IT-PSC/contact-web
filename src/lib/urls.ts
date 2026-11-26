export function getSiteOrigin() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3001"
  );
}

/** Physical card (first view). */
export function physicalCardPath(slug: string) {
  return `/card/${encodeURIComponent(slug)}`;
}

/** Digital namecard opened after scanning the QR. */
export function digitalCardPath(slug: string) {
  return `/card/${encodeURIComponent(slug)}/digital`;
}

export function digitalCardUrl(slug: string) {
  return `${getSiteOrigin()}${digitalCardPath(slug)}`;
}
