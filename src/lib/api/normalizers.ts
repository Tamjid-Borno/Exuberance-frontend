import { MEDIA_BASE } from "./config";

/* ==================================================
   API TYPES (RAW BACKEND SHAPE)
================================================== */
import type {
  APICategory,
  APIProduct,
  APIHeroBanner,
} from "./types";

/* ==================================================
   DOMAIN TYPES (FRONTEND SAFE)
================================================== */
import type {
  Category,
  Product,
  HeroBanner,
} from "@/types";

/* ================================
   MEDIA URL NORMALIZER
================================ */
/**
 * Converts relative media paths into absolute URLs.
 *
 * 🔒 GUARANTEE:
 * - NEVER returns null
 * - Always returns string
 */
export function normalizeMediaUrl(
  path?: string | null
): string {
  if (!path) return "";

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${MEDIA_BASE}${
    path.startsWith("/") ? "" : "/"
  }${path}`;
}

/* ================================
   CATEGORY NORMALIZER
================================ */
/* ================================
   CATEGORY NORMALIZER (FIXED)
================================ */
export function normalizeCategory(
  raw: APICategory
): Category {
  return {
    id: Number(raw.id),
    name: String(raw.name ?? ""),
    slug: String(raw.slug ?? ""),
    image: normalizeMediaUrl(raw.image),

    // 🔥 CAMPAIGN FIELDS — SAFE DEFAULTS
    is_campaign: Boolean(raw.is_campaign),
    starts_at: null,
    ends_at: null,
    show_countdown: false,

    // 🌳 TREE
    children: Array.isArray(raw.children)
      ? raw.children.map(normalizeCategory)
      : [],
  };
}


/* ================================
   PRODUCT NORMALIZER
   (LIST / CARD / RELATED)
================================ */
/* ================================
   PRODUCT NORMALIZER (FIXED)
================================ */
export function normalizeProduct(
  raw: APIProduct
): Product {
  return {
    id: Number(raw.id),
    slug: String(raw.slug ?? ""),
    name: String(raw.name ?? ""),

    // ✅ KEEP DECIMALS AS STRINGS
    price: String(raw.price ?? "0"),
    old_price:
      raw.old_price !== null &&
      raw.old_price !== undefined
        ? String(raw.old_price)
        : null,

    main_image: normalizeMediaUrl(
      raw.main_image
    ),

    is_featured: Boolean(raw.is_featured),
    short_description:
      raw.short_description ?? "",
  };
}

/* ================================
   HERO BANNER NORMALIZER
================================ */
export function normalizeHeroBanner(
  raw: APIHeroBanner
): HeroBanner {
  return {
    id: Number(raw.id),
    image_desktop: normalizeMediaUrl(
      raw.image_desktop
    ),
    image_tablet: normalizeMediaUrl(
      raw.image_tablet
    ),
    image_mobile: normalizeMediaUrl(
      raw.image_mobile
    ),
    ordering: Number(raw.ordering ?? 0),
  };
}
