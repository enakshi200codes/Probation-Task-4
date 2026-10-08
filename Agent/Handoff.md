# HANDOFF.md — Nocturne: Developer Handoff and Architecture

**Audience:** the implementing developer (Gemini). You receive six documents: `PRD.md`, `RULES.md`, `CURRENT_STATE.md`, `DESIGN_TOKENS.md`, `HANDOFF.md`, `TECH_STACK.md`. This is the most important one. It resolves the architectural decisions so you can start without asking basic questions.

---

## 0. Reading Order and Working Protocol

**Read in this order:** `PRD.md` (what) → `HANDOFF.md` (how) → `RULES.md` (constraints) → `DESIGN_TOKENS.md` (visuals) → `TECH_STACK.md` (tools) → `CURRENT_STATE.md` (progress).

**Precedence if documents conflict:** `RULES.md` for code conventions; `PRD.md` for scope and behavior; `DESIGN_TOKENS.md` for visual values; `TECH_STACK.md` for dependencies; `HANDOFF.md` for architecture and sequencing. Never guess: use the documented default and record the conflict under Pending Decisions in `CURRENT_STATE.md`.

**Working protocol**
1. Work one phase at a time, in the order in section 17. Do not start a phase until the previous phase's acceptance checks pass.
2. Build only what the PRD lists. If it is not in `PRD.md`, do not build it.
3. Use the exact names in this document: routes, file names, component names, constants, storage keys, query parameter names.
4. Do not add dependencies. The approved list is in `TECH_STACK.md`.
5. At the end of each phase: run the checks, update `CURRENT_STATE.md` (change statuses to "Implemented", list new files), and commit with the conventional format.
6. Prefer the simplest implementation that satisfies the acceptance checks. Do not refactor beyond the phase.
7. Ask a question only when a decision is genuinely missing from the documents. Otherwise use the stated default.

---

## 1. Project Summary

**Nocturne** is a front-end e-commerce site selling curated evening and night-time objects (lighting, audio, desk, fragrance, sleep). Users browse, search, filter, sort, view product details, manage a cart, and complete a mock checkout that ends in an order confirmation with an order ID. Optional P1 features add a wishlist, recently viewed, pagination, mock sign-in, and reviews.

It is a learning and portfolio project. The architecture must stay explainable in a viva: five small contexts, URL-driven listing state, one source of product data, pure-function business logic, and LocalStorage persistence with safe fallbacks.

**Visual identity:** Minimalist Dark. Layered darkness, one warm amber accent, glass-effect panels where allowed, calm spacing. See `DESIGN_TOKENS.md`.

## 2. Technical Summary

| Concern | Decision |
|---|---|
| Framework | React (function components, hooks), JavaScript |
| Tooling | Vite, ESLint |
| Routing | React Router, declarative mode, `BrowserRouter` |
| Global state | Five contexts: Catalog, Cart, Wishlist, Auth, Toast |
| Listing state | URL query parameters |
| Data | Local seeded data (30 products, 5 categories) loaded through an async service with simulated latency |
| Persistence | LocalStorage via `utils/storage.js` and `hooks/useLocalStorage.js`, versioned keys |
| Styling | CSS custom properties (tokens) plus one CSS Module per component |
| Icons | Lucide React, named imports |
| Drawers | Native `<dialog>` |
| Forms | Controlled inputs with `useState`; validation via pure functions |
| Order IDs | `NOC-XXXX-XXXX` from `crypto.getRandomValues` |
| Deployment | Static host with an SPA fallback |

---

## 3. Resolved Architectural Questions

| # | Question | Decision |
|---|---|---|
| 1 | What state truly needs to be global? | Catalog data and status, cart items, wishlist IDs, the auth user, and toasts. Each is read by many unrelated components (header badge, cards, details, pages) |
| 2 | What belongs in Context? | Only those five. Each context exposes state plus named actions, and persists its own data where applicable (cart, wishlist, session) |
| 3 | What stays local? | Quantity selector, selected gallery image, form values and errors, drawer open flags, search input text before debounce, "placing order" flag, draft price inputs |
| 4 | What is derived, not stored? | Filtered, sorted, paginated lists; cart lines; item count; subtotal; savings; shipping; total; discount percent; wishlist membership; featured and popular selections; active filter chips |
| 5 | What persists in LocalStorage? | Cart, wishlist, recent, orders, users, session. Never filters, UI state, form drafts, passwords, or catalog data |
| 6 | How do cart quantities stay consistent across pages? | One `CartContext` is the only owner of cart state and writes to storage on every change. All pages read through `useCart()`. The cart holds IDs and quantities only, with prices derived from the catalog |
| 7 | How do search, filter, and sort interact? | One query object parsed from the URL. Pipeline: filter by search text → filter by category, price, rating → sort → paginate. Any change except `page` resets `page` to 1 |
| 8 | How does URL routing represent product details? | `/products/:productId` with the stable ID (for example `/products/p-004`). Unknown IDs show a not-found state inside the page |
| 9 | How does checkout receive cart and order information? | `CheckoutPage` reads `useCart().items` and `useCatalog().products`, derives lines and totals with pure utils, and holds the form in local state. Nothing is passed through navigation state |
| 10 | How does confirmation receive the new order? | `CheckoutPage` saves the order through `orderService.saveOrder`, then navigates to `/order-confirmation/:orderId`. The confirmation page reads the order from storage by ID, so it survives refresh |
| 11 | How does recently viewed work? | `ProductDetailsPage` records the visited product ID through `useLocalStorage` in an effect keyed on `productId` (newest first, no duplicates, cap 8). Home and Details read the same key and show up to 4 (excluding the current product). It is not a context |
| 12 | How does the wishlist work? | `WishlistContext` holds an array of IDs (newest first), persisted. `WishlistButton` toggles by ID. The Wishlist page derives products from the catalog |
| 13 | How are loading and empty states represented? | Catalog `status` (`loading`, `ready`, `error`) in `CatalogContext`. `CatalogGate` renders a skeleton or `ErrorState`. Empty states are explicit `EmptyState` renders when a derived list has length 0 |
| 14 | How does responsive behavior affect navigation and filters? | Below 1024px, navigation collapses into a drawer and filters open in a bottom drawer. From 1024px, inline navigation and a persistent filter sidebar |
| 15 | What is delayed until the core flow works? | Everything P1 and P2: wishlist, recently viewed, pagination, auth, reviews, filter chips, and non-cart toasts. Phase 8 is the P0 milestone |

---

## 4. Canonical Reference

This section is the single quick reference. All values match the other documents.

### 4.1 Routes

| Route | Page component | Priority |
|---|---|---|
| `/` | `HomePage` | P0 |
| `/products` | `ProductsPage` | P0 |
| `/products/:productId` | `ProductDetailsPage` | P0 |
| `/cart` | `CartPage` | P0 |
| `/checkout` | `CheckoutPage` | P0 |
| `/order-confirmation/:orderId` | `OrderConfirmationPage` | P0 |
| `*` | `NotFoundPage` | P0 |
| `/wishlist` | `WishlistPage` | P1 |
| `/login` | `LoginPage` | P1 |
| `/signup` | `SignupPage` | P1 |

### 4.2 Query parameters (listing only)

| Param | Values | Default (omitted) |
|---|---|---|
| `q` | trimmed text | empty |
| `category` | `lighting`, `audio`, `desk`, `fragrance`, `sleep` | none (all) |
| `minPrice` | number greater than or equal to 0 | none |
| `maxPrice` | number greater than or equal to 0 | none |
| `rating` | `3` or `4` (minimum rating) | none (any) |
| `sort` | `featured`, `price-asc`, `price-desc`, `rating`, `newest` | `featured` |
| `page` | positive integer | `1` |

### 4.3 Contexts and consumer hooks

| Context | Provider | Hook | Persisted |
|---|---|---|---|
| `CatalogContext` | `CatalogProvider` | `useCatalog` | No |
| `CartContext` | `CartProvider` | `useCart` | Yes (`cart`) |
| `WishlistContext` | `WishlistProvider` | `useWishlist` | Yes (`wishlist`) |
| `AuthContext` | `AuthProvider` | `useAuth` | Yes (`session`; users via service) |
| `ToastContext` | `ToastProvider` | `useToast` | No |

Custom hooks (the only ones allowed): `useLocalStorage`, `useDebounce`, `useDocumentTitle`.

### 4.4 Constants (all in `config/constants.js`)

| Constant | Value |
|---|---|
| `APP_NAME` | `Nocturne` |
| `CURRENCY_CODE` | `USD` |
| `LOCALE` | `en-US` |
| `MAX_CART_QUANTITY` | 10 |
| `SHIPPING_FLAT_FEE` | 6 |
| `FREE_SHIPPING_THRESHOLD` | 75 |
| `PAGE_SIZE` | 12 |
| `SEARCH_DEBOUNCE_MS` | 250 |
| `RECENT_LIMIT` (stored) | 8 |
| `RECENT_DISPLAY_COUNT` | 4 |
| `ORDERS_LIMIT` | 10 |
| `HOME_RAIL_COUNT` | 4 |
| `RELATED_COUNT` | 4 |
| `CATALOG_LATENCY_MS` | 600 |
| `PLACE_ORDER_DELAY_MS` | 800 |
| `TOAST_DURATION_MS` | 3500 |
| `SIMULATE_CATALOG_ERROR` | `false` |
| `BREAKPOINTS` | `{ sm: 640, md: 768, lg: 1024, xl: 1280 }` |
| `STORAGE_KEYS` | `CART`, `WISHLIST`, `RECENT`, `ORDERS`, `USERS`, `SESSION`, `REVIEWS` (see `RULES.md` 5.1) |
| `SORT_OPTIONS` | `featured`, `price-asc`, `price-desc`, `rating`, `newest` with labels: "Featured", "Price: Low to High", "Price: High to Low", "Rating: High to Low", "Newest" |
| `RATING_FILTER_OPTIONS` | Any (none), 4+, 3+ |

---

## 5. Page Architecture

Every page: sets its title with `useDocumentTitle`, renders exactly one `h1`, wraps catalog-dependent content in `CatalogGate`, and handles states in the order loading → error → empty → content.

### 5.1 HomePage (`/`) — P0
- **Responsibility:** compose the discovery experience.
- **Reads:** `useCatalog()` (`products`, `categories`, `promos`), `useLocalStorage` for recent (P1, read-only).
- **Derives:** featured (`selectFeatured`), popular (`selectPopular`, excluding featured IDs), recent products (`selectByIds`).
- **Composition (top to bottom):** `Hero` (promo) → `CategoryTiles` → `ProductRail` Featured → `PromoStrip` → `ProductRail` Popular → `ProductRail` Recently viewed (P1; only rendered when non-empty) → Footer (from `Layout`). The navbar with search is provided by `Layout`.
- **States:** the entire Home content is gated by `CatalogGate` with a skeleton of the hero, tiles, and one rail (categories and promos come from the catalog payload).
- **`h1`:** the hero headline.

### 5.2 ProductsPage (`/products`) — P0
- **Responsibility:** listing, search results, filtering, sorting, pagination.
- **Reads:** `useSearchParams`, `useCatalog()`.
- **Derives:** `query = parseListingParams(searchParams, categories)` → `filtered = filterProducts(...)` → `sorted = sortProducts(...)` → `{ items, page, totalPages, totalCount } = paginate(sorted, query.page, PAGE_SIZE)`; active chips via `getActiveFilterChips`.
- **Local state:** `isFilterDrawerOpen`.
- **Handlers:** `handleFilterChange(partial)`, `handleSortChange`, `handlePageChange`, `handleClearAll`. Each builds new params with `buildListingParams`, resets `page` when anything other than `page` changes, and calls `setSearchParams` (push for deliberate actions; `replace` for live search typing).
- **Composition:** page title area (`h1` "Shop"; or `Results for "term"`), toolbar (result count in a live region, `SortSelect`, "Filters" button below 1024px), `ActiveFilterChips` (P1), `FilterPanel` (sidebar from 1024px; inside `Drawer` below), `ProductGrid` (variant `listing`), `Pagination` (P1).
- **States:** loading → `ProductGrid isLoading`; error → `ErrorState` with Retry; empty (no matches) → `EmptyState` with "Clear all filters and search"; content.

### 5.3 ProductDetailsPage (`/products/:productId`) — P0
- **Responsibility:** present one product and purchase actions.
- **Reads:** `useParams`, `useCatalog()` (`getProductById`, `getReviewsForProduct`), `useLocalStorage` for recent (P1).
- **Local state:** none of its own beyond what children hold (quantity and selected image live in children).
- **Effect (P1):** record the visit: when `product` exists, update the recent list (newest first, unique, capped at `RECENT_LIMIT`). Keyed on `productId`.
- **Composition:** back link to the category listing → two columns from 1024px: `ProductGallery` (with `key={productId}`) and the info column (category label, `h1` name, `Rating`, `PriceDisplay`, description, `ProductPurchasePanel` (with `key={productId}`), `ProductSpecs`) → `ReviewList` (P1) → `ProductRail` Related (`selectRelated`) → `ProductRail` Recently viewed (P1; excludes current product; hidden when empty).
- **States:** loading skeleton (gallery block, lines, button blocks); catalog error; unknown ID → `EmptyState` with `eyebrow="404"`, "We couldn't find that product", link to `/products`.

### 5.4 CartPage (`/cart`) — P0
- **Reads:** `useCart()` (`items`, `increaseQuantity`, `decreaseQuantity`, `removeItem`), `useCatalog()`, `useToast()`.
- **Derives:** `lines = buildCartLines(items, products)`; `totals = calculateTotals(lines)`.
- **Composition:** `h1` "Your cart"; list of `CartLineItem`; `CartSummary` (sticky from 1024px) with a "Checkout" link.
- **States:** if `items.length === 0` → `EmptyState` immediately (no catalog needed); otherwise `CatalogGate` (loading skeleton lines); if `lines.length === 0` after the catalog is ready (all entries stale) → `EmptyState`.
- **Feedback:** removing an item shows a toast ("Removed X from cart").

### 5.5 CheckoutPage (`/checkout`) — P0
- **Reads:** `useCart()`, `useCatalog()`, `useAuth()` (P1, for prefill), `useToast()`, `useNavigate`.
- **Local state:** `values` (form fields), `errors`, `isPlacing`.
- **Guard:** when the catalog is ready and `lines.length === 0` and `isPlacing` is false → `<Navigate to="/cart" replace />`.
- **Flow:** see section 11.8.
- **Composition:** `h1` "Checkout"; note "This is a demo checkout. No payment is taken."; `CheckoutForm` (error summary, `ContactFields`, `AddressFields`, Place order button with the total shown beside it); `OrderSummary` (sticky from 1024px).
- **States:** loading skeleton; error; empty-cart redirect; content.

### 5.6 OrderConfirmationPage (`/order-confirmation/:orderId`) — P0
- **Reads:** `useParams`, `orderService.getOrderById` (through the page, since `orderService` is a service the page may call via a util-style read; see 11.9).
- **Composition:** `h1` "Order confirmed"; order ID in mono; placed date and status; customer, contact, and address snapshot; `OrderSummary` (from `order.items` and `order.totals`); "Continue shopping" link to `/products`; a note that this is a demo order.
- **States:** unknown or invalid ID → `EmptyState` with `eyebrow="404"` and a link to `/`. No catalog dependency (the order is a snapshot), so no `CatalogGate`.
- **Page focus:** on mount, move focus to the `h1` (`tabIndex={-1}`) so assistive technology announces the confirmation.

### 5.7 WishlistPage (`/wishlist`) — P1
- **Reads:** `useWishlist()`, `useCatalog()`. **Derives:** `selectByIds(wishlistIds, products)`.
- **Composition:** `h1` "Your wishlist"; `ProductGrid` (variant `listing`), with each card showing the active heart (which removes it).
- **States:** loading; error; empty → `EmptyState` "Nothing saved yet" with a "Browse products" action.

### 5.8 LoginPage (`/login`) and SignupPage (`/signup`) — P1
- **Composition:** `Container` (narrow) with `h1`, the form component, and a link to the other page. A visible note: "Demo only — no real account is created and passwords are not stored."
- **Behavior:** if `isAuthenticated`, redirect to `/`. On success, navigate to `location.state?.from?.pathname` (if provided) or `/` with `replace: true`.

### 5.9 NotFoundPage (`*`) — P0
- `EmptyState` with `eyebrow="404"`, a friendly message, and a link to `/`.

---

## 6. Component Architecture

Every component lives in `src/components/<domain>/` as `Name.jsx` plus `Name.module.css`. Sizes are guidelines: keep each under about 150 lines. Props listed are the contract.

### 6.1 Global components (app root)
| Component | Notes |
|---|---|
| `App` (`App.jsx`) | The route table only. All pages inside `<Route element={<Layout />}>` |
| `main.jsx` | Renders `BrowserRouter` and the provider nest: `ToastProvider` → `CatalogProvider` → `CartProvider` → `WishlistProvider` (P1) → `AuthProvider` (P1) → `App`. Order does not matter functionally because contexts do not import each other |

### 6.2 Layout components (`components/layout/`)
| Component | Props | Responsibility |
|---|---|---|
| `Layout` | none | `SkipLink`, `ScrollToTop`, `Navbar`, `<main id="main-content">` with `Outlet`, `Footer`, `ToastViewport` |
| `SkipLink` | none | First focusable element; jumps to `#main-content` |
| `Navbar` | none | Sticky glass header. Brand link, `NavLink`s (Home, Shop), `SearchBar`, wishlist link (P1), `AccountLinks` (P1), `CartLink`, menu button. Local state: `isMenuOpen`, `isSearchOpen` (mobile search row). Below 1024px, links live in `MobileMenu` |
| `SearchBar` | `onSearched` (optional; closes the mobile row) | **The only URL-aware component.** Local `inputValue`. Behavior in 11.1 |
| `MobileMenu` | `isOpen`, `onClose` | `Drawer` (right) containing nav links, wishlist and account links |
| `CartLink` | none | Link to `/cart` with item-count badge from `useCart().totalItems`; `aria-label` like "Cart, 3 items" |
| `Footer` | none | Brand, tagline, link groups (Shop by category links, Customer links), copyright. Only valid links |
| `ScrollToTop` | none | Scrolls to top on pathname change (not on query-only changes to `/products`) |
| `ToastViewport` | none | Reads `useToast()`; renders toasts in a `role="status"` region |
| `CatalogGate` | `fallback` (node), `children` | `loading` → `fallback`; `error` → `ErrorState` with `reload`; `ready` → `children` |

### 6.3 Shared UI components (`components/ui/`)
| Component | Props | Notes |
|---|---|---|
| `Button` | `variant` (`primary`, `secondary`, `ghost`, `danger`), `size`, `isLoading`, `fullWidth`, `to` (renders a `Link`), `leadingIcon`, native button props | One button for the whole app |
| `IconButton` | `label` (required, becomes `aria-label`), `icon`, `onClick`, native props | 44px hit area |
| `Container` | `size` (`narrow`, `content`, `wide`), `children` | Applies max width and gutters |
| `Badge` | `variant` (`discount`, `tag`), `children` | |
| `Chip` | `label`, `onRemove` (optional), `isActive` | Filter chips (P1) |
| `Rating` | `value`, `reviewCount`, `size` | Five stars (rounded to nearest whole star), numeric value, count, and visually hidden text "Rated X out of 5 from N reviews" |
| `Skeleton` | `width`, `height`, `radius` | Shimmer primitive |
| `EmptyState` | `eyebrow`, `title`, `message`, `actionLabel`, `actionTo`, `onAction`, `icon` | One component for empty and not-found |
| `ErrorState` | `title`, `message`, `onRetry` | Retry button when `onRetry` is given |
| `Drawer` | `isOpen`, `onClose`, `title`, `side` (`right`, `bottom`), `footer`, `children` | Native `<dialog>` with `showModal()`; closes on Escape and backdrop click; returns focus to the opener |
| `QuantityStepper` | `quantity`, `min`, `max`, `onIncrease`, `onDecrease`, `itemName` | Minus disabled at min, plus disabled at max; quantity in a live region |
| `TextField` | `id`, `label`, `type`, `value`, `onChange`, `error`, `helperText`, `autoComplete`, `required`, `inputMode` | Label, input, error message with `aria-describedby` and `aria-invalid` |
| `SelectField` | `id`, `label`, `value`, `onChange`, `options` | Native select; used by `SortSelect` |
| `Pagination` (P1) | `page`, `totalPages`, `onPageChange` | Prev, numbered buttons, next; `aria-current="page"`. Max 3 pages with the seed catalog, so no ellipsis logic |
| `SectionHeading` | `eyebrow`, `title`, `actionLabel`, `actionTo` | Mono eyebrow plus display title plus optional "View all" link |

### 6.4 Product components (`components/product/`)
| Component | Props | Notes |
|---|---|---|
| `ProductCard` | `product` | Image (link), category label, name (link), `Rating`, `PriceDisplay`, `AddToCartButton`, `WishlistButton` (P1). One card for the entire app |
| `ProductCardSkeleton` | none | Same dimensions as `ProductCard`, built from `Skeleton` |
| `ProductGrid` | `products`, `variant` (`listing`, `rail`), `isLoading`, `skeletonCount` | `listing`: 2 columns below 640, 3 from 640. `rail`: 2 columns below 768, 4 from 768 |
| `ProductImage` | `src`, `alt`, `ratio`, `isPriority` | Reserved ratio, muted background, `loading="lazy"` unless `isPriority`, graceful fallback on error |
| `PriceDisplay` | `price`, `originalPrice`, `size` | Price, struck-through original price, discount badge from `getDiscountPercent` (only when discounted) |
| `AddToCartButton` | `productId`, `productName`, `quantity` (default 1), `variant`, `fullWidth` | Calls `addItem` then `showToast` (success or limit-reached) |
| `WishlistButton` (P1) | `productId`, `productName` | `aria-pressed` toggle; label "Add X to wishlist" or "Remove X from wishlist" |
| `ProductGallery` | `images`, `productName` | Local state `selectedIndex`. Main image plus thumbnail buttons (`aria-pressed` or `aria-current`). Parent gives it `key={productId}` |
| `ProductPurchasePanel` | `product` | Local state `quantity`. `QuantityStepper`, `AddToCartButton`, "Buy now" button (adds then navigates to `/checkout`), `WishlistButton` (P1). Parent gives it `key={productId}` |
| `ProductSpecs` | `specifications` | `dl` or table of label and value pairs (labels in mono) |

### 6.5 Listing components (`components/listing/`)
| Component | Props | Notes |
|---|---|---|
| `FilterPanel` | `categories`, `filters` (`category`, `minPrice`, `maxPrice`, `rating`), `onChange(partial)`, `onClear`, `hasActiveFilters` | Presentational. Category radio group (with "All"), price min and max inputs (local draft state, committed on Enter or blur), rating radio group (Any, 4+, 3+) |
| `SortSelect` | `value`, `onChange` | Built on `SelectField` using `SORT_OPTIONS` |
| `ActiveFilterChips` (P1) | `chips` (array of `{ key, label }`), `onRemove(key)`, `onClearAll` | Removable chips plus "Clear all" |

### 6.6 Home components (`components/home/`)
| Component | Props | Notes |
|---|---|---|
| `Hero` | `promo` | Display headline, body, primary and secondary calls to action, ambient amber glow, glass panel |
| `CategoryTiles` | `categories` | Grid of `CategoryTile` (2 columns mobile, 5 from 768) |
| `CategoryTile` | `category` | Link to `/products?category=<id>`; Lucide icon per category (Lighting: `Lamp`, Audio: `Speaker`, Desk: `PenTool`, Fragrance: `Flame`, Sleep: `Moon`); name and short description |
| `PromoStrip` | `promo` | Secondary promotional band (for example "The Sleep Edit" linking to `/products?category=sleep`) |
| `ProductRail` | `title`, `eyebrow`, `products`, `viewAllTo` | `SectionHeading` plus `ProductGrid variant="rail"`. Used for Featured, Popular, Related, Recently viewed |

### 6.7 Cart components (`components/cart/`)
| Component | Props | Notes |
|---|---|---|
| `CartLineItem` | `line`, `onIncrease`, `onDecrease`, `onRemove` | Image link, name link, unit price, `QuantityStepper`, line total, labeled Remove button ("Remove Aurora Lamp from cart") |
| `CartSummary` | `totals` | Heading, `TotalsList`, "Checkout" `Button` link, "Continue shopping" link |
| `TotalsList` | `totals` | Rows: Items, Subtotal, Savings (only when greater than 0), Shipping ("Free" when 0), Total. Used by `CartSummary` and `OrderSummary` |

### 6.8 Checkout components (`components/checkout/`)
| Component | Props | Notes |
|---|---|---|
| `CheckoutForm` | `values`, `errors`, `onChange`, `onSubmit`, `isPlacing`, `total` | `<form noValidate>`; error summary (`role="alert"`, links to fields); `ContactFields`, `AddressFields`; Place order `Button` (`isLoading` shows "Placing order…") |
| `ContactFields` | `values`, `errors`, `onChange` | Full name, email, phone |
| `AddressFields` | `values`, `errors`, `onChange` | Address line 1, line 2 (optional), city, state or region, postal code, country |
| `OrderSummary` | `items`, `totals`, `title` | Compact item list (thumbnail, name, quantity, line total) plus `TotalsList`. Used by Checkout and Confirmation |

### 6.9 Authentication components (`components/auth/`) — P1
| Component | Props | Notes |
|---|---|---|
| `LoginForm` | `onSuccess` | Local state; calls `useAuth().login`; shows inline error; toast on success |
| `SignupForm` | `onSuccess` | Local state; calls `useAuth().signup`; name, email, password (minimum 6 characters, never stored) |
| `AccountLinks` | `variant` (`inline`, `drawer`) | Logged out: "Log in" and "Sign up" links (the Log in link passes `state={{ from: location }}`). Logged in: "Hi, {first name}" and a "Log out" button |

### 6.10 Feature-specific components
| Component | Folder | Props | Notes |
|---|---|---|---|
| `ReviewList` (P1) | `components/reviews/` | `reviews` | Each review: author, `Rating`, date (via `formatDate`), title, body. Empty list → "No reviews yet" |

---

## 7. Data Architecture

All data shapes are documented in comments in the data files. IDs are strings. Money is a plain number (major units, two decimals maximum).

### 7.1 Catalog content theme and seed requirements

**Theme:** objects for evening and night-time living. **Categories:** `lighting` (Lighting), `audio` (Audio), `desk` (Desk), `fragrance` (Fragrance), `sleep` (Sleep).

**Seed requirements** (also in `RULES.md` section 6): 30 products, 6 per category; at least 4 featured; at least 4 popular that are not featured; at least 6 with an `originalPrice`; distinct `createdAt` values spread over roughly nine months, deliberately not in ID order, so "Newest" visibly reorders; each product has 1 to 4 images, 4 to 6 specification rows, and a 2-to-3 sentence description.

**Suggested seed (the implementer may adjust names and prices but must satisfy the requirements):**

| ID | Name | Category | Price | Original | Flags |
|---|---|---|---|---|---|
| p-001 | Aurora Desk Lamp | lighting | 89.00 | 119.00 | featured |
| p-002 | Ember Table Lantern | lighting | 64.00 | | popular |
| p-003 | Halo Floor Light | lighting | 149.00 | | featured |
| p-004 | Dusk Smart Bulb Set | lighting | 39.00 | 49.00 | popular |
| p-005 | Lumen Wall Sconce | lighting | 72.00 | | |
| p-006 | Glow Cube Night Light | lighting | 29.00 | | popular |
| p-007 | Resonance Bookshelf Speaker | audio | 179.00 | 219.00 | featured |
| p-008 | Murmur Portable Speaker | audio | 99.00 | | popular |
| p-009 | Velvet Over-Ear Headphones | audio | 199.00 | | featured |
| p-010 | Hush Wireless Earbuds | audio | 129.00 | 159.00 | popular |
| p-011 | Vinyl Drift Turntable | audio | 249.00 | | |
| p-012 | Echo Mini Soundbar | audio | 139.00 | | |
| p-013 | Slate Desk Mat | desk | 35.00 | | popular |
| p-014 | Monolith Monitor Stand | desk | 59.00 | | |
| p-015 | Brass Pen Tray | desk | 28.00 | 36.00 | |
| p-016 | Orbit Wireless Charger | desk | 45.00 | | popular |
| p-017 | Folio Leather Organizer | desk | 54.00 | | featured |
| p-018 | Atlas Cable Dock | desk | 24.00 | | |
| p-019 | Midnight Cedar Candle | fragrance | 34.00 | | popular |
| p-020 | Amber Reed Diffuser | fragrance | 42.00 | 52.00 | featured |
| p-021 | Smoked Vanilla Candle | fragrance | 36.00 | | popular |
| p-022 | Night Bloom Room Spray | fragrance | 22.00 | | |
| p-023 | Ceramic Incense Holder | fragrance | 26.00 | | |
| p-024 | Ash and Sandalwood Discovery Set | fragrance | 58.00 | 72.00 | |
| p-025 | Lull Linen Pillowcase Set | sleep | 68.00 | | |
| p-026 | Weighted Calm Blanket | sleep | 129.00 | 159.00 | popular |
| p-027 | Moonlit Silk Sleep Mask | sleep | 32.00 | | popular |
| p-028 | Drift Sunrise Alarm Clock | sleep | 79.00 | | featured |
| p-029 | Quiet Hours White Noise Machine | sleep | 59.00 | 74.00 | |
| p-030 | Slumber Herbal Pillow Mist | sleep | 19.00 | | |

**Images:** default is remote stock photo URLs (verify each resolves before committing). `ProductImage` falls back to a muted surface with an icon on error. The offline alternative is bundled images in `public/images/products/` (see `CURRENT_STATE.md` Pending Decisions).

### 7.2 Product model

| Field | Type | Notes and justification |
|---|---|---|
| `id` | string | `p-001` to `p-030`. Stable join key for everything |
| `name` | string | Display name |
| `category` | string | Category ID (`lighting`, and so on) |
| `price` | number | Current selling price |
| `originalPrice` | number or null | Pre-discount price; `null` when not discounted |
| `rating` | number | 0 to 5, one decimal. Seeded, not recomputed from reviews |
| `reviewCount` | integer | Seeded; may exceed the number of seeded sample reviews |
| `images` | string[] | 1 to 4 URLs. Alt text is generated from the product name plus the view number |
| `description` | string | 2 to 3 sentences |
| `specifications` | array of `{ label, value }` | An array (not an object) so rows keep a stable order and can be rendered with `map` |
| `createdAt` | string | ISO 8601; drives "Newest" |
| `featured` | boolean | Drives the Home Featured rail |
| `popular` | boolean | Drives the Home Popular rail |

**Deliberately not stored:** `discount` (derived: `round((originalPrice - price) / originalPrice * 100)` when `originalPrice > price`, otherwise 0), stock, slug, brand, tags, "new" flag.

Pseudocode example:
```
{ id: "p-001", name: "Aurora Desk Lamp", category: "lighting", price: 89, originalPrice: 119,
  rating: 4.6, reviewCount: 128, images: ["…"], description: "…",
  specifications: [{ label: "Material", value: "Brushed aluminium" }],
  createdAt: "2026-03-14T00:00:00.000Z", featured: true, popular: false }
```

### 7.3 Category model
`{ id, name, description }` — five entries. Icons are mapped by ID inside `CategoryTile` (data files never import React).

### 7.4 Review model (seeded; P1)
`{ id, productId, author, rating (integer 1 to 5), title, body, createdAt (ISO) }`. Not every product has reviews. Fetched via `useCatalog().getReviewsForProduct(productId)`, newest first. User-submitted reviews are P2 (`STORAGE_KEYS.REVIEWS`).

### 7.5 Promo model
`{ id, eyebrow, title, body, ctaLabel, ctaTo, secondaryLabel (optional), secondaryTo (optional) }`. Two entries: `hero` and `strip`. All `to` values must be valid listing URLs.

### 7.6 Cart item (stored)
`{ productId: string, quantity: integer 1..10 }`. Nothing else.

### 7.7 Cart line (derived view, also the shape of order items)
`{ productId, name, image, unitPrice, originalUnitPrice (number or null), quantity, lineTotal }`. `lineTotal = roundMoney(unitPrice * quantity)`. `buildCartLines(items, products)` skips entries whose product does not exist.

### 7.8 Totals (derived)
`{ itemCount, subtotal, savings, shipping, total }`
- `itemCount` = sum of quantities.
- `subtotal` = sum of `lineTotal` (current selling prices).
- `savings` = sum of `(originalUnitPrice - unitPrice) * quantity` for discounted lines (informational; not subtracted again).
- `shipping` = 0 when `subtotal` is 0 or at least `FREE_SHIPPING_THRESHOLD`; otherwise `SHIPPING_FLAT_FEE`.
- `total` = `roundMoney(subtotal + shipping)`.

### 7.9 Wishlist model
Stored: array of product ID strings, newest first, no duplicates. Derived: products via `selectByIds`.

### 7.10 Recently viewed model
Stored: array of product ID strings, newest first, no duplicates, maximum `RECENT_LIMIT` (8). Displayed: up to `RECENT_DISPLAY_COUNT` (4), excluding the current product on Details.

### 7.11 User and auth model
- Users (stored list): `{ id, name, email (lowercase), createdAt }`. **No password is stored.**
- Session (stored): `{ id, name, email }` or key absent.
- Rules: signup requires name (2+ characters), valid email, and a password of at least 6 characters (checked, then discarded); a duplicate email returns `{ ok: false, error }`. Login requires a registered email and any non-empty password. This is a labeled demo.

### 7.12 Order model (snapshot)
```
{
  id: "NOC-7K2M-9QXD",
  createdAt: ISO string,
  status: "confirmed",
  userId: string or null,
  customer: { fullName, email, phone },
  address: { line1, line2, city, region, postalCode, country },
  items: [ cart-line shape: productId, name, image, unitPrice, originalUnitPrice, quantity, lineTotal ],
  totals: { itemCount, subtotal, savings, shipping, total }
}
```
Stored newest first, capped at `ORDERS_LIMIT`. Order IDs match `^NOC-[A-Z0-9]{4}-[A-Z0-9]{4}$` using an alphabet without 0, O, 1, I, L. `generateOrderId(existingIds)` regenerates on collision.

### 7.13 Utils and services reference (function contracts)

| File | Functions |
|---|---|
| `utils/storage.js` | `readJSON(key, fallback, validator)`, `writeJSON(key, value)` (null removes the key), `removeKey(key)`. All wrapped in try and catch |
| `utils/pricing.js` | `roundMoney`, `getDiscountPercent(product)`, `calculateLineTotal`, `calculateShipping(subtotal)`, `calculateTotals(lines)` |
| `utils/format.js` | `formatPrice(amount)` (uses `Intl.NumberFormat` with `LOCALE` and `CURRENCY_CODE`), `formatDate(iso)`, `formatRatingText(value, count)` |
| `utils/cart.js` | `buildCartLines(items, products)`, `clampQuantity(value)` |
| `utils/selectors.js` | `selectFeatured(products, count)`, `selectPopular(products, excludeIds, count)`, `selectRelated(product, products, count)`, `selectByIds(ids, products)` (preserves the order of `ids`) |
| `utils/listingQuery.js` | `DEFAULT_QUERY`, `parseListingParams(searchParams, categories)`, `buildListingParams(query)`, `filterProducts(products, query, categories)`, `sortProducts(products, sort)`, `paginate(items, page, pageSize)`, `getActiveFilterChips(query, categories)` |
| `utils/validators.js` | `validateCheckoutForm`, `validateLoginForm`, `validateSignupForm`, plus storage-shape validators (`isValidCartItems`, `isValidIdList`, `isValidOrders`, `isValidUsers`, `isValidSession`) |
| `utils/orders.js` | `generateOrderId(existingIds)`, `isValidOrderId(id)`, `buildOrder({ values, lines, totals, userId })` |
| `services/catalogService.js` | `loadCatalog()` returns a Promise of `{ products, categories, reviews, promos }` after `CATALOG_LATENCY_MS`; rejects when `SIMULATE_CATALOG_ERROR` is true |
| `services/orderService.js` | `saveOrder(order)`, `getOrderById(id)`, `getOrders()` (all through `utils/storage.js`) |
| `services/authService.js` | `registerUser({ name, email })`, `findUserByEmail(email)` |

**Checkout validation rules (`validateCheckoutForm`):** full name required (2+ characters); email required and valid format; phone required, 7 to 15 digits after removing spaces, dashes, parentheses, and a leading plus; address line 1 required; city required; region required; postal code required (3 to 10 letters, digits, spaces, or dashes); country required; address line 2 optional. Messages are plain and specific ("Enter a valid email address").

---

## 8. State Architecture

| Category | Contents | Owner |
|---|---|---|
| **Context state** | catalog `{ status, error, products, categories, reviews, promos }`; cart `items`; wishlist `wishlistIds`; auth `user`; toasts `toasts` | The five providers |
| **Local state** | gallery `selectedIndex`; purchase `quantity`; checkout `values`, `errors`, `isPlacing`; login and signup form values, errors, `isSubmitting`; `SearchBar` `inputValue`; `Navbar` `isMenuOpen`, `isSearchOpen`; `ProductsPage` `isFilterDrawerOpen`; `FilterPanel` draft min and max price | The owning component |
| **URL state** | `q`, `category`, `minPrice`, `maxPrice`, `rating`, `sort`, `page` | `ProductsPage` (and `SearchBar` for `q`) |
| **Derived state** | filtered, sorted, paginated products; cart lines; totals; `totalItems` (inside `CartProvider`); discount percent; wishlist membership; featured, popular, related selections; active chips; result counts | Computed during render using pure utils |
| **Persistent state** | `cart`, `wishlist`, `recent`, `orders`, `users`, `session` | LocalStorage through the util and hook |

---

## 9. Context Architecture

Each context file exports its Provider and consumer hook. The hook throws if used outside its Provider. No context imports another.

### 9.1 CatalogContext
- **State:** `status` (`loading`, `ready`, `error`), `error`, `products`, `categories`, `reviews`, `promos`.
- **Actions and selectors:** `reload()`, `getProductById(id)` (uses `find`), `getReviewsForProduct(id)`.
- **Behavior:** an effect calls `catalogService.loadCatalog()` on mount and on `reload`. A cancel flag ignores stale results (Strict Mode safe). Not persisted.
- **Consumers:** every catalog-dependent page and `CatalogGate`.

### 9.2 CartContext
- **State:** `items` (hydrated from `STORAGE_KEYS.CART` with `isValidCartItems`, written in an effect).
- **Derived:** `totalItems` (sum of quantities).
- **Actions:**
  - `addItem(productId, quantity = 1)` returns `{ status: "added" | "limit-reached" }`; clamps the result to `MAX_CART_QUANTITY`. Status is computed from the current snapshot for feedback; the state update itself uses a functional update.
  - `removeItem(productId)`.
  - `increaseQuantity(productId)` (clamped to 10) and `decreaseQuantity(productId)` (never below 1; removal is explicit).
  - `clearCart()`.
- **Consumers:** `CartLink`, `AddToCartButton`, `ProductPurchasePanel`, `CartPage`, `CheckoutPage`.

### 9.3 WishlistContext (P1)
- **State:** `wishlistIds` (persisted, newest first). **Derived:** `wishlistCount`.
- **Actions:** `toggleWishlist(productId)` returns the new state (`true` if added); `isWishlisted(productId)`.
- **Consumers:** `WishlistButton`, `WishlistPage`, `Navbar`.

### 9.4 AuthContext (P1)
- **State:** `user` (session, persisted); **derived:** `isAuthenticated`.
- **Actions:** `signup({ name, email, password })` and `login({ email, password })` both return `{ ok: true }` or `{ ok: false, error }` after a short simulated delay; `logout()`.
- **Consumers:** `AccountLinks`, `LoginForm`, `SignupForm`, `LoginPage`, `SignupPage`, `CheckoutPage`.

### 9.5 ToastContext
- **State:** `toasts` (array of `{ id, message, type }`).
- **Actions:** `showToast(message, { type = "success" } = {})`, `dismissToast(id)`.
- **Behavior:** each toast item sets a timer for `TOAST_DURATION_MS` and cleans it up on unmount. Not persisted. The viewport is a polite live region and doubles as the screen reader announcement channel for cart changes.
- **Consumers:** `AddToCartButton`, `ProductPurchasePanel`, `CartPage`, `WishlistButton`, `LoginForm`, `SignupForm`, `AccountLinks`, `CheckoutPage`, `ToastViewport`.

---

## 10. Routing Architecture

- `main.jsx`: `BrowserRouter` wraps the providers and `App`.
- `App.jsx`: a single `Routes` block; one parent route with `element={<Layout />}` and child routes from section 4.1.
- `Layout` renders `<Outlet />` inside `<main id="main-content">`.
- Path parameters: `:productId`, `:orderId`. Query parameters: only on `/products`.
- Programmatic navigation: submit search from non-listing pages (`/products?q=...`); Buy now (`/checkout`); after placing an order (`/order-confirmation/:orderId`, `replace`); after login or signup (`replace`).
- Guards: `CheckoutPage` redirects to `/cart` when empty; Login and Signup redirect to `/` when authenticated. No other guards.
- `NavLink` provides active states for Home and Shop. The Shop link is active for `/products` and `/products/:productId`.

---

## 11. Flows

### 11.1 Search flow
1. `SearchBar` keeps local `inputValue`, initialized from the URL `q` when on `/products`.
2. **On `/products`:** `useDebounce(inputValue, SEARCH_DEBOUNCE_MS)`. When the debounced, trimmed value differs from the URL `q`, update the URL with `setSearchParams` (keep other params, remove `page`, `replace: true`). Clearing the input removes `q`.
3. **External changes win:** when the URL `q` changes from outside the input (Back button, "Clear all", chip removal), update `inputValue` to match. To avoid loops and overwriting mid-typing, remember the last value this component wrote (in a ref) and sync only when the URL value differs from it.
4. **Off `/products`:** typing only updates `inputValue`. Submit (Enter or the search button) navigates to `/products?q=<trimmed>`. An empty submit navigates to `/products`.
5. **Matching:** `filterProducts` lowercases and trims the query and matches product `name`, with the category name as a secondary match.
6. Mobile: the search icon toggles a search row beneath the header; a successful submit closes it.

### 11.2 Filtering flow
1. `ProductsPage` parses the URL into `query` using `parseListingParams`, which validates every value (unknown category ignored; negative or non-numeric prices ignored; `minPrice` greater than `maxPrice` swapped; `rating` other than 3 or 4 ignored).
2. `filterProducts` applies, in order: search text, category, price range (on `price`), minimum rating (on `rating`).
3. `FilterPanel` reports changes through `onChange(partial)`. Category and rating apply immediately. Price inputs are local drafts committed on Enter or blur.
4. The page rebuilds params through `buildListingParams` (defaults omitted) and resets `page`.
5. The result count is announced in a polite live region ("12 products found").

### 11.3 Sorting flow
`sortProducts` sorts a copy.

| Sort | Order |
|---|---|
| `featured` (default) | `featured` products first, then by `rating` descending, then by name |
| `price-asc` | `price` ascending, ties by name |
| `price-desc` | `price` descending, ties by name |
| `rating` | `rating` descending, ties by `reviewCount` descending |
| `newest` | `createdAt` descending |

### 11.4 Pagination flow (P1)
`paginate(items, page, PAGE_SIZE)` clamps `page` to `[1, totalPages]` and returns `{ items, page, totalPages, totalCount }`. Before Phase 4b all results display. `Pagination` calls `onPageChange(n)`; the page updates the `page` param and moves focus or scroll to the top of the results. Changing any filter, sort, or search resets `page`. Pagination is hidden when `totalPages` is 1.

### 11.5 Cart flow
1. Add: `AddToCartButton` → `addItem(productId, quantity)` → toast ("Aurora Desk Lamp added to cart" or "Limit of 10 per item reached"). The header badge updates immediately.
2. The cart page derives lines and totals every render. Increase and decrease update quantities within 1 to 10 (buttons disabled at the limits). Remove deletes the line and shows a toast.
3. Every cart change is persisted by an effect in `CartProvider`.

### 11.6 Wishlist flow (P1)
Heart toggles `toggleWishlist(productId)`. The heart state is read from `isWishlisted`, so cards, details, and the Wishlist page always agree. A toast confirms. The Wishlist page lists derived products; cards there offer Add to cart.

### 11.7 Recently viewed flow (P1)
1. `ProductDetailsPage` has `const [recent, setRecent] = useLocalStorage(STORAGE_KEYS.RECENT, [], isValidIdList)`.
2. An effect keyed on `productId` (only when the product exists) calls `setRecent(prev => [productId, ...prev.filter(id => id !== productId)].slice(0, RECENT_LIMIT))`.
3. The Details rail shows `selectByIds(recent.filter(id => id !== productId), products)` limited to `RECENT_DISPLAY_COUNT`. Home reads the same key and shows up to the same count. Empty means the section is not rendered.

### 11.8 Checkout flow
1. Guard: ready catalog and no lines and not `isPlacing` → redirect to `/cart` (`replace`).
2. Initial `values`: empty, except `fullName` and `email` prefilled from `useAuth().user` when available.
3. Submit: `preventDefault` → `errors = validateCheckoutForm(values)`. If errors exist: set errors, show the error summary, announce, and focus the first invalid field. Stop.
4. Otherwise: `isPlacing = true`; wait `PLACE_ORDER_DELAY_MS` using a timer cleaned up on unmount.
5. Then: `order = buildOrder({ values, lines, totals, userId })` → `orderService.saveOrder(order)` → `clearCart()` → `navigate("/order-confirmation/" + order.id, { replace: true })`.
6. The empty-cart redirect guard is skipped while `isPlacing` is true so clearing the cart cannot race the navigation.

### 11.9 Order confirmation flow
`OrderConfirmationPage` validates `orderId` with `isValidOrderId`, then reads the order with `orderService.getOrderById(orderId)` (a synchronous storage read, cheap enough to run during render). If missing or invalid → not-found `EmptyState`. Otherwise show the confirmation. Because it reads from storage by ID, a refresh keeps the page. Focus moves to the `h1` on mount.

### 11.10 LocalStorage flow
- `useLocalStorage(key, defaultValue, validator)`: lazy initial state from `readJSON`; an effect writes on change via `writeJSON`; a `null` value removes the key; the setter supports functional updates.
- `readJSON`: missing → default; parse error or `validator` failure → remove key and return default; storage exceptions caught and logged in development only.
- Used by: `CartProvider` (cart), `WishlistProvider` (wishlist), `AuthProvider` (session), `ProductDetailsPage` and `HomePage` (recent). `orderService` and `authService` use `readJSON` and `writeJSON` directly for orders and users.
- No cross-tab sync in v1 (P2).

### 11.11 Loading, error, and empty flow
- `CatalogProvider` starts `loading`, then `ready` or `error`.
- `CatalogGate` handles loading and error for pages. `Retry` calls `reload()`.
- Individual lists check `length === 0` after content is ready and render an `EmptyState` with a next action.
- Skeletons mirror final layout (`ProductCardSkeleton` count equals the expected number of cards: 4 for rails, `PAGE_SIZE` for the listing).
- To test the error state, set `SIMULATE_CATALOG_ERROR` to `true` temporarily.

---

## 12. Responsive Behavior

| Area | Below 640 | 640 to 767 | 768 to 1023 | 1024 and above |
|---|---|---|---|---|
| Navigation | Brand, search icon, wishlist and account in drawer, cart link, menu button | Same | Same | Inline links, inline search field, account and wishlist links, cart link |
| Search | Icon toggles a row beneath the header | Same | Same | Inline field in the header |
| Listing grid | 2 columns | 3 columns | 3 columns | 3 columns next to a 260px sidebar |
| Filters | Bottom drawer from a "Filters" button | Same | Same | Persistent sticky sidebar |
| Home rails (and Related, Recent) | 2 columns | 2 columns | 4 columns | 4 columns |
| Category tiles | 2 columns | 3 columns | 5 columns | 5 columns |
| Product details | Single column; gallery then info | Same | Same | Two columns (gallery left, info right) |
| Cart and checkout | Single column; summary below the list or form | Same | Same | Two columns; sticky summary on the right |
| Footer | Stacked | 2 columns | 4 columns | 4 columns |
| Container width | Full minus gutter | Same | Content max | Content or wide max |

Touch targets are at least 44px. No horizontal scroll at any width. See `DESIGN_TOKENS.md` for gutters, spacing, and breakpoints.

---

## 13. Accessibility Requirements

All items in `PRD.md` section 18 and `RULES.md` section 9 apply. Component-specific requirements:

| Component | Requirement |
|---|---|
| `Layout` | Skip link first; landmarks `header`, `nav`, `main`, `footer`; one `h1` per page |
| `SearchBar` | `role="search"` form; labeled input; result count announced on `/products` |
| `CartLink` | Accessible name includes the count ("Cart, 3 items") |
| `Drawer` | Native `<dialog>`, labeled by its title, Escape and backdrop close, focus returns to the trigger |
| `ProductCard` | Image and name are links with meaningful text; the whole card does not need to be a single link; buttons have product-specific labels |
| `Rating` | Visually hidden text "Rated 4.5 out of 5 from 128 reviews"; stars are `aria-hidden` |
| `FilterPanel` | Radio groups in `fieldset` with `legend`; price inputs have labels and numeric input mode |
| `QuantityStepper` | Buttons labeled "Decrease quantity of X" and "Increase quantity of X"; current quantity in a polite live region; disabled state at limits |
| `CartLineItem` | Remove button labeled "Remove X from cart" |
| `CheckoutForm` | `noValidate` with custom messages; error summary with `role="alert"` and links to fields; first invalid field focused |
| `TextField` | Label linked by `htmlFor`; `aria-invalid`; error linked by `aria-describedby`; correct `autocomplete` values |
| `ToastViewport` | `role="status"` polite live region; toasts not the only way to see the result |
| `Pagination` | `nav` labeled "Pagination"; `aria-current="page"` |
| `EmptyState` and `ErrorState` | Heading plus action; error state has `role="alert"` |
| Motion | `prefers-reduced-motion` disables shimmer, slides, lifts, and image scales |

---

## 14. Component Relationships

```
main.jsx
└─ BrowserRouter
   └─ ToastProvider → CatalogProvider → CartProvider → WishlistProvider → AuthProvider
      └─ App (route table)
         └─ Layout
            ├─ SkipLink, ScrollToTop
            ├─ Navbar → SearchBar, CartLink, AccountLinks, MobileMenu (Drawer)
            ├─ <Outlet/> → Page
            │    └─ CatalogGate → page content
            ├─ Footer
            └─ ToastViewport
```

**Communication rules**
- **Down:** pages and parents pass data as props (`product`, `lines`, `totals`, `values`, `errors`).
- **Up:** children call `onX` callbacks (`onChange`, `onIncrease`, `onPageChange`). Pages own the resulting state change.
- **Sideways (shared state):** components call context hooks (`useCart`, `useWishlist`, `useToast`). Leaf components such as `AddToCartButton` and `WishlistButton` call contexts directly because they are used in many places, which avoids prop drilling.
- **URL:** `ProductsPage` is the only reader and writer of listing params; `SearchBar` is the only other URL-aware component and touches only `q` and `page`.
- **Contexts never call each other.** `AddToCartButton` coordinates cart plus toast. `CheckoutPage` coordinates cart, orders, auth, and navigation.
- **Data access:** only `CatalogProvider` calls `catalogService`. Components never import `data/`.

---

## 15. React Concepts Mapped to Natural Use

| Concept | Where it is genuinely needed |
|---|---|
| Components | Reusable `ProductCard` appears in five places; one `Button`; one `EmptyState` |
| Props | `ProductCard product`, `CartLineItem line`, `Rating value`, `FilterPanel filters` |
| State | Quantity stepper, gallery image, form values and errors, drawer open flags, search input |
| Events | Add to cart, quantity buttons, form submit and change, filter controls, search typing, thumbnail clicks |
| Conditional rendering | Discount badge only when discounted; loading, error, empty, content states; wishlist heart filled or not; logged in or out links; cart badge hidden at 0 |
| Array methods | `map` (lists), `filter` (search and filters), `sort` on a copy (sorting), `reduce` (totals), `find` (lookups), `some` (checks), `slice` (pagination and rails) |
| React Router | Seven page routes, path parameters, query parameters for filters, redirects, `NavLink` active states |
| Context API | Catalog, cart, wishlist, auth, toasts |
| `useEffect` | Catalog fetch, LocalStorage writes, debounce timer, document title, recently viewed recording, toast timers, scroll to top, checkout delay timer |
| LocalStorage | Cart, wishlist, recent, orders, users, session |

---

## 16. Recommended Folder Structure

Do not create files from this list ahead of the phase that needs them.

```
nocturne/
├─ index.html
├─ package.json
├─ vite config (standard Vite React setup)
├─ eslint config
├─ README.md
├─ docs/
│  ├─ PRD.md
│  ├─ RULES.md
│  ├─ CURRENT_STATE.md
│  ├─ DESIGN_TOKENS.md
│  ├─ HANDOFF.md
│  └─ TECH_STACK.md
├─ public/
│  ├─ favicon.svg
│  └─ (SPA fallback rule for the chosen host)
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ config/
   │  └─ constants.js
   ├─ data/
   │  ├─ products.js
   │  ├─ categories.js
   │  ├─ reviews.js
   │  └─ promos.js
   ├─ services/
   │  ├─ catalogService.js
   │  ├─ orderService.js
   │  └─ authService.js
   ├─ context/
   │  ├─ CatalogContext.jsx
   │  ├─ CartContext.jsx
   │  ├─ WishlistContext.jsx
   │  ├─ AuthContext.jsx
   │  └─ ToastContext.jsx
   ├─ hooks/
   │  ├─ useLocalStorage.js
   │  ├─ useDebounce.js
   │  └─ useDocumentTitle.js
   ├─ utils/
   │  ├─ storage.js
   │  ├─ pricing.js
   │  ├─ format.js
   │  ├─ cart.js
   │  ├─ selectors.js
   │  ├─ listingQuery.js
   │  ├─ validators.js
   │  └─ orders.js
   ├─ pages/
   │  ├─ HomePage.jsx
   │  ├─ ProductsPage.jsx
   │  ├─ ProductDetailsPage.jsx
   │  ├─ CartPage.jsx
   │  ├─ CheckoutPage.jsx
   │  ├─ OrderConfirmationPage.jsx
   │  ├─ WishlistPage.jsx
   │  ├─ LoginPage.jsx
   │  ├─ SignupPage.jsx
   │  └─ NotFoundPage.jsx
   ├─ components/
   │  ├─ layout/     (Layout, SkipLink, Navbar, SearchBar, MobileMenu, CartLink, Footer, ScrollToTop, ToastViewport, CatalogGate)
   │  ├─ ui/         (Button, IconButton, Container, Badge, Chip, Rating, Skeleton, EmptyState, ErrorState, Drawer, QuantityStepper, TextField, SelectField, Pagination, SectionHeading)
   │  ├─ home/       (Hero, CategoryTiles, CategoryTile, PromoStrip, ProductRail)
   │  ├─ product/    (ProductCard, ProductCardSkeleton, ProductGrid, ProductImage, PriceDisplay, AddToCartButton, WishlistButton, ProductGallery, ProductPurchasePanel, ProductSpecs)
   │  ├─ listing/    (FilterPanel, SortSelect, ActiveFilterChips)
   │  ├─ cart/       (CartLineItem, CartSummary, TotalsList)
   │  ├─ checkout/   (CheckoutForm, ContactFields, AddressFields, OrderSummary)
   │  ├─ auth/       (LoginForm, SignupForm, AccountLinks)
   │  └─ reviews/    (ReviewList)
   └─ styles/
      ├─ tokens.css
      └─ base.css
```
Each component file has a sibling `.module.css`.

---

## 17. Implementation Phases

Each phase ends with: acceptance checks pass → `CURRENT_STATE.md` updated → merged. Phase 8 is the P0 milestone.

### Phase 0 — Project setup
- **Goal:** a clean, running, empty React app with the agreed structure.
- **Features:** scaffold with Vite and React; install the approved dependencies only; create the folder skeleton; set up ESLint; `index.html` with title, fonts link, and favicon; initialize Git; copy the six documents into `docs/`; add a README stub.
- **Components involved:** none.
- **Dependencies:** none.
- **Expected result:** the dev server runs, a blank page renders, lint passes, the first commit exists.

### Phase 1 — Design foundations, layout shell, routing skeleton
- **Goal:** the visual system and navigable shell.
- **Features:** `tokens.css` (all tokens from `DESIGN_TOKENS.md`), `base.css` (reset, `color-scheme: dark`, typography, focus-visible, reduced motion, visually-hidden helper, skip link), `constants.js`, `useDocumentTitle`, `BrowserRouter` and the full route table with minimal placeholder pages (title and `h1` only), `Layout`, `SkipLink`, `ScrollToTop`, `Navbar` (brand, links, menu button, `MobileMenu`), `Footer`.
- **Components involved:** `Layout`, `SkipLink`, `ScrollToTop`, `Navbar`, `MobileMenu`, `Footer`, `Button`, `IconButton`, `Container`, `Badge`, `Chip`, `Skeleton`, `EmptyState`, `ErrorState`, `Drawer`, `SectionHeading`, `NotFoundPage`.
- **Dependencies:** Phase 0.
- **Expected result:** every route is reachable; the dark theme looks right; the mobile drawer opens, traps focus, and closes on Escape; the footer and navbar are responsive; unknown URLs show the 404 state.

### Phase 2 — Data layer and global state
- **Goal:** data, pure logic, persistence primitives, and the P0 contexts.
- **Features:** the four data files; `catalogService`; `storage.js`, `pricing.js`, `format.js`, `cart.js`, `selectors.js`; `useLocalStorage`, `useDebounce`; `CatalogContext`, `CartContext` (persisted), `ToastContext`; providers in `main.jsx`; `CatalogGate`; `ToastViewport`; `CartLink` badge wired to the cart.
- **Components involved:** `CatalogGate`, `ToastViewport`, `CartLink`.
- **Dependencies:** Phase 1.
- **Expected result:** the catalog loads after the simulated delay and exposes status; loading and error behavior can be verified (`SIMULATE_CATALOG_ERROR`); the cart state persists and survives a refresh (verified with a temporary developer check or optional Vitest tests on the pure utils); a toast can be shown and auto-dismisses.

### Phase 3 — Product card and Home page
- **Goal:** the discovery page and the single reusable product card.
- **Features:** `ProductImage`, `PriceDisplay`, `Rating`, `ProductCard`, `ProductCardSkeleton`, `ProductGrid`, `AddToCartButton`, `Hero`, `CategoryTiles`, `CategoryTile`, `PromoStrip`, `ProductRail`, `HomePage`.
- **Components involved:** the listed components plus `CatalogGate`.
- **Dependencies:** Phase 2.
- **Expected result:** Home renders all sections with loading skeletons and an error state; Add to cart works from cards and updates the badge with a toast; category tiles link to `/products?category=...` (the listing is still a placeholder).

### Phase 4 — Listing: search, filter, sort, then pagination
- **Goal:** the full browsing experience.
- **Features:** `listingQuery.js` utils; `SearchBar` in the navbar (live on `/products`, submit elsewhere); `FilterPanel`, `SortSelect`, `SelectField`; the filter `Drawer` below 1024px and sidebar above; `ProductsPage` with states; **4b (P1):** `Pagination` and page handling.
- **Components involved:** `SearchBar`, `FilterPanel`, `SortSelect`, `SelectField`, `Drawer`, `ProductGrid`, `EmptyState`, `Pagination`.
- **Dependencies:** Phase 3.
- **Expected result:** search, category, price, rating, and sort all work together; the URL reflects them and survives refresh and Back; no-results shows the empty state with Clear; pagination (4b) shows 12 per page.

### Phase 5 — Product details
- **Goal:** a complete product page.
- **Features:** `ProductGallery`, `ProductPurchasePanel`, `QuantityStepper`, `ProductSpecs`, related rail, back link, not-found state, document title.
- **Components involved:** the listed components plus `ProductRail`, `PriceDisplay`, `Rating`, `AddToCartButton`.
- **Dependencies:** Phase 4 (cards link here).
- **Expected result:** unknown ID shows not-found; gallery thumbnails work; quantity stepper and Add to cart work; Buy now adds and navigates to `/checkout` (placeholder until Phase 7); related products appear.

### Phase 6 — Cart page
- **Goal:** full cart management.
- **Features:** `buildCartLines` and `calculateTotals` wired in; `CartPage`; `CartLineItem`, `CartSummary`, `TotalsList`; removal toast; empty state.
- **Components involved:** the listed components plus `QuantityStepper`, `EmptyState`.
- **Dependencies:** Phases 2 and 5.
- **Expected result:** add, remove, increase, decrease, total items, and total price all work and persist across refresh; limits of 1 and 10 are enforced; the empty cart shows its state.

### Phase 7 — Checkout
- **Goal:** a validated mock checkout that creates an order.
- **Features:** `TextField`, `CheckoutForm`, `ContactFields`, `AddressFields`, `OrderSummary`; `validators.js` checkout rules; `orders.js` (ID and builder); `orderService`; `CheckoutPage` with the guard, validation, placing delay, save, clear cart, and navigation.
- **Components involved:** the listed components plus `Button`.
- **Dependencies:** Phase 6.
- **Expected result:** invalid submit shows errors and focuses the first invalid field; a valid submit shows "Placing order…", saves the order, clears the cart, and navigates; direct visits with an empty cart redirect to `/cart`.

### Phase 8 — Order confirmation (P0 milestone)
- **Goal:** complete the core flow.
- **Features:** `OrderConfirmationPage` reading by ID; not-found handling; focus management; Continue shopping.
- **Components involved:** `OrderSummary`, `TotalsList`, `EmptyState`.
- **Dependencies:** Phase 7.
- **Expected result:** **the whole P0 journey works end to end**: Home → listing → details → cart → checkout → confirmation, including refresh on the confirmation page and an unknown order ID. Run the full P0 QA checklist (section 18) before continuing.

### Phase 9 — Wishlist and recently viewed (P1)
- **Goal:** return-visit features.
- **Features:** `WishlistContext`; `WishlistButton` on `ProductCard` and `ProductPurchasePanel`; `WishlistPage`; navbar wishlist link; recently viewed recording in `ProductDetailsPage` and rails on Home and Details; wishlist toasts.
- **Components involved:** the listed components plus `ProductRail`, `EmptyState`.
- **Dependencies:** Phase 8.
- **Expected result:** heart state is consistent everywhere and persists; the wishlist page works and has an empty state; recently viewed obeys the rules (cap 8, newest first, no duplicates, shows 4, excludes current).

### Phase 10 — Mock authentication (P1)
- **Goal:** demo sign-in with checkout prefill.
- **Features:** `authService`; `AuthContext`; `LoginForm`, `SignupForm`, `AccountLinks`; `LoginPage`, `SignupPage`; validators; checkout prefill and `userId` on orders; auth toasts; "demo only" notes.
- **Components involved:** the listed components plus `TextField`, `Button`.
- **Dependencies:** Phase 9 (toasts and navbar slots); Phase 7 (checkout).
- **Expected result:** signup then login works; the session persists across refresh; logout clears it; passwords are never stored; checkout prefills name and email when logged in.

### Phase 11 — Reviews display, filter chips, toast audit (P1)
- **Goal:** the remaining P1 polish.
- **Features:** `ReviewList` on product details; `ActiveFilterChips` and `getActiveFilterChips` on the listing; an audit that every user action has appropriate feedback.
- **Components involved:** `ReviewList`, `ActiveFilterChips`, `Chip`, `Rating`.
- **Dependencies:** Phases 4 and 5.
- **Expected result:** reviews display or show "No reviews yet"; chips reflect and remove each active filter; Clear all works.

### Phase 12 — Persistence hardening, responsive and accessibility pass
- **Goal:** robustness and quality.
- **Features:** manually corrupt every storage key and confirm safe fallback; test with storage unavailable; verify stale IDs are omitted; test 320px to 1920px; keyboard-only walkthrough; screen reader spot checks; reduced motion; contrast verification; fix issues found.
- **Components involved:** any.
- **Dependencies:** Phases 1 to 11.
- **Expected result:** all items in section 18 pass; no console errors or warnings.

### Phase 13 — QA, README, deployment
- **Goal:** ship and document.
- **Features:** final run of the QA checklist; README (overview, features, architecture diagram of contexts, how to run, screenshots, viva notes); production build check; deploy with the SPA fallback (or `HashRouter` fallback documented); final `CURRENT_STATE.md` update.
- **Components involved:** none new.
- **Dependencies:** Phase 12.
- **Expected result:** a deployed site where deep links work; documentation complete; all statuses in `CURRENT_STATE.md` accurate.

---

## 18. QA Checklist and Definition of Done

### 18.1 P0 checklist (run at Phase 8 and again at Phase 13)
- [ ] Home shows hero promo, category tiles, Featured, promo strip, Popular, footer, and the navbar with search.
- [ ] Each category tile opens a filtered listing.
- [ ] Search is live on `/products` and submits from other pages; the empty state works.
- [ ] Category, price, and rating filters combine with search; every sort option orders correctly.
- [ ] The URL reproduces the same view after refresh; Back and Forward behave.
- [ ] Invalid URL parameters do not crash the page.
- [ ] Product details shows images, name, price, discount, rating, description, specifications, Add to cart, Buy now; an unknown ID shows not-found.
- [ ] Cart: add, remove, increase, decrease, total items, total price; limits 1 and 10; persists after refresh.
- [ ] Checkout validation, placing state, order saved, cart cleared, redirect to confirmation.
- [ ] Confirmation shows order ID, summary, and survives a refresh; an unknown ID shows not-found.
- [ ] `/checkout` with an empty cart redirects to `/cart`.
- [ ] Loading skeletons and the error state with Retry appear for the catalog.
- [ ] Layouts at 320, 375, 768, 1024, 1440 have no horizontal scroll; drawers work on mobile.
- [ ] Keyboard-only: the whole flow is completable; focus is always visible; Escape closes drawers.
- [ ] Corrupt LocalStorage values fall back to defaults without errors.

### 18.2 P1 checklist
- [ ] Wishlist toggle consistent across cards, details, and the Wishlist page; persists.
- [ ] Recently viewed: cap 8, newest first, unique, shows 4, excludes current.
- [ ] Pagination: 12 per page, URL-driven, resets on filter changes, clamps out-of-range pages.
- [ ] Signup, login, logout, session persistence, checkout prefill; no passwords stored.
- [ ] Reviews display and the "No reviews yet" state.
- [ ] Filter chips reflect and remove filters.

### 18.3 Definition of done (every phase)
Acceptance checks pass; no console errors; lint passes; no hardcoded colors or magic values in CSS; no component over about 150 lines; `RULES.md` followed; `CURRENT_STATE.md` updated; committed with a conventional message.

---

## 19. Known Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Remote product images break or load slowly | `ProductImage` fallback; verify URLs; switch to bundled images if needed |
| `SearchBar` and URL sync loops or overwrites typing | Use the "last written value" ref approach in 11.1; test typing, Back, and Clear |
| Empty-cart redirect races order placement | Skip the guard while `isPlacing`; navigate with `replace` |
| Effects running twice in development | Cancel flags and cleanup in every effect (`RULES.md` 2.7) |
| Stale or corrupt LocalStorage | Validators, safe fallback, stale-ID omission (`RULES.md` 5.6) |
| Low contrast for muted text | Use `--color-fg-secondary` for readable text (`DESIGN_TOKENS.md` 1.3) |
| Scope creep | `RULES.md` 16.9: no PRD item, no feature |
| Static host lacks SPA fallback | Configure the rewrite, or use `HashRouter` and record it |
| Native `<dialog>` exit animation | Accept an instant close; animate the open only |
