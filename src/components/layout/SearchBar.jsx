import React, { useState } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearched }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearched) onSearched();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm} role="search">
      <Search size={16} className={styles.searchIcon} />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search objects..."
        className={styles.searchInput}
        aria-label="Search catalog"
      />
    </form>
  );
}