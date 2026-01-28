const MEDIA_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://photo-village-scholarship-sizes.trycloudflare.com";

export function resolveMediaUrl(path?: string | null) {
  if (!path) return "/placeholder.png";

  // Already absolute? return as-is
  if (path.startsWith("http")) return path;

  // Ensure single slash
  return `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}
