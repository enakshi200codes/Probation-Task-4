# RULES.md — Nocturne: Binding Development Rules

**Audience:** the implementing AI agent (Gemini) and any human contributor.
**Status:** These rules are binding. When a rule conflicts with convenience, the rule wins. If a rule must change, update this document first, then the code.
**Related documents:** scope in `PRD.md`, architecture in `HANDOFF.md`, dependencies in `TECH_STACK.md`, visual values in `DESIGN_TOKENS.md`, progress in `CURRENT_STATE.md`.

**Precedence if documents conflict:** `RULES.md` for code conventions; `PRD.md` for scope and behavior; `DESIGN_TOKENS.md` for visual values; `TECH_STACK.md` for dependencies; `HANDOFF.md` for architecture and sequencing. Do not guess: record the conflict in `CURRENT_STATE.md` under Pending Decisions and use the documented default.

---

## 1. Architecture Rules

### 1.1 Responsibilities

| Layer | Folder | Responsibility | Must not |
|---|---|---|---|
| Pages | `src/pages/` | One per route. Read route and query params, read contexts, derive data, compose components, own page-level local state. `CheckoutPage` and `OrderConfirmationPage` may call `orderService` because orders are not held in a context | Contain reusable visual markup beyond layout composition; contain business logic; import `data/` or other services |
| Components | `src/components/<domain>/` | Presentational or small interactive units. Receive data through props and report actions through callback props | Read the URL (only `SearchBar`, `ScrollToTop`, and `AccountLinks` may use router location hooks; `Link` and `NavLink` are always allowed); import data files; import services |
| Context | `src/context/` | Shared state and a small set of named actions | Import other contexts; expose raw setters; hold derivable or page-specific state |
| Hooks | `src/hooks/` | The three approved custom hooks only (see 16.4) | Be added without justification |
| Utils | `src/utils/` | Pure functions: pricing, filtering, sorting, validation, formatting, order building, storage access | Import React; touch the DOM except `storage.js` (LocalStorage) |
| Services | `src/services/` | Data access: catalog loading, orders, users. The only place that imports `src/data/` | Import React |
| Data | `src/data/` | Static seed data | Contain logic |
| Config | `src/config/` | `constants.js` (all constants) | Contain logic |
| Styles | `src/styles/` | `tokens.css`, `base.css` | Contain component-specific styles |

### 1.2 Import direction (no circular imports)

```
pages  →  components, context, hooks, utils, services/orderService only
components  →  components (ui first), context consumer hooks, hooks, utils, config
context  →  services, hooks, utils, config
services  →  data, utils, config
utils  →  config (and other utils)
```

Components in `components/ui/` import nothing from other component domains. Domain components may import `ui/`.

### 1.3 Extraction and reuse

- Business logic (price math, filtering, sorting, pagination, validation, order building, ID generation) lives in `utils/` as pure functions and is never written inline in JSX.
- Extract a component only when (a) it is reused at least twice, (b) its parent exceeds roughly 150 lines, or (c) it has a distinct responsibility worth naming.
- Group components by domain (`layout/`, `ui/`, `home/`, `product/`, `listing/`, `cart/`, `checkout/`, `auth/`, `reviews/`), not by technical type.
- Exactly one source of truth for each concern: one `ProductCard`, one `Button`, one `Rating`, one `EmptyState`, one `ErrorState`, one formatter, one totals function.

---

## 2. React Rules

### 2.1 Components
- Function components only. One component per file. File name equals the component name. Default export for components; named exports for utils, hooks, and constants.
- Keep components under roughly 150 lines. Split by responsibility, not by line count alone.

### 2.2 Props
- Destructure props in the signature.
- Pass the minimum needed (a product object, or an ID, not both).
- Never mutate props.
- Avoid prop drilling deeper than two levels; use composition or a context consumer instead.
- Boolean props use `is`, `has`, or `can` prefixes (`isLoading`, `hasError`).
- Callback props use `onX` (`onAddToCart`, `onPageChange`).
- Use `children` for composition instead of many configuration props.

### 2.3 State
- Keep state as close as possible to where it is used.
- Never store what can be computed (see section 3).
- Updates that depend on previous state use functional updates (`setX(prev => ...)`).
- Never mutate state in place; copy arrays and objects.
- To reset local state when an entity changes (for example the gallery when the product changes), prefer giving the component a `key` over writing an effect.

### 2.4 Events
- Handlers are named `handleX` and passed down as `onX` props.
- Inline arrow functions are allowed only for a single trivial expression. Anything longer becomes a named handler.
- Form submit handlers call `preventDefault`, validate with a util, then act.

### 2.5 Conditional rendering
- Use early returns for loading, error, empty (in that order), then content.
- Use `&&` only with real booleans. Never write `count && <X />` with a number.
- No nested ternaries. Use a variable or an early return instead.

### 2.6 Array methods
- `map` to render lists, always with a stable `key` equal to the entity ID. Never use the array index as a key for dynamic lists.
- `filter` for search and filters; `find` for lookups; `reduce` for totals; `some`/`every` for checks.
- `sort` only on a copy: `[...items].sort(...)`. Never sort state or props in place.
- `includes`, `slice`, `Set` are allowed for membership and truncation.

### 2.7 useEffect
- Only for synchronizing with something outside React: LocalStorage writes, timers, `document.title`, DOM event listeners, the simulated catalog fetch, scroll position, and recording a recently viewed visit.
- Never use `useEffect` to compute derived values or to copy props into state.
- Every effect that creates a timer or listener cleans it up.
- Dependency arrays are complete. Do not suppress the lint rule.
- The catalog fetch effect must tolerate being run twice in development (React Strict Mode) by ignoring stale results with a cancel flag.

### 2.8 Context API
See sections 3 and 5.

### 2.9 Memoization
Do not use `useMemo`, `useCallback`, or `React.memo` unless a measured problem exists, and then add a comment explaining it (section 11).

---

## 3. State Management Rules

| Kind | Examples | Where it lives |
|---|---|---|
| **Context (global)** | Catalog data and load status; cart items; wishlist IDs; auth user; toasts | The five contexts only |
| **Local component state** | Quantity selector value; selected gallery image; form values, errors, touched flags; drawer open or closed; search input text before debounce; "placing order" flag; draft price inputs | `useState` in the owning component |
| **URL state** | Search query, category, price range, rating, sort, page | Query string via `useSearchParams` in `ProductsPage` (and `SearchBar` for `q`) |
| **Derived (never stored)** | Filtered, sorted, and paginated products; cart lines with product data; total items; subtotal; savings; shipping; total; discount percent; wishlist membership; result counts; featured and popular selections | Computed during render or in pure utils |
| **Persistent** | Cart, wishlist, recently viewed, orders, users, session | LocalStorage (section 5) |

**Must NOT be global:** form values; filter, search, and sort state; UI open or closed flags; loading flags of individual actions; anything used by a single page; anything derivable.

**Context rules**
- There are exactly five contexts: `CatalogContext`, `CartContext`, `WishlistContext`, `AuthContext`, `ToastContext`. Adding a sixth requires a written justification added to this document first.
- Each context lives in its own file and exports its Provider and a consumer hook (`useCatalog`, `useCart`, `useWishlist`, `useAuth`, `useToast`). The consumer hook throws a clear error if used outside its Provider.
- A context exposes state plus a small set of named actions. Never expose raw setters.
- Contexts do not import each other. Cross-context coordination (for example add to cart plus toast) happens in components or pages.
- The cart stores `{ productId, quantity }` only. Never store product names, prices, or images in the cart.
- Recently viewed is **not** a context. It is persisted local state using `useLocalStorage` in the page that needs it.
- Orders are **not** in a context. They are written through `orderService` and read by ID on the confirmation page.

---

## 4. Routing Rules

- Use React Router in declarative mode: `BrowserRouter` in `main.jsx` and one route table in `App.jsx`. No data routers, loaders, or actions.
- All pages render inside one `Layout` route (skip link, header, `main`, footer, toast region).
- Route table (fixed): `/`, `/products`, `/products/:productId`, `/cart`, `/checkout`, `/order-confirmation/:orderId`, `/wishlist`, `/login`, `/signup`, `*`.
- Use `Link` and `NavLink` for navigation. Use `useNavigate` only for programmatic redirects (after a search submit, after Buy now, after placing an order, after login or signup).
- Use `replace: true` for redirects that must not stay in history: post-order navigation, the empty-cart guard, and live-search URL updates.
- Query parameter names are fixed: `q`, `category`, `minPrice`, `maxPrice`, `rating`, `sort`, `page`. Defaults are omitted from the URL.
- URL values are untrusted. Parse and validate every parameter through `parseListingParams`; fall back to defaults on invalid input.
- Unknown product IDs and order IDs render a not-found state inside the page. They never crash and never show a blank page.
- `ScrollToTop` runs on pathname changes. Each page sets `document.title` through `useDocumentTitle`.
- No route protection. Checkout is guest-friendly. Login and Signup redirect an already-authenticated user to `/`.
- Deployment must provide an SPA fallback. If the host cannot, switching to `HashRouter` is the only permitted router deviation and must be recorded in `CURRENT_STATE.md`.

---

## 5. LocalStorage Rules

### 5.1 Keys (all prefixed and versioned; defined once as `STORAGE_KEYS` in `config/constants.js`)

| Constant | Key | Contents | Cap |
|---|---|---|---|
| `STORAGE_KEYS.CART` | `nocturne:v1:cart` | `[{ productId, quantity }]` | none (max 10 per item) |
| `STORAGE_KEYS.WISHLIST` | `nocturne:v1:wishlist` | `[productId]` newest first | none |
| `STORAGE_KEYS.RECENT` | `nocturne:v1:recent` | `[productId]` newest first | 8 |
| `STORAGE_KEYS.ORDERS` | `nocturne:v1:orders` | `[Order]` newest first | 10 |
| `STORAGE_KEYS.USERS` | `nocturne:v1:users` | `[{ id, name, email, createdAt }]` | none |
| `STORAGE_KEYS.SESSION` | `nocturne:v1:session` | `{ id, name, email }` or key absent | 1 |
| `STORAGE_KEYS.REVIEWS` (P2) | `nocturne:v1:reviews` | user-submitted reviews | none |

### 5.2 What persists and what does not
- **Persist:** the six keys above (plus reviews in P2).
- **Never persist:** search, filter, sort, or page state; UI state; form drafts; passwords; anything resembling payment data; loading or error flags; catalog data; derived totals.

### 5.3 Access
- All access goes through the `utils/storage.js` util and the `hooks/useLocalStorage.js` hook. No direct `localStorage` calls anywhere else.
- Components never touch storage directly. Contexts and services use the hook or the util.

### 5.4 Serialization
- JSON only. Store plain data: no functions, no `Date` objects (use ISO 8601 strings), no `undefined`.
- Writing `null` for a key that represents "absent" (for example the session on logout) removes the key.

### 5.5 Hydration and writing
- **Hydration:** read once during initial state creation using a lazy `useState` initializer.
- **Writing:** a `useEffect` writes the value whenever it changes.
- `useLocalStorage(key, defaultValue, validator)` returns `[value, setValue]` and `setValue` supports functional updates like `useState`.

### 5.6 Missing and corrupt data
- **Missing key:** use the default value.
- **Corrupt JSON or wrong shape** (checked by a small validator per key): use the default value and remove the bad key.
- **Access or quota errors:** catch the error, continue with in-memory state, warn in the console in development only, never crash.
- **Stale references** (IDs not found in the catalog): silently omitted when deriving lines and lists. Storage is not rewritten just to clean them.
- Validators check shape strictly: for the cart, an array in which every entry has a string `productId` and an integer `quantity` from 1 to 10.

### 5.7 Versioning
Bump the version segment in the key prefix (`v1` to `v2`) if a stored shape ever changes.

---

## 6. Data Rules

- One source of product data: `data/products.js`, plus `data/categories.js`, `data/reviews.js`, `data/promos.js`. Never copy product data into components, the cart, the wishlist, or contexts.
- Only services import files from `data/`. Components get catalog data only through `useCatalog()`.
- `price` is the current selling price. `originalPrice` is `null` when the product is not discounted. **The discount is never stored.** It is derived as a rounded percentage by one util (`getDiscountPercent`).
- Money is stored as plain numbers in major currency units with at most two decimals. All display goes through `formatPrice`. All arithmetic passes through `roundMoney` to avoid floating-point noise.
- Currency code and locale come from constants (`CURRENCY_CODE`, `LOCALE`).
- Orders are snapshots. They copy name, image, unit price, original unit price, and quantity at purchase time and never reference live catalog prices afterward.
- Dates are ISO strings. Display formatting uses `Intl`.
- Product IDs are stable strings (`p-001` to `p-030`) and are the only join key between cart, wishlist, recent, and order items.
- Category IDs are stable lowercase slugs: `lighting`, `audio`, `desk`, `fragrance`, `sleep`.
- Seed data must satisfy: at least 4 products with `featured: true`; at least 4 products with `popular: true` that are not featured; distinct `createdAt` values; at least 6 products with a non-null `originalPrice`; each product has 1 to 4 images.

---

## 7. Naming Rules

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase; file name identical | `ProductCard.jsx` |
| Component CSS | Same name plus `.module.css` | `ProductCard.module.css` |
| Pages | PascalCase plus `Page` | `CartPage.jsx` |
| Hooks | `useX`, camelCase file | `useDebounce.js` |
| Contexts | `XContext.jsx`; Provider `XProvider`; hook `useX` | `CartContext.jsx`, `CartProvider`, `useCart` |
| Utils and services | camelCase file | `pricing.js`, `catalogService.js` |
| Variables and functions | camelCase; functions start with a verb | `calculateTotals` |
| Booleans | `is`, `has`, `can`, `should` prefix | `isLoading` |
| Event handlers | `handleX` | `handleAddToCart` |
| Callback props | `onX` | `onAddToCart` |
| Constants | `UPPER_SNAKE_CASE`, defined in `config/constants.js` | `MAX_CART_QUANTITY` |
| CSS custom properties | `--group-name`, kebab-case | `--color-accent` |
| CSS Module classes | camelCase | `styles.cardImage` |
| Storage keys | Only through constants | `STORAGE_KEYS.CART` |
| Product, category, order IDs | `p-001`, `lighting`, `NOC-XXXX-XXXX` | |

---

## 8. Styling Rules

- Every color, spacing, radius, shadow, font size, z-index, and duration comes from the tokens in `DESIGN_TOKENS.md`, defined once as CSS custom properties in `src/styles/tokens.css`.
- **No hardcoded hex values and no magic pixel numbers in component CSS.** If a needed value is missing, add a token first and document it in `DESIGN_TOKENS.md`.
- Approach: global `tokens.css` and `base.css` plus one CSS Module per component. No inline `style` attribute except for truly dynamic values (for example a computed width).
- No duplicated style blocks. A pattern used in three or more places becomes a shared class or a `ui/` component.
- Mobile-first: base styles target mobile; enhance with `min-width` media queries at 640, 768, 1024, and 1280 only. CSS variables cannot be used inside media queries, so write those four values literally and mirror them in `BREAKPOINTS`.
- The glass effect (`backdrop-filter`) is allowed only on the header, drawers, and hero panels. Product cards use the translucent surface without blur.
- One accent color. Amber is used only for primary actions, discount badges, rating stars, active states, focus, and key highlights.
- Layered darkness: never use pure `#000` for surfaces. Use the background, alt background, and surface tokens.
- Avoid neon, cold blues, heavy gradients, excessive glow, and animations larger than the limits in `DESIGN_TOKENS.md`.
- Declare `color-scheme: dark` at the root so native controls (scrollbars, selects, date pickers) render dark.
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (metadata and labels), loaded with `display=swap` and only the weights listed in the tokens.

---

## 9. Accessibility Rules

- Semantic elements first: `header`, `nav`, `main`, `section`, `footer`, `button`, `a`, `form`, `label`. A control that navigates is a link; one that acts is a button. Never a clickable `div`.
- One `h1` per page; headings do not skip levels.
- Icon-only buttons have an `aria-label` that includes context (for example "Remove Aurora Lamp from cart").
- Every `input`, `select`, and `textarea` has a visible `<label>` connected via `htmlFor` and `id`. Errors are connected using `aria-describedby` and `aria-invalid`.
- Keyboard: every interactive element is reachable and operable, tab order is logical, Escape closes drawers, focus returns to the trigger after a drawer closes.
- Drawers use the native `<dialog>` element opened with `showModal()` to obtain focus trapping, Escape handling, and background inertness without a library.
- Focus styles use the focus tokens, are applied with `:focus-visible`, and are never removed.
- Every `img` has meaningful alt text (product images: product name plus view number). Decorative images use `alt=""`.
- Ratings include text such as "Rated 4.5 out of 5 from 128 reviews" (visually hidden when the visible text is numeric).
- Dynamic updates (result count, cart changes, form errors) are announced through polite live regions. The toast region is `role="status"`.
- Color is never the only signal: the discount badge includes text; errors include an icon and text.
- Contrast: essential text meets 4.5:1. `--color-muted-fg` (`#71717A`) is only for decorative, disabled, or large text. Readable secondary text uses `--color-fg-secondary`.
- Respect `prefers-reduced-motion`: disable shimmer, slides, and lifts.
- Touch targets are at least 44 by 44 CSS pixels.

---

## 10. Responsive Rules

- Design mobile-first at 320px. Breakpoints: 640, 768, 1024, 1280.
- No horizontal scrolling at any width. Images use fixed aspect ratios.
- Mobile and tablet use drawers for navigation and filters; desktop (1024 and up) uses inline navigation and the filter sidebar.
- `ProductGrid` has two variants: `listing` (2 columns below 640, 3 columns from 640) and `rail` (2 columns below 768, 4 columns from 768).
- Cart and checkout are single-column below 1024 and two-column with a sticky summary from 1024.
- Do not hide essential functionality on small screens.

---

## 11. Performance Rules

- Do not optimize prematurely. Add `useMemo`, `useCallback`, or `React.memo` only after observing a real problem, and note the reason in a comment.
- Use `loading="lazy"` for off-screen images and set explicit dimensions or aspect ratios on all images. Hero or first-screen images are not lazy-loaded.
- Debounce search input by `SEARCH_DEBOUNCE_MS` (250ms).
- Load fonts with `display=swap`; limit weights to those in the tokens.
- Import named icons from the icon library; never import a whole icon set.
- Route-level code splitting is optional and not needed for v1.

---

## 12. Error Handling Rules

- Service functions return data or throw. Callers handle failures with explicit loading and error states.
- Catalog failure shows `ErrorState` with a Retry button that calls `reload()` from `useCatalog`.
- Unknown route parameters render a not-found state, never a blank page or crash.
- Storage failures are swallowed safely (section 5.6).
- Never show raw error messages or stack traces to users. Log to the console in development only.
- An app-level error boundary is P2 (F-30). Until then rely on defensive rendering.
- Form validation errors are data (an object keyed by field name), not exceptions.
- Mock auth failures return `{ ok: false, error }` results; they do not throw.

---

## 13. Loading, Empty, and Error State Rules

- Every data-dependent view handles four states explicitly, in this order: **loading → error → empty → content**.
- Use the shared `Skeleton` primitive, `EmptyState`, and `ErrorState`. Page-specific skeleton compositions (for example `ProductCardSkeleton`) are allowed only when built from `Skeleton`.
- Skeleton dimensions match the final layout to prevent layout shift.
- Empty states always include a next action (a link or a button).
- Catalog-dependent pages wrap their content in `CatalogGate`, which renders the supplied skeleton while loading and `ErrorState` on failure.
- Not-found cases reuse `EmptyState` with an `eyebrow` of "404".

---

## 14. Git Rules

- One branch per phase (for example `phase-4-listing`). Merge only when the phase's acceptance checks in `HANDOFF.md` pass.
- Conventional-style commit messages: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `chore:`. Imperative mood. One logical change per commit.
- Never commit `node_modules`, build output, or environment files.
- Update `CURRENT_STATE.md` at the end of every phase, in the same merge as the work.
- The six documents live in `docs/` in the repository. Changes to them are `docs:` commits.

---

## 15. Dependency Rules

- Approved runtime dependencies: React, React DOM, React Router, Lucide React. Nothing else without a written justification in `TECH_STACK.md`.
- Approved dev tooling: Vite, the Vite React plugin, ESLint (with the React hooks plugin). Optional: Vitest for pure utils, Prettier.
- Prefer platform features (`Intl`, `crypto.getRandomValues`, `<dialog>`, CSS) over libraries.
- No state libraries, UI kits, form libraries, validation libraries, animation libraries, date libraries, CSS frameworks, or HTTP clients.

---

## 16. Anti-Overengineering Rules

1. No component over roughly 150 lines.
2. No context that holds unrelated concerns. No more than five contexts.
3. No abstraction until its second real use. No generic factory, wrapper, or "base" components.
4. **Custom hooks are limited to:** `useLocalStorage`, `useDebounce`, `useDocumentTitle`, plus the five context consumer hooks. Any other custom hook needs a written justification here first.
5. No duplicated components and no duplicated product data.
6. No premature optimization (section 11).
7. No excessive dependencies (section 15).
8. No TypeScript, no PropTypes. Data shapes are documented in comments in the data files and in `HANDOFF.md`.
9. No feature that does not trace to a PRD item. If it is not in `PRD.md`, it is not built.
10. No placeholder or dead UI: a visible control must work, or it is not rendered.
11. Do not start the next phase until the current phase's acceptance checks pass.
