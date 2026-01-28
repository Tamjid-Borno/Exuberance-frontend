/**
 * ==================================================
 * FEATURED CATEGORY — UI SAFE DOMAIN TYPE
 * ==================================================
 *
 * Used by:
 * - Normalizers (API → UI)
 * - Landing UI components
 *
 * ❌ Not used in API layer directly
 */

export type FeaturedCategory = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
};
