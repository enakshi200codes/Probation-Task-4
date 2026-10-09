import React, { useState, useEffect } from "react";
import { RATING_FILTER_OPTIONS } from "../../config/constants";
import styles from "./FilterPanel.module.css";

export default function FilterPanel({ categories, filters, onChange, onClear, hasActiveFilters }) {
  const [draftMin, setDraftMin] = useState(filters.minPrice);
  const [draftMax, setDraftMax] = useState(filters.maxPrice);

  useEffect(() => {
    setDraftMin(filters.minPrice);
    setDraftMax(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceCommit = () => {
    onChange({ minPrice: draftMin, maxPrice: draftMax });
  };

  const handlePriceKeyDown = (e) => {
    if (e.key === "Enter") handlePriceCommit();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        {hasActiveFilters && (
          <button type="button" onClick={onClear} className={styles.clearBtn}>
            Clear all
          </button>
        )}
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Category</legend>
        <div className={styles.options}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="category"
              checked={!filters.category}
              onChange={() => onChange({ category: "" })}
            />
            All Categories
          </label>
          {categories.map((c) => (
            <label key={c.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="category"
                checked={filters.category === c.id}
                onChange={() => onChange({ category: c.id })}
              />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Price</legend>
        <div className={styles.priceInputs}>
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={draftMin}
            onChange={(e) => setDraftMin(e.target.value)}
            onBlur={handlePriceCommit}
            onKeyDown={handlePriceKeyDown}
            className={styles.priceInput}
            aria-label="Minimum price"
          />
          <span className={styles.priceSep}>to</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={draftMax}
            onChange={(e) => setDraftMax(e.target.value)}
            onBlur={handlePriceCommit}
            onKeyDown={handlePriceKeyDown}
            className={styles.priceInput}
            aria-label="Maximum price"
          />
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Rating</legend>
        <div className={styles.options}>
          {RATING_FILTER_OPTIONS.map((opt) => (
            <label key={opt.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="rating"
                checked={filters.rating === opt.value}
                onChange={() => onChange({ rating: opt.value })}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}