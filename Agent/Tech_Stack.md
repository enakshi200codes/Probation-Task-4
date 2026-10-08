# TECH_STACK.md — Nocturne: Technology Stack

**Principle:** the lightest stack that correctly solves the problem and can be explained in a viva or interview. Every dependency must earn its place. The project must use React.

**Status labels:** **REQUIRED** (the project cannot meet its brief without it), **RECOMMENDED** (the default choice; a simpler alternative exists but is worse for this project), **OPTIONAL** (nice to have; skip if time is short).

**Version policy:** use the current stable major versions of each tool at project setup time. Record the exact versions in `package.json`. Where a library's API has changed between majors (notably React Router), follow the official documentation for the installed version, and keep to the declarative-mode usage described in `RULES.md` section 4.

---

## 1. Summary

| Concern | Choice | Status |
|---|---|---|
| UI library | React (function components and hooks) | REQUIRED |
| Build tool and dev server | Vite with the React plugin | RECOMMENDED |
| Routing | React Router (declarative mode, `BrowserRouter`) | REQUIRED |
| Global state | Context API (five contexts) | REQUIRED |
| Language | JavaScript (ES modules), no TypeScript | RECOMMENDED |
| Styling | CSS custom properties (design tokens) plus CSS Modules | RECOMMENDED |
| Icons | Lucide React (named imports) | RECOMMENDED |
| Fonts | Google Fonts: Space Grotesk, Inter, JetBrains Mono | RECOMMENDED |
| Product data | Local seeded data behind an async service | REQUIRED (decision) |
| Persistence | Browser LocalStorage through one util and one hook | REQUIRED |
| Forms | Native controlled inputs with `useState` | REQUIRED (decision) |
| Validation | Hand-written pure functions in `utils/validators.js` | REQUIRED (decision) |
| Order ID generation | `crypto.getRandomValues` with a readable alphabet | RECOMMENDED |
| Drawers | Native `<dialog>` element | RECOMMENDED |
| Linting | ESLint with the React Hooks plugin | RECOMMENDED |
| Formatting | Prettier | OPTIONAL |
| Unit tests | Vitest for pure utils | OPTIONAL |
| Deployment | Static host (Netlify or Vercel) with SPA fallback | RECOMMENDED |

**Runtime dependencies (total: 4):** `react`, `react-dom`, `react-router` (or `react-router-dom`, depending on the installed major version's documentation), `lucide-react`.
**Dev dependencies:** `vite`, `@vitejs/plugin-react`, `eslint` (plus its React and hooks plugins), optionally `vitest` and `prettier`.

---

## 2. Technology Evaluations

### 2.1 React — REQUIRED
- **Why:** the project brief requires it. Function components with hooks cover every required concept: components, props, state, events, conditional rendering, array methods, Context, `useEffect`.
- **Problem solved:** declarative UI that stays in sync with cart, filter, and form state.
- **Simpler alternative:** vanilla JavaScript. Not acceptable for this brief.

### 2.2 Vite — RECOMMENDED
- **Why:** fast dev server, minimal configuration, the standard way to start a React single-page app, simple static build output.
- **Problem solved:** bundling, hot reload, environment handling, production build.
- **Alternatives:** Create React App is deprecated and should not be used. Next.js adds server concepts (routing, SSR) that conflict with the "React Router and Context" learning goals and are explicitly out of scope.

### 2.3 React Router — REQUIRED
- **Why:** the brief requires React Router. The project has real routing needs: a listing, a detail page with a path parameter, checkout, a confirmation page with a path parameter, and query parameters for filters.
- **Problem solved:** multi-page navigation without page reloads; shareable URLs for product details and filtered listings; `useSearchParams` for filter state.
- **Usage constraint:** declarative mode only (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, `useParams`, `useSearchParams`, `useNavigate`, `useLocation`). No data routers, loaders, or actions (they hide the concepts we want to demonstrate).
- **Simpler alternative:** conditional rendering based on a state variable. That would lose deep links and the Back button, and would not meet the brief.

### 2.4 Context API — REQUIRED
- **Why:** the brief requires it, and it has natural uses: the cart, wishlist, auth user, catalog, and toasts are read in many unrelated places (header badge, cards, details page, cart page).
- **Problem solved:** avoids prop drilling for shared state.
- **Constraint:** exactly five small contexts (`RULES.md` section 3). No state library.
- **Simpler alternative:** prop drilling. Impractical here. **Heavier alternatives rejected:** Redux, Zustand, Jotai — unnecessary for this scale and they obscure the React concepts being demonstrated.

### 2.5 JavaScript versus TypeScript — JavaScript (RECOMMENDED)
**Critical evaluation.**

| Factor | TypeScript | JavaScript |
|---|---|---|
| Catches data-shape mistakes early | Strong benefit | Relies on discipline and lint |
| Learning load | Adds generics, typed context, typed props, typed events | None extra |
| Viva explainability | Time spent explaining types instead of React ideas | Direct |
| Project size | About 30 products, 10 pages, 5 contexts: small | Fine |
| Portfolio signal | Positive in the industry | Neutral, but fine for a React fundamentals project |

**Decision:** plain JavaScript. The project's purpose is to demonstrate React fundamentals, and the data shapes are small and fully documented in `HANDOFF.md` section 7. TypeScript is a reasonable follow-up migration but would add complexity for little benefit here. Data shapes are described in comments in the data files. PropTypes are not used either (`RULES.md` section 16).

### 2.6 CSS approach — CSS custom properties plus CSS Modules (RECOMMENDED)

| Option | Strengths | Weaknesses for this project |
|---|---|---|
| **Plain global CSS** | Zero tooling | Class-name collisions; hard to keep 30-plus components organized; styles leak |
| **CSS Modules + CSS variables (chosen)** | Scoped class names with no runtime cost; ships with Vite; the design tokens are literally CSS variables, so the `DESIGN_TOKENS.md` spec maps one-to-one; easy to explain | Slightly more files (one `.module.css` per component) |
| **Tailwind CSS** | Fast utility styling; large ecosystem | Extra dependency and build plugin; long class lists in JSX hurt readability and viva explanation; the custom, token-driven Minimalist Dark system would have to be re-expressed as a Tailwind theme; arbitrary-value temptation conflicts with "no magic numbers"; hides the CSS skills a student should show |
| **CSS-in-JS (styled-components, Emotion)** | Co-located styles | Runtime cost; extra dependency; unnecessary |

**Decision:** CSS custom properties in `tokens.css` plus `base.css` plus one CSS Module per component. No CSS framework.

### 2.7 Icon library — Lucide React (RECOMMENDED)
- **Why:** clean, consistent, line-style icons that suit the refined aesthetic; tree-shakable named imports; stroke width and size are controllable.
- **Problem solved:** cart, heart, search, menu, close, star, plus, minus, trash, check, alert, chevron icons without hand-drawing SVGs.
- **Simpler alternative:** inline SVG components written by hand. Workable for fewer than ten icons, but the project needs more than twenty. Import named icons only.

### 2.8 Fonts — Google Fonts (RECOMMENDED)
- **Why:** Space Grotesk, Inter, and JetBrains Mono are the specified typefaces and are all available from Google Fonts.
- **Method:** a stylesheet link in `index.html` with `display=swap` and only the weights in `DESIGN_TOKENS.md`. Every font token has a system fallback stack.
- **Alternative:** self-hosting via a font package (adds dependencies). Choose it only if offline demos are required.

### 2.9 Product data source — local seeded data behind an async service (REQUIRED decision)
- **What:** `data/products.js` (30 products), `categories.js`, `reviews.js`, `promos.js`, exposed through `catalogService.loadCatalog()`, which returns a Promise that resolves after a simulated delay (`CATALOG_LATENCY_MS`, about 600ms).
- **Why not a public API (DummyJSON, Fake Store API)?**
  - The data cannot be shaped to the theme (categories, `createdAt`, specifications, featured and popular flags).
  - It adds network failure during a live demo, rate limits, and CORS concerns.
  - Image URLs and field names are outside our control.
  - The first version needs predictable data for acceptance testing.
- **Why still async?** The service boundary gives real loading and error states, a natural `useEffect` use in `CatalogContext`, and a one-file swap to a real API later.
- **Simpler alternative:** importing the data directly into components. Rejected: it removes the loading and error states, couples components to data, and makes future API migration harder.
- **Images:** remote stock photo URLs by default (see `CURRENT_STATE.md` Pending Decisions) with a graceful fallback in `ProductImage`. Local bundled images are the offline-safe alternative.

### 2.10 LocalStorage — REQUIRED
- **Why:** the brief requires it; it gives the cart, wishlist, recent items, orders, users, and session real persistence without a backend.
- **Problem solved:** state survives refresh and revisit.
- **Constraints:** one `storage` util, one `useLocalStorage` hook, namespaced and versioned keys, validators per key, safe fallback on corrupt data (`RULES.md` section 5).
- **Alternatives:** IndexedDB (overkill for small JSON), cookies (wrong tool), a persistence library (unnecessary).

### 2.11 Form handling — native controlled inputs (REQUIRED decision)
- **Why:** there are only three small forms (checkout, login, signup). Controlled inputs with `useState` and submit handlers demonstrate state and events directly.
- **Rejected:** React Hook Form and Formik. They are good libraries, but they would hide the concepts the project is meant to show.

### 2.12 Form validation — hand-written pure functions (REQUIRED decision)
- **Why:** rules are simple (required, email format, phone digit count, minimum lengths). Pure functions return an errors object keyed by field name, are trivially testable, and are easy to explain.
- **Rejected:** Yup, Zod. A schema library is unnecessary for about fifteen fields.
- **Pattern:** `validateCheckoutForm(values)`, `validateLoginForm(values)`, `validateSignupForm(values)` each return `{ fieldName: "message" }` and an empty object means valid.

### 2.13 Order ID generation — `crypto.getRandomValues` (RECOMMENDED)
- **Format:** `NOC-XXXX-XXXX` where each X is drawn from an unambiguous uppercase alphabet that excludes 0, O, 1, I, and L.
- **Why:** collision-resistant, human-readable, no dependency. The generator checks stored orders to avoid duplicates.
- **Alternatives:** `Date.now()` (collides and leaks timing), `uuid` package (unnecessary dependency and an ugly ID for a customer), `crypto.randomUUID` (valid but not customer-friendly).

### 2.14 Drawers — native `<dialog>` (RECOMMENDED)
- **Why:** `showModal()` gives focus trapping, Escape-to-close, and background inertness for free, which matters for accessibility and avoids a modal library or a hand-written focus trap.
- **Limitation:** exit animations are limited; the enter animation is sufficient.
- **Alternative:** a custom focus-trapped div or a headless UI library. More code or more dependencies for the same result.

### 2.15 Linting and formatting — ESLint RECOMMENDED, Prettier OPTIONAL
- ESLint with the React Hooks rules protects the `useEffect` dependency rules that the project depends on. Prettier is a convenience only.

### 2.16 Testing — Vitest for pure utils OPTIONAL; manual QA checklist REQUIRED
- The valuable logic (pricing, filtering, sorting, validation, order building, storage fallback) is in pure functions, which are easy to unit test. If time is limited, rely on the manual QA checklist in `HANDOFF.md` section 18.
- Component or end-to-end test frameworks are out of scope for v1.

### 2.17 Deployment — static host with an SPA fallback (RECOMMENDED)
- Netlify or Vercel serve the Vite build output and need a rewrite rule that sends unknown paths to `index.html` (required for `BrowserRouter` deep links such as `/products/p-004`).
- GitHub Pages cannot provide that rewrite. In that case use `HashRouter` (the only permitted router deviation) and record it in `CURRENT_STATE.md`.

---

## 3. Explicitly Rejected Libraries

| Library type | Examples | Reason |
|---|---|---|
| State management | Redux Toolkit, Zustand, Jotai, MobX | Context covers this scale and is a required concept |
| Data fetching | Axios, TanStack Query, SWR | No real API in v1; a service plus `useEffect` suffices |
| UI kits | MUI, Chakra, Ant Design, shadcn | Conflicts with the custom design system |
| CSS frameworks | Tailwind, Bootstrap | See 2.6 |
| Animation | Framer Motion, GSAP | Small CSS transitions suffice; limits are in `DESIGN_TOKENS.md` |
| Forms and validation | React Hook Form, Formik, Yup, Zod | See 2.11 and 2.12 |
| Dates and utilities | date-fns, moment, lodash | `Intl` and native array methods suffice |
| IDs | uuid, nanoid | See 2.13 |
| Typing | TypeScript, PropTypes | See 2.5 |
| Carousel | Swiper, Embla | The gallery is thumbnails plus a main image |

Adding any dependency requires a written justification in this file and approval in `RULES.md` section 15.

---

## 4. Browser and Platform Targets

- Current evergreen versions of Chrome, Edge, Firefox, and Safari on desktop and mobile.
- Required platform features: ES modules, CSS custom properties, CSS Grid and Flexbox, `<dialog>`, `crypto.getRandomValues`, `Intl.NumberFormat`, `Intl.DateTimeFormat`, LocalStorage, `backdrop-filter` (graceful degradation: a more opaque background when unsupported).

## 5. Scripts

Use the standard Vite script set: `dev`, `build`, `preview`, and a `lint` script. If Vitest is adopted, add a `test` script. No other scripts.

## 6. Viva and Interview Talking Points

| Question | Answer from this stack |
|---|---|
| Why Context and not Redux? | Five small, focused contexts match the app's size. Redux would add boilerplate without a real need |
| Why is the cart only IDs and quantities? | One source of truth for product data. Prices cannot become stale or inconsistent |
| Why is filter state in the URL? | Shareable links, working Back button, refresh-safe, no extra global state |
| Why derive totals instead of storing them? | Stored totals can drift out of sync. Derived values are always correct |
| Why a service layer for local data? | Real loading and error states, and a one-file swap to a real API |
| Why CSS Modules and tokens? | Scoped styles with no runtime cost, and one-to-one mapping to the design system |
| Why JavaScript, not TypeScript? | Focus on React fundamentals; the data shapes are small and documented |
| How is corrupt LocalStorage handled? | Validators plus safe fallback to defaults; never crashes |
| How are orders kept consistent after price changes? | Orders store price snapshots |
