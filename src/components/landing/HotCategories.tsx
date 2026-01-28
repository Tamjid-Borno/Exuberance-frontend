"use client";

import Link from "next/link";
import styles from "./HotCategories.module.css";

/**
 * ==================================================
 * HOT CATEGORIES — LANDING SECTION
 * ==================================================
 *
 * Rules:
 * - API layer owns the contract
 * - UI NEVER redefines domain types
 * - This component consumes APIHotCategory directly
 */

import type { APIHotCategory } from "@/lib/api/types";

/* ==================================================
   PROPS
================================================== */

type Props = {
  items: APIHotCategory[];
};

/* ==================================================
   COMPONENT
================================================== */

export default function HotCategories({ items }: Props) {
  // Absolute safety guard
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className={styles.card}
            aria-label={item.name}
          >
            {/* IMAGE */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
            ) : (
              <div
                className={styles.imagePlaceholder}
                aria-hidden="true"
              />
            )}

            <span className={styles.title}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
