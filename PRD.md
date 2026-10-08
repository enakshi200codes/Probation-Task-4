# PRD.md — Nocturne: Product Requirements Document

**Project:** Nocturne (React e-commerce, front-end only)
**Document role:** Defines WHAT is built and how it must behave. HOW it is built is in `HANDOFF.md`; code conventions are in `RULES.md`; visual values are in `DESIGN_TOKENS.md`; dependencies are in `TECH_STACK.md`; what exists today is in `CURRENT_STATE.md`.
**Feature IDs (F-xx) in this document are referenced by the other documents. Do not renumber them.**

---

## 1. Product Overview

**Product name:** Nocturne
**Tagline:** *Objects for the evening.*

**Concept.** Nocturne is a small, curated online shop for evening and night-time living: lighting, audio, desk objects, fragrance, and sleep. The catalog is deliberately compact (30 products across 5 categories). That keeps the shopping flow focused and lets the dark, atmospheric visual identity carry the experience. The theme matches the amber-on-dark design direction and avoids the generic "electronics store" look.

**Purpose.** A fully working front-end e-commerce experience from discovery to a mock order confirmation. It is both a college submission and a portfolio piece, and it demonstrates core React concepts through real product needs rather than artificial ones.

**Overall experience.** Calm, spacious, premium. Browsing feels unhurried and the interface stays out of the way. Amber appears only where it carries meaning: primary actions, discounts, active states, focus, and key highlights.

**Scope boundary.** Front-end only. No backend, no real payments, no real authentication. Everything persistent lives in the browser's LocalStorage.

**Categories (fixed ids):** `lighting`, `audio`, `desk`, `fragrance`, `sleep`.

---

## 2. Problem Statement

Learning projects often show React features without a coherent product, or show an attractive UI without sound state design. This project needs a realistic shopping flow (browse, search, filter, sort, cart, checkout) that gives natural reasons to use components, props, state, events, conditional rendering, array methods, React Router, Context API, `useEffect`, and LocalStorage. It must also look intentional and premium rather than template-like.

---

## 3. Goals

1. Complete the core shopping journey end to end with no dead ends.
2. Make search, filter, and sort fast, combinable, and shareable through the URL.
3. Keep the cart consistent across every page and across refreshes.
4. Deliver a distinctive Minimalist Dark identity applied consistently.
5. Keep the architecture explainable in a viva or interview (five small contexts, one source of product data, clear data flow).
6. Be responsive from 320px upward and fully keyboard accessible.
7. Handle loading, empty, and error states deliberately on every data-dependent view.

## 4. Non-Goals

- Real payment processing, real authentication, or any backend or API.
- Inventory or stock management, admin dashboards, multi-currency, multi-language.
- Coupons, shipping calculators by region, tax engines.
- Real-time sync across tabs or devices.
- A light theme or theme toggle. The site is dark-native.
- SEO or server-side rendering.
- Product variants (size, color) and product comparison.

---

## 5. Target Users

| Segment | Description |
|---|---|
| Casual shoppers | Mostly on phones; browse by visuals; want a clean, fast experience |
| Goal-oriented shoppers | Mostly on desktop; know roughly what they want; rely on search, filters, sort |
| Returning shoppers | Come back to saved items; expect the cart, wishlist, and history to persist |
| Evaluators | Professors, interviewers, recruiters; open the app for a few minutes and inspect the code |

## 6. User Needs

| Need | Served by |
|---|---|
| Discover something interesting without knowing what to look for | Home sections, category tiles, featured and popular rails |
| Find a specific item quickly | Live search |
| Narrow many options | Category, price, rating filters and sorting |
| Trust a product before buying | Images, clear price and discount, rating, specifications, reviews |
| Keep track of what I want | Cart, wishlist, recently viewed |
| Buy with minimal friction | Guest checkout, clear summary, inline validation |
| Know the order worked | Confirmation page with order ID and full summary |

## 7. User Personas

- **Maya, 24, evening browser (mobile).** Browses on her phone, drawn by visuals. Needs large tap targets, a clean two-column grid, and a simple filter drawer.
- **Daniel, 35, goal-oriented (desktop).** Wants a desk lamp under a set budget. Needs fast search, price and rating filters, and sorting by price.
- **Priya, 29, returning shopper.** Saves things for later and returns. Needs a persistent cart, a wishlist, and recently viewed products.
- **Prof. Rao, evaluator.** Spends five minutes in the app. Needs the main flow to work without setup, clean loading, empty, and error states, and readable architecture.

---

## 8. Core User Journeys

1. **Discover → Browse → Details → Cart → Checkout → Confirmation (P0).** Home → category tile or "Shop all" → `/products` → product card → `/products/:productId` → Add to cart → `/cart` → `/checkout` → Place order → `/order-confirmation/:orderId`.
2. **Search → Product → Cart (P0).** Type in the header search → live results on `/products` → open a product → Add to cart.
3. **Category → Filter → Sort → Product (P0).** Category tile → `/products?category=...` → apply price and rating filters → choose a sort → open a product.
4. **Buy now (P0).** Product details → Buy now → product is added to the cart → `/checkout`.
5. **Wishlist → Product → Cart (P1).** Heart a product → `/wishlist` → open the product or add it to the cart.
6. **Recently viewed → Product (P1).** Visit products → "Recently viewed" rail on Home or Product details → reopen a product.
7. **Sign up / Log in → Return (P1).** `/signup` or `/login` → return to the page the user came from; checkout fields prefill name and email.

---

## 9. Feature Requirements

**F-01 Navigation bar.** Sticky header with the logo, primary links (Home, Shop), a search field, a wishlist link (P1), account links (P1), and a cart link with an item-count badge. On screens below 1024px, links collapse into a menu button that opens a drawer, and search is toggled by a search icon that reveals an inline search row beneath the header.

**F-02 Search.** The header search is present on every page. On `/products`, typing updates the results live (debounced) by writing `q` to the URL. On other pages, submitting (Enter or the search button) navigates to `/products?q=...`. Matching is case-insensitive on the product name, with the category name as a secondary match. Input is trimmed; empty input clears the search.

**F-03 Categories.** Category tiles on Home link to `/products?category=<categoryId>`. There is no separate category page.

**F-04 Promotional section.** A hero promo panel at the top of Home and one secondary promo strip between the Featured and Popular sections. Copy is static, stored in `data/promos.js`, and links to valid listing URLs.

**F-05 Featured and Popular.** Two Home rails driven by the product flags `featured` and `popular`, showing four products each. Popular excludes products already shown in Featured.

**F-06 Footer.** Brand, tagline, link groups (Shop by category, Customer links to Cart and Wishlist), copyright. Only links to existing routes. No dead links.

**F-07 Product listing.** A responsive grid of product cards. Each card shows image, name, price, original price with a discount badge (only when discounted), rating, and an Add to cart button.

**F-08 Filtering.** Category (single select), price range (min and max), minimum rating (Any, 3+, 4+). Filters combine with each other and with search.

**F-09 Sorting.** Featured (default), Price: Low to High, Price: High to Low, Rating: High to Low, Newest.

**F-10 Product details.** A separate page at `/products/:productId` with a gallery (thumbnails plus main image), name, price, discount, rating, description, specifications table, quantity selector, Add to cart, Buy now, related products (same category), recently viewed (P1), reviews (P1), and a wishlist toggle (P1).

**F-11 Shopping cart.** Add, remove, increase, decrease (minimum 1; removal is an explicit separate control), maximum 10 per item, total items, subtotal, savings, shipping, and total. The empty cart shows an empty state with a call to action.

**F-12 Checkout.** Customer details (full name), contact information (email, phone), delivery address, order summary, total amount, and a Place order button. There are no payment fields and a clear "mock checkout, no payment is taken" note.

**F-13 Order confirmation.** Order ID, status message, customer and address snapshot, item list, totals, and a Continue shopping action.

**F-14 Persistence.** Cart, wishlist, recently viewed, orders, users, and the session persist in LocalStorage (see `RULES.md` section 5 for keys).

**F-15 Loading, empty, and error states.** Skeletons, empty states, and error states on every data-dependent view (sections 14 to 16).

**F-16 Not-found handling.** Unknown routes, unknown product IDs, and unknown order IDs show a friendly not-found view.

**F-17 Toast feedback.** Brief, accessible confirmations. Cart actions (add, limit reached, remove) are P0. Wishlist, login, logout, and signup toasts are P1. The toast region is also the polite live region used for screen-reader announcements.

**F-18 Wishlist (P1).** Heart toggle on cards and on product details; a Wishlist page at `/wishlist`.

**F-19 Recently viewed (P1).** The last 8 distinct products visited are stored; rails display up to 4.

**F-20 Pagination (P1).** 12 products per page on the listing. The page number lives in the URL.

**F-21 Mock authentication (P1).** Signup, login, logout. Demo only. The session persists.

**F-22 Reviews display (P1).** Seeded reviews on product details.

**F-23 Active filter chips (P1).** Removable chips summarizing the active search and filters, plus Clear all.

**P2 features:** F-24 submit a review, F-25 order history page, F-26 cross-tab storage sync, F-27 sticky mobile buy bar on product details, F-28 image zoom, F-29 footer newsletter field (omitted in v1), F-30 app-level error boundary.

---

## 10. Feature Priorities

The "Additional features" from the project brief are classified individually. Not all are equally important.

| Item | Priority | Reasoning |
|---|---|---|
| Home, listing, search, filter, sort, details, cart, checkout, confirmation | **P0** | The required core |
| LocalStorage (cart, orders) | **P0** | Required React concept and required for the cart to survive refresh |
| Responsive mobile layout | **P0** | Required by the objective; affects every component |
| Loading states, empty states, error states, not-found | **P0** | Quality baseline; also required by the brief |
| Dark theme | **P0** | It is the visual identity. A toggle is not planned |
| Toast feedback for cart actions (and the live region) | **P0** | Feedback and accessibility for the most frequent action |
| Wishlist | **P1** | Natural second use of Context plus LocalStorage |
| Recently viewed | **P1** | Natural real use of `useEffect` plus LocalStorage |
| Pagination | **P1** | Added after the unpaginated listing works (30 products, 12 per page) |
| Login/Signup (mock) | **P1** | Fifth context; enables checkout prefill; clearly labeled demo |
| Product reviews (display) | **P1** | Seeded data only |
| Wishlist/auth toasts, active filter chips | **P1** | Polish on top of working features |
| Submit review, order history, cross-tab sync, sticky buy bar, image zoom, newsletter, error boundary | **P2** | Optional polish |
| Light theme or theme toggle | **Not planned** | Would require a second complete token set; outside the identity |

---

## 11. Page and Screen Inventory

| Page | Route | Priority |
|---|---|---|
| Home | `/` | P0 |
| Products (listing, search, filter, sort, pagination) | `/products` | P0 |
| Product Details | `/products/:productId` | P0 |
| Cart | `/cart` | P0 |
| Checkout | `/checkout` | P0 |
| Order Confirmation | `/order-confirmation/:orderId` | P0 |
| Not Found | `*` | P0 |
| Wishlist | `/wishlist` | P1 |
| Login | `/login` | P1 |
| Signup | `/signup` | P1 |

Transient overlays: mobile navigation drawer, mobile filter drawer (both P0). There is no separate category page and no account page.

---

## 12. Functional Requirements

- **FR-1** The catalog loads once at application start and is shared by every page.
- **FR-2** Search, filters, sort, and page are represented in the URL query string (`q`, `category`, `minPrice`, `maxPrice`, `rating`, `sort`, `page`) and survive refresh and back/forward navigation. Default values are omitted from the URL.
- **FR-3** Changing the search or any filter or sort resets the page to 1.
- **FR-4** The cart stores only `{ productId, quantity }`. All display data and prices come from the catalog.
- **FR-5** Cart quantity is clamped between 1 and 10 per item.
- **FR-6** Checkout with an empty cart redirects to `/cart`.
- **FR-7** Placing an order builds an order snapshot (prices frozen at purchase), saves it, clears the cart, and navigates to the confirmation URL.
- **FR-8** Order confirmation reads the order from storage by ID, so it survives a refresh.
- **FR-9** The wishlist is device-level, not tied to the logged-in user.
- **FR-10** Stale IDs in stored data (cart, wishlist, recent) that do not exist in the catalog are silently omitted when rendering.
- **FR-11** Money amounts are formatted through one formatter and totals are computed by one pure function.
- **FR-12** Shipping is a flat fee of 6.00, free when the subtotal is at least 75.00. Tax is not modeled (prices are treated as tax-inclusive). Currency is USD, controlled by one constant.
- **FR-13** URL values are untrusted and validated; invalid values fall back to defaults and never crash the page.
- **FR-14** Buy now adds the selected quantity to the cart (clamped to 10) and navigates to `/checkout`.

---

## 13. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | First Home render in about 2 seconds on a mid-range phone over a typical connection. Product images lazy-load below the fold and reserve space (no layout shift). Filtering and sorting 30 products is effectively instant. Fonts use `display=swap` |
| Accessibility | WCAG 2.1 AA target (section 18) |
| Responsiveness | Fully usable from 320px to 1920px with no horizontal scrolling |
| Maintainability | Small focused components, one source of product data, tokens for every visual value, pure functions for business logic |
| Usability | Primary actions are always visible. Remove from cart is a distinct labeled control (no confirmation dialog, but a toast confirms). Forms validate clearly and inline |
| Browser support | Current evergreen browsers (Chrome, Edge, Firefox, Safari) on desktop and mobile |
| Privacy | No passwords and no payment-like data are ever stored |

---

## 14. Loading States

| Context | Behavior |
|---|---|
| Catalog loading (Home rails, Products, Wishlist, Product details, Cart, Checkout) | Skeletons matching the final layout. Product-card skeletons use the same dimensions as real cards |
| Product details | Skeleton with gallery block, title lines, price line, button blocks |
| Placing an order | The button shows "Placing order…" and is disabled for about 0.8 seconds |
| Images | Reserved aspect-ratio space with the muted surface color until loaded |
| Login/Signup submit | Button disabled briefly while the mock request resolves |

The catalog is local data behind an async service with simulated latency (about 600ms), so loading states are real and testable.

## 15. Empty States

| Context | Message intent | Action |
|---|---|---|
| Search or filters match nothing | "No products match" plus the searched term | Clear all filters and search |
| Cart empty | "Your cart is empty" | Browse products |
| Wishlist empty | "Nothing saved yet" | Browse products |
| Recently viewed empty | The section is not rendered | n/a |
| No reviews | "No reviews yet" | n/a |
| Unknown product, unknown order, unknown route | Friendly not-found message | Link to Shop or Home |

## 16. Error States

| Context | Behavior |
|---|---|
| Catalog failed to load | Full-width error state with a Retry button |
| Product not found | Not-found state with a link to Shop |
| Order not found | Not-found state with a link to Home |
| Storage unavailable or corrupt | The app continues with in-memory state; no crash and no alarming message (console warning in development only) |
| Form errors | Inline per-field message (icon plus text, not color alone), plus an error summary at the top of the form after a failed submit; focus moves to the first invalid field |
| Auth errors | Inline message on the form (email already registered, email not found) |

---

## 17. Responsive Requirements

| Viewport | Layout |
|---|---|
| Mobile (below 640px) | Two-column product grid; hamburger drawer; search row toggled from the header; filters in a bottom drawer; single-column cart and checkout |
| Tablet (640 to 1023px) | Three-column product grid; filters in a drawer; single-column cart and checkout (summary below); footer groups in two to four columns |
| Desktop (1024px and above) | Listing: persistent 260px filter sidebar plus a three-column grid. Home rails: four columns (rails use four columns from 768px). Full inline navigation. Two-column cart and checkout with a sticky summary |

Home, Related, and Recently viewed rails show 2 columns below 768px and 4 columns from 768px. Details of tokens and breakpoints are in `DESIGN_TOKENS.md`.

---

## 18. Accessibility Requirements

- Skip-to-content link; landmark regions (`header`, `nav`, `main`, `footer`); exactly one `h1` per page.
- Every interaction is keyboard operable. Focus is visible (amber focus ring) and never removed.
- All form fields have visible labels. Errors are associated with fields (`aria-describedby`, `aria-invalid`).
- All product images have alt text; star ratings expose a text equivalent such as "Rated 4.5 out of 5".
- Dynamic updates (result count, cart changes, form errors) are announced via polite live regions.
- Drawers use the native dialog behavior: focus trapped, Escape closes, focus returns to the trigger.
- Respect `prefers-reduced-motion`.
- Minimum 44px touch targets.
- Color is never the only signal.
- Text contrast of at least 4.5:1. The muted foreground color (`#71717A`) is below 4.5:1 for small text, so essential text uses the secondary foreground token instead (see `DESIGN_TOKENS.md`).

---

## 19. Acceptance Criteria

**Home (F-01 to F-06)**
- The navbar with search, the hero promo, category tiles, Featured, the promo strip, Popular, and the footer all render. Recently viewed renders only when it has content (P1).
- Each category tile opens `/products?category=<id>` and the listing is filtered.
- Featured and Popular show four products each from the flags; Popular never repeats a Featured product.
- Skeletons show while the catalog loads; an error state with Retry shows if it fails.

**Listing (F-07)**
- Cards show image, name, price, discount badge (only when discounted), rating, and Add to cart.
- Grid columns follow section 17.
- Add to cart on a card updates the header badge immediately and shows a toast.

**Search (F-02)**
- Typing on `/products` updates results about 250 to 300ms after the last keystroke.
- No match shows the empty state with a Clear action.
- Submitting a search from another page navigates to `/products?q=...`.
- Clearing the field removes `q` from the URL.

**Filtering and sorting (F-08, F-09)**
- Category, price, and rating filters combine with search and each other.
- Each sort option orders correctly; Newest uses `createdAt`.
- The URL reflects every active control, and reloading restores the same view.
- A minimum price greater than the maximum is swapped; invalid values are ignored; neither crashes the page.
- The result count is announced to screen readers.

**Pagination (F-20, P1)**
- 12 items per page; page links reflect the URL; changing a filter returns to page 1; an out-of-range page is clamped.

**Product details (F-10)**
- An unknown ID shows the not-found state.
- Clicking a thumbnail changes the main image; navigating to another product resets the selection and quantity.
- Add to cart adds the selected quantity; Buy now adds it and navigates to `/checkout`.
- Related products are from the same category and exclude the current product.

**Cart (F-11)**
- Increase, decrease, and remove work, and totals update instantly.
- Decrease is disabled at 1; increase is disabled at 10.
- The cart persists after refresh.
- Subtotal, savings, shipping, and total follow FR-12.
- The empty cart shows the empty state.

**Checkout (F-12)**
- Required fields are validated. An invalid submit shows inline errors plus a summary and focuses the first invalid field.
- The summary matches the cart exactly.
- Visiting `/checkout` with an empty cart redirects to `/cart`.
- The Place order button is disabled while placing.

**Confirmation (F-13)**
- The order ID is displayed in the format `NOC-XXXX-XXXX`, unique per order.
- The summary matches what was purchased (price snapshot) even if the catalog changes later.
- Refreshing the page keeps the confirmation; an unknown ID shows not-found.
- The cart is empty afterward.

**Persistence (F-14)**
- Cart, wishlist, recent, orders, users, and session survive refresh.
- Corrupt or missing stored data never crashes the app; defaults are used.

**Wishlist, recently viewed, auth, reviews (P1)**
- The heart state is consistent across cards, product details, and the Wishlist page, and persists.
- Recently viewed stores at most 8 items, newest first, no duplicates; rails show at most 4 and exclude the current product.
- Signup then login works; the session persists; logout clears it; checkout prefills name and email when logged in; passwords are never stored.
- Reviews display on product details; products without reviews show "No reviews yet".

**Accessibility**
- All interactive elements are keyboard reachable; drawers trap focus and close on Escape; icon buttons have descriptive labels; the skip link works.

---

## 20. Future Enhancements

Only the items already classified P2 (F-24 to F-30). The one meaningful step beyond this project is replacing the local data and storage layers with a real backend (API, authentication, payments), which the service-layer design is intended to make straightforward.
