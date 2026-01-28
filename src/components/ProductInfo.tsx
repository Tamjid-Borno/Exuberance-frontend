"use client";

import styles from "./ProductInfo.module.css";
import type { ProductDetail } from "@/types/product";

/* ==================================================
   HELPERS
================================================== */

/**
 * Convert API price (string | number | null) → number | null
 * This is REQUIRED for safe comparisons.
 */
function normalizePrice(
  value: string | number | null | undefined
): number | null {
  if (value === null || value === undefined) return null;

  const num =
    typeof value === "number"
      ? value
      : Number.parseFloat(value);

  return Number.isFinite(num) ? num : null;
}

/* ==================================================
   ProductInfo (MOBILE-FIRST)
   Responsibility:
   - Product name
   - Price (old + current)

   ❌ NO short description
   ❌ NO full description
================================================== */

export default function ProductInfo({
  product,
}: {
  product: ProductDetail;
}) {
  const price = normalizePrice(product.price);
  const oldPrice = normalizePrice(product.old_price);

  const hasDiscount =
    price !== null &&
    oldPrice !== null &&
    oldPrice > price;

  return (
    <section className={styles.wrapper}>
      {/* =========================
         PRODUCT NAME
      ========================= */}
      <h1 className={styles.name}>{product.name}</h1>

      {/* =========================
         PRICE
      ========================= */}
      <div className={styles.priceRow}>
        {hasDiscount && (
          <span className={styles.oldPrice}>
            ৳{oldPrice}
          </span>
        )}

        {price !== null && (
          <span className={styles.price}>
            <span className={styles.currency}>৳</span>
            {price}
          </span>
        )}
      </div>
    </section>
  );
}
