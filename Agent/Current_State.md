# CURRENT_STATE.md — Nocturne: Current Project State

**Project:** Nocturne (React e-commerce, front-end only)
**Current phase:** Planning and documentation complete. **Implementation has not started.**
**Last updated:** 7 October 2026 (documentation baseline)

> This document describes only what actually exists. At this moment **no application code exists**. Nothing below marked "Not implemented" has been built. Update this file at the end of every phase, in the same merge as the work (see `RULES.md` section 14). Change a status only when the phase's acceptance checks in `HANDOFF.md` pass.

---

## 1. Project Status

| Area | Status |
|---|---|
| `PRD.md`, `RULES.md`, `CURRENT_STATE.md`, `DESIGN_TOKENS.md`, `HANDOFF.md`, `TECH_STACK.md` | Written (documentation only) |
| Repository and project scaffold | **Not implemented** |
| Any application code | **Not implemented** |
| Deployment | **Not implemented** |

## 2. Current Implementation Status

### Pages
| Page | Route | Status |
|---|---|---|
| Home | `/` | **Not implemented** |
| Products | `/products` | **Not implemented** |
| Product Details | `/products/:productId` | **Not implemented** |
| Cart | `/cart` | **Not implemented** |
| Checkout | `/checkout` | **Not implemented** |
| Order Confirmation | `/order-confirmation/:orderId` | **Not implemented** |
| Wishlist | `/wishlist` | **Not implemented** |
| Login | `/login` | **Not implemented** |
| Signup | `/signup` | **Not implemented** |
| Not Found | `*` | **Not implemented** |

### Components
| Group | Status |
|---|---|
| Layout (`Layout`, `SkipLink`, `Navbar`, `SearchBar`, `MobileMenu`, `CartLink`, `Footer`, `ScrollToTop`, `ToastViewport`, `CatalogGate`) | **Not implemented** |
| Shared UI (`Button`, `IconButton`, `Container`, `Badge`, `Chip`, `Rating`, `Skeleton`, `EmptyState`, `ErrorState`, `Drawer`, `QuantityStepper`, `TextField`, `SelectField`, `Pagination`, `SectionHeading`) | **Not implemented** |
| Home (`Hero`, `CategoryTiles`, `CategoryTile`, `PromoStrip`, `ProductRail`) | **Not implemented** |
| Product (`ProductCard`, `ProductCardSkeleton`, `ProductGrid`, `ProductImage`, `PriceDisplay`, `AddToCartButton`, `WishlistButton`, `ProductGallery`, `ProductPurchasePanel`, `ProductSpecs`) | **Not implemented** |
| Listing (`FilterPanel`, `SortSelect`, `ActiveFilterChips`) | **Not implemented** |
| Cart (`CartLineItem`, `CartSummary`, `TotalsList`) | **Not implemented** |
| Checkout (`CheckoutForm`, `ContactFields`, `AddressFields`, `OrderSummary`) | **Not implemented** |
| Auth (`LoginForm`, `SignupForm`, `AccountLinks`) | **Not implemented** |
| Reviews (`ReviewList`) | **Not implemented** |

### Data layer
| Item | Status |
|---|---|
| `data/products.js` (30 products), `categories.js` (5), `reviews.js`, `promos.js` | **Not implemented** |
| `services/catalogService.js`, `orderService.js`, `authService.js` | **Not implemented** |
| `utils/` (storage, pricing, cart, selectors, listingQuery, validators, orders, format) | **Not implemented** |
| `config/constants.js` | **Not implemented** |

### Routing
| Item | Status |
|---|---|
| `BrowserRouter` setup, route table, `Layout` route | **Not implemented** |
| Query-parameter handling for the listing | **Not implemented** |

### State management
| Item | Status |
|---|---|
| `CatalogContext`, `CartContext`, `WishlistContext`, `AuthContext`, `ToastContext` | **Not implemented** |
| Hooks `useLocalStorage`, `useDebounce`, `useDocumentTitle` | **Not implemented** |

### Persistence
| Item | Status |
|---|---|
| LocalStorage keys `nocturne:v1:cart`, `wishlist`, `recent`, `orders`, `users`, `session` | **Not implemented** |
| Validators and corrupt-data handling | **Not implemented** |

### Styling
| Item | Status |
|---|---|
| `styles/tokens.css`, `styles/base.css` | **Not implemented** |
| Component CSS Modules | **Not implemented** |
| Fonts (Space Grotesk, Inter, JetBrains Mono) | **Not implemented** |

### Dependencies
| Item | Status |
|---|---|
| `package.json` and installed packages (React, React DOM, React Router, Lucide React, Vite, ESLint) | **Not implemented** (nothing installed) |

### Quality
| Item | Status |
|---|---|
| Tests (optional Vitest for utils) | **Not implemented** |
| README | **Not implemented** |

---

## 3. Planned Architecture (summary)

- React plus Vite, plain JavaScript, React Router in declarative mode (`BrowserRouter`).
- CSS custom properties (tokens) plus one CSS Module per component. No CSS framework.
- A local seeded catalog (30 products, 5 categories) accessed through an async service with simulated latency (about 600ms), so real loading and error states exist.
- Five small contexts: `CatalogContext`, `CartContext`, `WishlistContext`, `AuthContext`, `ToastContext`.
- Search, filter, sort, and page state live in URL query parameters.
- LocalStorage for cart, wishlist, recently viewed, orders, users, and session through one util and one hook.
- Orders are saved as price snapshots and read by ID on the confirmation page.
- Native `<dialog>` for drawers.
- Full detail: `HANDOFF.md` and `TECH_STACK.md`.

## 4. Planned Features

- **P0:** Home, listing, search, filter, sort, product details, cart, checkout, confirmation, cart and order persistence, responsive layout, loading, empty, and error states, not-found handling, toast feedback for cart actions.
- **P1:** Wishlist, recently viewed, pagination, mock auth, review display, active filter chips, wishlist and auth toasts.
- **P2:** Submit review, order history, cross-tab sync, sticky mobile buy bar, image zoom, newsletter field, error boundary.
- **Not planned:** light theme or theme toggle.

## 5. Known Constraints

- Front-end only. No real payments or authentication.
- Mock login accepts any non-empty password for a registered email, because passwords are never stored. It must be labeled as a demo.
- Product images depend on the chosen image source (see Pending Decisions). Every URL must be verified to resolve before it is committed.
- `--color-muted-fg` (`#71717A`) fails AA contrast for small text. Implementation must follow the token guidance and use `--color-fg-secondary` for readable text.
- CSS custom properties cannot be used inside media queries. Breakpoint values are written literally in CSS and mirrored in `BREAKPOINTS`.
- Static hosting needs an SPA fallback for `BrowserRouter` deep links.
- LocalStorage is per browser and per origin. There is no cross-device sync, and no cross-tab sync in v1.
- The native `<dialog>` provides focus trapping and Escape handling but exit animations are limited; drawers may animate on open only.

## 6. Pending Decisions (with defaults)

| Decision | Default if undecided |
|---|---|
| Currency | USD with locale `en-US`, controlled by `CURRENCY_CODE` and `LOCALE` constants and one formatter |
| Product image source | Remote stock photo URLs in each product's `images` array, shown through `ProductImage` with a graceful fallback. If offline demos are required, switch to locally bundled images in `public/images/products/` |
| Deployment target | Static host (Netlify or Vercel) using `BrowserRouter` with an SPA fallback. If GitHub Pages, switch to `HashRouter` and record it here |
| Shipping rule | Flat fee 6.00; free when the subtotal is at least 75.00. No tax (prices are tax-inclusive) |
| Optional Vitest tests for pure utils | Recommended, not required |
| Product names and copy | Written by the implementer following the "evening objects" theme in `HANDOFF.md` section 7.1 |
| Simulated catalog failure | `SIMULATE_CATALOG_ERROR` constant, default `false`, used only to test the error state |

## 7. Development Phases

| Phase | Name | Status |
|---|---|---|
| 0 | Project setup | Not started |
| 1 | Design foundations, layout shell, routing skeleton | Not started |
| 2 | Data layer and global state (Catalog, Cart, Toast; persistence for cart) | Not started |
| 3 | Product card and Home page | Not started |
| 4 | Listing: search, filter, sort, then pagination | Not started |
| 5 | Product details | Not started |
| 6 | Cart page | Not started |
| 7 | Checkout | Not started |
| 8 | Order confirmation (**P0 milestone: full core flow works**) | Not started |
| 9 | Wishlist and recently viewed | Not started |
| 10 | Mock authentication | Not started |
| 11 | Reviews display, filter chips, toast audit | Not started |
| 12 | Persistence hardening, responsive and accessibility pass | Not started |
| 13 | QA, README, deployment | Not started |

Phase definitions, components, dependencies, and expected results are in `HANDOFF.md` section 17.

## 8. Change Log

| Date | Phase | Change |
|---|---|---|
| 7 October 2026 | Planning | Six planning documents written. No code. |
