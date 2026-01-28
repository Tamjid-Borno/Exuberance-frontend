/* ==================================================
   LANDING PUBLIC API (NORMALIZED — FINAL)
   --------------------------------------------------
   ✅ No raw API types leak to UI
   ✅ No missing imports
   ✅ No null/undefined mismatches
================================================== */

import { API_BASE } from "./config";

/* ================= RAW API TYPES ================= */

import type {
  ApiBlockResponse,
  APIHeroBanner,
  APILandingMenuItem,
  APIFeaturedCategory,
  APIHotCategory,
  APIComfortRail,
  LandingCMSBlock,
} from "./types";

/* ================= UI TYPES ================= */

import type { HeroBannerItem } from "@/types/hero-banner";
import type { LandingMenuItem } from "@/types/landing-menu";
import type { FeaturedCategory } from "@/types/featured-category";
import type { HotCategory } from "@/types/hot-category";
import type { ComfortRail } from "@/types/comfort-rail";

/* ==================================================
   INTERNAL SAFE FETCH
================================================== */

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`[API] Failed to fetch: ${url}`);
  }

  return res.json() as Promise<T>;
}

/* ==================================================
   HERO BANNERS
================================================== */

export async function getHeroBanners(): Promise<HeroBannerItem[]> {
  const data = await safeFetch<ApiBlockResponse<APIHeroBanner>>(
    `${API_BASE}/api/landing/banners/`
  );

  if (!Array.isArray(data.items)) return [];

  return data.items.map((b) => ({
    id: b.id,
    image_desktop: b.image_desktop,
    image_tablet: b.image_tablet,
    image_mobile: b.image_mobile,
    ordering: b.ordering,
  }));
}

/* ==================================================
   LANDING MENU
================================================== */

export async function getLandingMenu(): Promise<LandingMenuItem[]> {
  const data = await safeFetch<ApiBlockResponse<APILandingMenuItem>>(
    `${API_BASE}/api/landing/menu/`
  );

  if (!Array.isArray(data.items)) return [];

  return data.items.map((item) => ({
    name: item.name,
    slug: item.slug,
    ...(item.seo_title ? { seo_title: item.seo_title } : {}),
    ...(item.seo_description
      ? { seo_description: item.seo_description }
      : {}),
  }));
}

/* ==================================================
   FEATURED CATEGORIES
================================================== */

export async function getFeaturedCategories(): Promise<
  FeaturedCategory[]
> {
  const data = await safeFetch<
    ApiBlockResponse<APIFeaturedCategory>
  >(`${API_BASE}/api/landing/featured-categories/`);

  if (!Array.isArray(data.items)) return [];

  return data.items.map((item, index) => ({
    id: item.id ?? index,
    name: item.name,
    slug: item.slug,
    image: item.image,
  }));
}

/* ==================================================
   HOT CATEGORIES
================================================== */

export async function getHotCategories(): Promise<HotCategory[]> {
  const data = await safeFetch<
    ApiBlockResponse<APIHotCategory>
  >(`${API_BASE}/api/landing/hot-categories/`);

  if (!Array.isArray(data.items)) return [];

  return data.items.map((item) => ({
    id: item.id,
    hot_category_block_id: item.hot_category_block_id,
    name: item.name,
    slug: item.slug,
    image: item.image,
  }));
}

/* ==================================================
   COMFORT RAILS
================================================== */

export async function getComfortRails(): Promise<ComfortRail[]> {
  const data = await safeFetch<
    ApiBlockResponse<APIComfortRail>
  >(`${API_BASE}/api/landing/comfort/`);

  if (!Array.isArray(data.items)) return [];

  return data.items.map((rail) => ({
    id: rail.id,

    category: {
      name: rail.category.name,
      slug: rail.category.slug,
      image: rail.category.image,
    },

    products: Array.isArray(rail.products)
      ? rail.products.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          old_price: p.old_price ?? null,
          main_image: p.main_image ?? null,
        }))
      : [],
  }));
}

/* ==================================================
   CMS — LANDING LAYOUT (ORDER ONLY)
================================================== */

export async function getLandingCMS(): Promise<
  LandingCMSBlock[]
> {
  const data = await safeFetch<
    ApiBlockResponse<LandingCMSBlock>
  >(`${API_BASE}/api/landing/cms/`);

  return Array.isArray(data.items) ? data.items : [];
}
