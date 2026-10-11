import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PAGE_SIZE, RATING_FILTER_OPTIONS } from "../config/constants";
import { parseListingParams, buildListingParams, filterProducts, sortProducts, paginate } from "../utils/listingQuery";
import CatalogGate from "../components/layout/CatalogGate";
import Container from "../components/ui/Container";
import ProductGrid from "../components/product/ProductGrid";
import FilterPanel from "../components/listing/FilterPanel";
import SortSelect from "../components/listing/SortSelect";
import Pagination from "../components/ui/Pagination";
import EmptyState from "../components/ui/EmptyState";
import Drawer from "../components/ui/Drawer";
import Button from "../components/ui/Button";
import { SlidersHorizontal, SearchX, X } from "lucide-react";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useCatalog();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const query = parseListingParams(searchParams, categories);
  useDocumentTitle(query.q ? `Results for "${query.q}"` : "Shop");

  const filtered = filterProducts(products, query, categories);
  const sorted = sortProducts(filtered, query.sort);
  const { items, page, totalPages, totalCount } = paginate(sorted, query.page || 1, PAGE_SIZE);

  const hasActiveFilters = Boolean(query.category || query.minPrice !== "" || query.maxPrice !== "" || query.rating);

  const updateParams = (updates) => {
    const newQuery = { ...query, ...updates };
    if (!updates.page && updates.page !== 1) {
      newQuery.page = 1;
    }
    setSearchParams(buildListingParams(newQuery));
  };

  const handleClearAll = () => {
    setSearchParams(buildListingParams({ q: query.q, sort: query.sort, page: 1 }));
  };

  const getActiveChips = () => {
    const chips = [];
    if (query.category) {
      const cat = categories.find((c) => c.id === query.category);
      if (cat) chips.push({ id: "category", label: `Category: ${cat.name}`, clearValue: { category: "" } });
    }
    if (query.minPrice !== "" || query.maxPrice !== "") {
      let label = "Price: ";
      if (query.minPrice !== "" && query.maxPrice !== "") label += `$${query.minPrice} - $${query.maxPrice}`;
      else if (query.minPrice !== "") label += `Over $${query.minPrice}`;
      else label += `Under $${query.maxPrice}`;
      chips.push({ id: "price", label, clearValue: { minPrice: "", maxPrice: "" } });
    }
    if (query.rating) {
      const rat = RATING_FILTER_OPTIONS.find((r) => r.value === query.rating);
      if (rat) chips.push({ id: "rating", label: `Rating: ${rat.label}`, clearValue: { rating: "" } });
    }
    return chips;
  };

  const activeChips = getActiveChips();

  return (
    <CatalogGate>
      <Container size="wide">
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{query.q ? `Results for "${query.q}"` : "Shop"}</h1>
            <div className={styles.liveRegion} role="status" aria-live="polite">
              {totalCount} product{totalCount !== 1 && "s"} found
            </div>
          </div>
          <div className={styles.toolbarActions}>
            <button
              type="button"
              className={styles.mobileFilterBtn}
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
            <div className={styles.sortWrapper}>
              <SortSelect value={query.sort} onChange={(sort) => updateParams({ sort })} />
            </div>
          </div>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <FilterPanel
              categories={categories}
              filters={query}
              onChange={updateParams}
              onClear={handleClearAll}
              hasActiveFilters={hasActiveFilters}
            />
          </aside>

          <div className={styles.main}>
            {activeChips.length > 0 && (
              <div className={styles.chipsContainer}>
                {activeChips.map((chip) => (
                  <button
                    key={chip.id}
                    className={styles.chip}
                    onClick={() => updateParams(chip.clearValue)}
                    aria-label={`Remove filter: ${chip.label}`}
                  >
                    {chip.label}
                    <X size={14} className={styles.chipIcon} />
                  </button>
                ))}
                {activeChips.length > 1 && (
                  <button className={styles.clearAllBtn} onClick={handleClearAll}>
                    Clear all
                  </button>
                )}
              </div>
            )}

            {totalCount === 0 ? (
              <EmptyState
                icon={SearchX}
                title="No products match"
                message={`We couldn't find anything matching your current filters ${query.q ? `and search "${query.q}"` : ""}.`}
                actionLabel="Clear filters and search"
                onAction={() => setSearchParams(buildListingParams({ sort: "featured", page: 1 }))}
              />
            ) : (
              <>
                <ProductGrid products={items} variant="listing" />
                <Pagination page={page} totalPages={totalPages} onPageChange={(page) => updateParams({ page })} />
              </>
            )}
          </div>
        </div>
      </Container>

      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filters"
        side="bottom"
        footer={
          <Button fullWidth onClick={() => setIsFilterDrawerOpen(false)}>
            Show {totalCount} results
          </Button>
        }
      >
        <FilterPanel
          categories={categories}
          filters={query}
          onChange={updateParams}
          onClear={handleClearAll}
          hasActiveFilters={hasActiveFilters}
        />
      </Drawer>
    </CatalogGate>
  );
}