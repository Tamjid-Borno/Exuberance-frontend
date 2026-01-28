"use client";

import HeroBanner from "./HeroBanner";
import LandingMenu from "./LandingMenu";
import FeaturedCategories from "./FeaturedCategories";
import HotCategories from "./HotCategories";
import ComfortBlock from "./ComfortBlock";
import ComfortRail from "./ComfortRail";

/**
 * ==================================================
 * LANDING CMS RENDERER — FINAL, LAYER-SAFE
 * ==================================================
 *
 * RULES:
 * - CMS controls ORDER only
 * - API layer owns RAW contracts
 * - UI consumes NORMALIZED TYPES ONLY
 */

import type { LandingCMSBlock } from "@/lib/api/types";

// ✅ UI-safe domain types (NORMALIZED)
import type { HeroBannerItem } from "@/types/hero-banner";
import type { LandingMenuItem } from "@/types/landing-menu";
import type { FeaturedCategory } from "@/types/featured-category";
import type { HotCategory } from "@/types/hot-category";
import type { ComfortRail as UIComfortRail } from "@/types/comfort-rail";

/* ==================================================
   PROPS
================================================== */

type Props = {
  blocks: LandingCMSBlock[];

  heroBanners: HeroBannerItem[];
  landingMenuItems: LandingMenuItem[];
  featuredCategories: FeaturedCategory[];
  hotCategories: HotCategory[];
  comfortRails: UIComfortRail[];
};

/* ==================================================
   COMPONENT
================================================== */

export default function LandingRenderer({
  blocks,
  heroBanners,
  landingMenuItems,
  featuredCategories,
  hotCategories,
  comfortRails,
}: Props) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          /* ================= HERO ================= */
          case "hero":
            return heroBanners.length ? (
              <HeroBanner
                key={`hero-${index}`}
                banners={heroBanners}
              />
            ) : null;

          /* ================= MENU ================= */
          case "menu":
            return landingMenuItems.length ? (
              <LandingMenu
                key={`menu-${index}`}
                items={landingMenuItems}
              />
            ) : null;

          /* ============== FEATURED ============== */
          case "featured":
            return featuredCategories.length ? (
              <FeaturedCategories
                key={`featured-${index}`}
                items={featuredCategories}
              />
            ) : null;

          /* ================= HOT ================= */
          case "hot":
            return hotCategories.length ? (
              <HotCategories
                key={`hot-${index}`}
                items={hotCategories}
              />
            ) : null;

          /* ============ COMFORT BLOCK ============ */
          case "comfort_block":
            return (
              <ComfortBlock
                key={`comfort-block-${index}`}
              />
            );

          /* ============ COMFORT RAIL ============ */
          case "comfort_rail": {
            const rail = comfortRails.find(
              (r) => r.id === block.comfort_rail_id
            );

            if (!rail) {
              console.warn(
                "⚠️ Comfort rail missing (ID:",
                block.comfort_rail_id,
                ")"
              );
              return null;
            }

            return (
              <ComfortRail
                key={`rail-${rail.id}`}
                category={rail.category}
                products={rail.products}
              />
            );
          }

          /* ============== SAFE FALLBACK ============== */
          default:
            return null;
        }
      })}
    </>
  );
}
