import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import { SEARCH_DEBOUNCE_MS } from "../../config/constants";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearched }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isProductsPage = location.pathname === "/products";
  
  const urlQ = isProductsPage ? (searchParams.get("q") || "") : "";
  const [inputValue, setInputValue] = useState(urlQ);
  const debouncedValue = useDebounce(inputValue, SEARCH_DEBOUNCE_MS);
  
  const lastWrittenValue = useRef(urlQ);

  useEffect(() => {
    if (isProductsPage && urlQ !== lastWrittenValue.current) {
      setInputValue(urlQ);
      lastWrittenValue.current = urlQ;
    }
  }, [urlQ, isProductsPage]);

  useEffect(() => {
    if (!isProductsPage) return;
    
    const trimmed = debouncedValue.trim();
    if (trimmed !== urlQ) {
      const newParams = new URLSearchParams(searchParams);
      if (trimmed) {
        newParams.set("q", trimmed);
      } else {
        newParams.delete("q");
      }
      newParams.delete("page"); 
      lastWrittenValue.current = trimmed;
      setSearchParams(newParams, { replace: true });
    }
  }, [debouncedValue, isProductsPage, searchParams, setSearchParams, urlQ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (onSearched) onSearched();

    if (!isProductsPage) {
      if (trimmed) {
        navigate(`/products?q=${encodeURIComponent(trimmed)}`);
      } else {
        navigate(`/products`);
      }
    }
  };

  const handleClear = () => {
    setInputValue("");
    if (isProductsPage) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("q");
      newParams.delete("page");
      lastWrittenValue.current = "";
      setSearchParams(newParams, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm} role="search">
      <Search size={16} className={styles.searchIcon} />
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search objects..."
        className={styles.searchInput}
        aria-label="Search catalog"
      />
      {inputValue && (
        <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="Clear search">
          <X size={14} />
        </button>
      )}
    </form>
  );
}