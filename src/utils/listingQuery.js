import { SORT_OPTIONS } from "../config/constants";

export const DEFAULT_QUERY = {
  q: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  rating: "",
  sort: "featured",
  page: 1
};

export function parseListingParams(searchParams, categories) {
  const query = { ...DEFAULT_QUERY };

  const q = searchParams.get("q");
  if (q) query.q = q.trim();

  const category = searchParams.get("category");
  if (category && categories.some(c => c.id === category)) {
    query.category = category;
  }

  let minPrice = searchParams.get("minPrice");
  let maxPrice = searchParams.get("maxPrice");
  
  minPrice = minPrice && !isNaN(Number(minPrice)) && Number(minPrice) >= 0 ? Number(minPrice) : "";
  maxPrice = maxPrice && !isNaN(Number(maxPrice)) && Number(maxPrice) >= 0 ? Number(maxPrice) : "";

  if (minPrice !== "" && maxPrice !== "" && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }
  
  query.minPrice = minPrice;
  query.maxPrice = maxPrice;

  const rating = searchParams.get("rating");
  if (rating === "3" || rating === "4") {
    query.rating = rating;
  }

  const sort = searchParams.get("sort");
  if (sort && SORT_OPTIONS.some(opt => opt.value === sort)) {
    query.sort = sort;
  }

  const page = parseInt(searchParams.get("page"), 10);
  if (!isNaN(page) && page > 0) {
    query.page = page;
  }

  return query;
}

export function buildListingParams(query) {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.minPrice !== "") params.set("minPrice", query.minPrice);
  if (query.maxPrice !== "") params.set("maxPrice", query.maxPrice);
  if (query.rating) params.set("rating", query.rating);
  if (query.sort && query.sort !== "featured") params.set("sort", query.sort);
  if (query.page && query.page > 1) params.set("page", query.page);
  return params;
}

export function filterProducts(products, query, categories) {
  let result = products;

  if (query.q) {
    const lowerQ = query.q.toLowerCase();
    result = result.filter(p => {
      const cat = categories.find(c => c.id === p.category);
      const catName = cat ? cat.name.toLowerCase() : "";
      return p.name.toLowerCase().includes(lowerQ) || catName.includes(lowerQ);
    });
  }

  if (query.category) {
    result = result.filter(p => p.category === query.category);
  }

  if (query.minPrice !== "") {
    result = result.filter(p => p.price >= query.minPrice);
  }
  
  if (query.maxPrice !== "") {
    result = result.filter(p => p.price <= query.maxPrice);
  }

  if (query.rating) {
    const minRating = Number(query.rating);
    result = result.filter(p => p.rating >= minRating);
  }

  return result;
}

export function sortProducts(products, sort) {
  const arr = [...products];
  
  arr.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price || a.name.localeCompare(b.name);
      case "price-desc":
        return b.price - a.price || a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "featured":
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating || a.name.localeCompare(b.name);
    }
  });

  return arr;
}

export function paginate(items, page, pageSize) {
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (safePage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);

  return { items: paginatedItems, page: safePage, totalPages, totalCount };
}