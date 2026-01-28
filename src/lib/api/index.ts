// ==================================================
// PUBLIC API ENTRY POINT (UI-SAFE)
// ==================================================
//
// ❌ DO NOT EXPORT RAW API TYPES
// ❌ DO NOT EXPORT ./types
//
// This file is the ONLY gateway the frontend should use
//

// ==================================================
// DOMAIN APIS (UI SAFE)
// ==================================================

export * from "./categories";
export * from "./products";

// ==================================================
// CMS APIs (ALREADY NORMALIZED)
// ==================================================

import {
  getLandingCMS as fetchLandingCMS, // ✅ already returns LandingCMSBlock[]
  getHeroBanners,
  getLandingMenu,
  getFeaturedCategories,
  getHotCategories,
  getComfortRails,
} from "./landing";

import type { LandingCMSBlock } from "./types"; // internal type only

// ==================================================
// CMS — ORDER ONLY (FINAL)
// ==================================================

/**
 * CMS controls ORDER only.
 * Data is already normalized in landing.ts
 */
export async function getLandingCMS(): Promise<
  LandingCMSBlock[]
> {
  const blocks = await fetchLandingCMS();

  if (!Array.isArray(blocks)) {
    console.warn(
      "[API] Invalid CMS blocks:",
      blocks
    );
    return [];
  }

  return blocks;
}

// ==================================================
// ATOMIC LANDING EXPORTS
// (already normalized & UI-safe)
// ==================================================

export {
  getHeroBanners,
  getLandingMenu,
  getFeaturedCategories,
  getHotCategories,
  getComfortRails,
};
