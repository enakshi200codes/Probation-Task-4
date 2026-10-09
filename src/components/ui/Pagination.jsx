import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.navBtn}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      <div className={styles.pages}>
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const isCurrent = pageNum === page;
          return (
            <button
              key={pageNum}
              type="button"
              className={`${styles.pageBtn} ${isCurrent ? styles.active : ""}`}
              onClick={() => onPageChange(pageNum)}
              aria-current={isCurrent ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.navBtn}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}