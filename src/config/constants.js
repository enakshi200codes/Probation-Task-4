export const APP_NAME = "Nocturne";
export const CURRENCY_CODE = "USD";
export const LOCALE = "en-US";
export const MAX_CART_QUANTITY = 10;
export const SHIPPING_FLAT_FEE = 6.00;
export const FREE_SHIPPING_THRESHOLD = 75.00;
export const PAGE_SIZE = 12;
export const SEARCH_DEBOUNCE_MS = 250;
export const RECENT_LIMIT = 8;
export const RECENT_DISPLAY_COUNT = 4;
export const ORDERS_LIMIT = 10;
export const HOME_RAIL_COUNT = 4;
export const RELATED_COUNT = 4;
export const CATALOG_LATENCY_MS = 600;
export const PLACE_ORDER_DELAY_MS = 800;
export const TOAST_DURATION_MS = 3500;
export const SIMULATE_CATALOG_ERROR = false;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const STORAGE_KEYS = {
  CART: "nocturne:v1:cart",
  WISHLIST: "nocturne:v1:wishlist",
  RECENT: "nocturne:v1:recent",
  ORDERS: "nocturne:v1:orders",
  USERS: "nocturne:v1:users",
  SESSION: "nocturne:v1:session",
  REVIEWS: "nocturne:v1:reviews",
};

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating: High to Low" },
  { value: "newest", label: "Newest" },
];

export const RATING_FILTER_OPTIONS = [
  { value: "", label: "Any rating" },
  { value: "4", label: "4+ stars" },
  { value: "3", label: "3+ stars" },
];