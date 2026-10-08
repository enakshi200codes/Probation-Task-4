# DESIGN_TOKENS.md — Nocturne: Design Token Specification

**Direction: Minimalist Dark.** Atmospheric, sophisticated, calm, premium, nocturnal, refined, spacious, warm, modern.

**Principles**
- Layered darkness, never pure black: page, alt page, and raised surfaces form three distinct layers.
- One restrained warm amber accent. Everything else is neutral.
- Glass-effect only where `RULES.md` permits (header, drawers, hero panels).
- Soft rounded corners, subtle borders, subtle shadows, small ambient amber glows, generous whitespace.
- Smooth, small, calm motion.

**Avoid:** pure black everywhere, excessive gradients, neon colors, cold blue-heavy palettes, excessive rounded cards, excessive glow, huge animations, generic template-like e-commerce styling.

**Implementation contract.** All tokens are CSS custom properties declared once on `:root` in `src/styles/tokens.css`. Component CSS references tokens only (`RULES.md` section 8). Declare `color-scheme: dark` on the root. Values in this document are the source of truth. The token names below are final.

---

## 1. Colors

### 1.1 Core palette (supplied by the project brief)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0A0A0F` | Page background (base layer) |
| `--color-bg-alt` | `#12121A` | Alternate sections, footer, input fields, drawers (second layer) |
| `--color-fg` | `#FAFAFA` | Primary text |
| `--color-muted` | `#1A1A24` | Muted and raised surface: chips, skeletons, image placeholders, secondary buttons (third layer) |
| `--color-muted-fg` | `#71717A` | Decorative, disabled, or large text only (see 1.3) |
| `--color-accent` | `#F59E0B` | Primary actions, discount text, active states, rating stars, focus |
| `--color-accent-fg` | `#0A0A0F` | Text and icons placed on the accent color |
| `--color-accent-muted` | `rgba(245, 158, 11, 0.15)` | Accent tints: discount badge background, selected states, active chips |
| `--color-border` | `rgba(255, 255, 255, 0.08)` | Default borders and dividers |
| `--color-border-hover` | `rgba(255, 255, 255, 0.15)` | Hover borders |
| `--color-card` | `rgba(26, 26, 36, 0.6)` | Translucent card surface |
| `--color-card-solid` | `#1A1A24` | Opaque card surface (toasts, drawers' inner cards) |
| `--color-focus-ring` | `#F59E0B` | Focus outline |

### 1.2 Semantic additions (the only additions to the supplied palette)

| Token | Value | Use |
|---|---|---|
| `--color-fg-secondary` | `#A1A1AA` | Readable secondary text, labels, placeholders, original (struck-through) prices |
| `--color-success` | `#6FBF8E` | Success text and icons (muted, non-neon) |
| `--color-danger` | `#E5736B` | Errors and destructive text (muted, warm) |
| `--color-overlay` | `rgba(0, 0, 0, 0.6)` | Drawer scrim (dialog backdrop) |
| `--color-highlight` | `rgba(255, 255, 255, 0.04)` | Skeleton shimmer highlight and top-edge highlights |

No blue is introduced. Warnings reuse the accent. Pure black is never used for surfaces; `--color-overlay` is the only black-based value and it is a transparent scrim.

### 1.3 Contrast notes (computed approximate ratios)

| Combination | Ratio | Verdict |
|---|---|---|
| `--color-fg` on `--color-bg` | about 19:1 | Pass |
| `--color-fg-secondary` on `--color-bg` | about 7.7:1 | Pass (AA and AAA) |
| `--color-fg-secondary` on `--color-muted` | about 6.7:1 | Pass |
| `--color-accent` on `--color-bg` | about 9:1 | Pass |
| `--color-accent-fg` on `--color-accent` | about 9:1 | Pass |
| `--color-danger` on `--color-bg` | about 6.6:1 | Pass |
| `--color-success` on `--color-bg` | about 8.9:1 | Pass |
| `--color-muted-fg` on `--color-bg` | about 4.1:1 | **Fails AA for small text** |
| `--color-muted-fg` on `--color-muted` | about 3.6:1 | **Fails AA for small text** |

**Rule:** `--color-muted-fg` is used only for decorative elements (empty star outlines, dividers' icons), disabled controls, or text at 24px and larger. All readable secondary text, labels, captions, helper text, and placeholders use `--color-fg-secondary`. Re-verify ratios with a contrast checker after implementation.

### 1.4 Surface layering

| Layer | Token | Typical elements |
|---|---|---|
| 0 | `--color-bg` | Page |
| 1 | `--color-bg-alt` | Footer, alternate Home sections, inputs, drawers |
| 2 | `--color-muted` / `--color-card-solid` | Raised controls, toasts, skeletons, image placeholders |
| Glass | `--color-card` | Product cards, summary panels, hero panel (blur only where allowed) |

---

## 2. Typography

### 2.1 Font families

| Token | Stack | Role |
|---|---|---|
| `--font-display` | `"Space Grotesk", system-ui, sans-serif` | Headlines, brand mark, prices, order totals |
| `--font-body` | `"Inter", system-ui, sans-serif` | Body copy and UI text |
| `--font-mono` | `"JetBrains Mono", ui-monospace, monospace` | Metadata and technical labels: category labels, badges, order IDs, specification keys, counts |

Load with `display=swap`. Load only the weights listed below.

### 2.2 Font sizes (16px root; rem)

| Token | Value | Typical use |
|---|---|---|
| `--text-xs` | `0.75rem` | Mono labels, captions, badges |
| `--text-sm` | `0.875rem` | Secondary text, helper and error text, buttons (small) |
| `--text-base` | `1rem` | Body, buttons, inputs |
| `--text-lg` | `1.125rem` | Lead text, product card prices |
| `--text-xl` | `1.25rem` | Subheadings |
| `--text-2xl` | `1.5rem` | Section headings (mobile) |
| `--text-3xl` | `1.875rem` | Section headings (desktop) |
| `--text-4xl` | `2.25rem` | Page titles |
| `--text-5xl` | `clamp(2.5rem, 6vw, 3.75rem)` | Hero headline (fluid) |

Inputs use at least `--text-base` so mobile browsers do not zoom on focus.

### 2.3 Font weights

| Token | Value | Use |
|---|---|---|
| `--weight-regular` | 400 | Body |
| `--weight-medium` | 500 | UI text, buttons, prices |
| `--weight-semibold` | 600 | Headings |
| `--weight-bold` | 700 | Display only (hero headline, order total) |

### 2.4 Line heights

| Token | Value | Use |
|---|---|---|
| `--leading-tight` | 1.15 | Display and hero |
| `--leading-snug` | 1.3 | Headings, card titles |
| `--leading-normal` | 1.6 | Body |
| `--leading-relaxed` | 1.75 | Long descriptions |

### 2.5 Letter spacing

| Token | Value | Use |
|---|---|---|
| `--tracking-tight` | `-0.02em` | Display headlines |
| `--tracking-normal` | `0` | Body |
| `--tracking-wide` | `0.04em` | Buttons |
| `--tracking-label` | `0.08em` | Uppercase mono labels |

### 2.6 Typographic roles

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero headline | display | `--text-5xl` | bold | tight leading and tracking |
| Page title (`h1`) | display | `--text-4xl` (mobile `--text-3xl`) | semibold | tight tracking |
| Section heading | display | `--text-2xl` / `--text-3xl` | semibold | snug leading |
| Card title | body | `--text-base` | medium | max 2 lines, ellipsis |
| Price | display | `--text-lg` (details: `--text-3xl`) | medium | |
| Body | body | `--text-base` | regular | normal leading |
| Metadata label | mono | `--text-xs` | regular | uppercase, label tracking, `--color-fg-secondary` |
| Button | body | `--text-base` | medium | wide tracking |
| Order ID | mono | `--text-xl` | medium | |

---

## 3. Spacing (4px base unit)

| Token | Value |
|---|---|
| `--space-0` | 0 |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |
| `--space-32` | 128px |

**Semantic spacing**

| Token | Mobile | Tablet (640+) | Desktop (1024+) |
|---|---|---|---|
| `--section-gap` | 64px | 80px | 96px |
| `--grid-gap` | 16px | 20px | 24px |
| `--page-gutter` | 16px | 24px | 32px |

---

## 4. Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Badges, small controls |
| `--radius-md` | 10px | Buttons, inputs |
| `--radius-lg` | 14px | Cards (maximum for cards) |
| `--radius-xl` | 20px | Hero panels, drawers |
| `--radius-full` | 9999px | Chips, icon buttons, cart badge |

Cards never exceed `--radius-lg`.

## 5. Borders

| Token | Value |
|---|---|
| `--border-width` | 1px |
| Default border | `--border-width solid --color-border` |
| Hover border | `--color-border-hover` |
| Selected border | `--border-width solid --color-accent` |
| Dividers | `--color-border` |

## 6. Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.4)` | Inputs, small controls |
| `--shadow-md` | `0 6px 20px rgba(0, 0, 0, 0.35)` | Card hover, toasts |
| `--shadow-lg` | `0 16px 48px rgba(0, 0, 0, 0.5)` | Drawers |
| `--shadow-inset-highlight` | `inset 0 1px 0 rgba(255, 255, 255, 0.04)` | Top-edge highlight on glass cards |

## 7. Ambient Glows

Used sparingly. Maximum alpha 0.20.

| Token | Value | Use |
|---|---|---|
| `--glow-accent-sm` | `0 0 24px rgba(245, 158, 11, 0.10)` | Product card hover |
| `--glow-accent-md` | `0 0 48px rgba(245, 158, 11, 0.16)` | Primary button hover, selected thumbnail |
| `--glow-ambient-hero` | A radial amber gradient at about 8% alpha, centered near the top of the hero and fading to transparent | Hero background only |
| `--glow-vignette` | A radial gradient from transparent in the center to `rgba(0, 0, 0, 0.25)` at the edges | Optional page vignette |

## 8. Opacity

| Token | Value | Use |
|---|---|---|
| `--opacity-disabled` | 0.45 | Disabled controls |
| `--opacity-hover-overlay` | 0.06 | Ghost button and icon button hover wash (white at this alpha) |
| `--opacity-muted` | 0.7 | Decorative elements |
| `--opacity-skeleton` | 0.5 | Skeleton base |

## 9. Breakpoints

| Name | Min width | Layout meaning |
|---|---|---|
| (base) | 0 | Mobile: 2-column grid, drawers, single-column pages |
| `sm` | 640px | 3-column listing grid; larger gutters |
| `md` | 768px | Rails go to 4 columns; footer groups in 4 columns; hero layout widens |
| `lg` | 1024px | Filter sidebar, inline navigation, two-column cart and checkout |
| `xl` | 1280px | Wide container |

CSS variables cannot be used in media queries. Write these values literally in CSS and mirror them in `BREAKPOINTS` in `config/constants.js`.

## 10. Container Widths

| Token | Value | Use |
|---|---|---|
| `--container-narrow` | 640px | Forms (login, signup), confirmation |
| `--container-content` | 1120px | Default pages (Home sections, product details, cart, checkout) |
| `--container-wide` | 1280px | Header and listing |

Horizontal padding equals `--page-gutter`. Other layout widths: `--sidebar-width` 260px (filter sidebar); `--drawer-width` `min(88vw, 360px)`.

## 11. Z-Index Layers

| Token | Value | Use |
|---|---|---|
| `--z-base` | 0 | Default |
| `--z-raised` | 10 | Card badges and overlays, wishlist heart |
| `--z-sticky` | 50 | Sticky summary and filter sidebar |
| `--z-header` | 100 | Sticky header |
| `--z-toast` | 500 | Toast region |

Drawers use the native `<dialog>` element, which renders in the browser top layer and needs no z-index. The toast region sits in the normal document flow above the header.

## 12. Transitions and Animation Timing

| Token | Value |
|---|---|
| `--duration-fast` | 120ms |
| `--duration-base` | 200ms |
| `--duration-slow` | 320ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--transition-colors` | `color`, `background-color`, `border-color` at `--duration-base` with `--ease-standard` |
| `--transition-transform` | `transform`, `box-shadow` at `--duration-base` with `--ease-standard` |

**Specific timings:** hover lift 200ms; drawer slide-in 320ms; toast enter 240ms and exit 160ms; page content fade-in 200ms; skeleton shimmer 1.6s linear, infinite.

**Limits:** maximum movement distance 8px (hover lift is 2px). No animation longer than 400ms except the shimmer.

**Reduced motion:** under `prefers-reduced-motion: reduce`, transitions collapse to near-instant, and shimmer, slides, lifts, and image scales are disabled (color changes remain).

## 13. Button Tokens

| Token or variant | Value |
|---|---|
| `--btn-height-sm` | 36px (compact contexts only; keep a 44px hit area through padding or a larger target) |
| `--btn-height-md` | 44px (default) |
| `--btn-height-lg` | 52px (hero, Place order) |
| `--btn-padding-x` | `--space-5` |
| `--btn-radius` | `--radius-md` |
| `--btn-font` | body, `--weight-medium`, `--tracking-wide` |
| **Primary** | Background `--color-accent`, text `--color-accent-fg`; hover adds `--glow-accent-md` and slightly brightens; active reduces brightness slightly and removes the glow |
| **Secondary** | Background `--color-muted`, text `--color-fg`, border `--color-border`; hover border `--color-border-hover` |
| **Ghost** | Transparent, text `--color-fg-secondary`; hover background white at `--opacity-hover-overlay`, text `--color-fg` |
| **Danger (text style)** | Text `--color-danger`, no fill; hover underline |
| **Disabled** | `--opacity-disabled`, no hover effects, `not-allowed` cursor |
| **Icon button** | 44 by 44px hit area, `--radius-full`, ghost styling |
| **Loading** | Disabled style plus the label changed (for example "Placing order…") |

## 14. Input Tokens

| Token | Value |
|---|---|
| `--input-height` | 44px |
| `--input-bg` | `--color-bg-alt` |
| `--input-border` | `--color-border` |
| `--input-border-hover` | `--color-border-hover` |
| `--input-border-focus` | `--color-accent` |
| `--input-radius` | `--radius-md` |
| `--input-padding-x` | `--space-4` |
| Placeholder | `--color-fg-secondary` (full opacity, to keep AA contrast) |
| Label | body, `--text-sm`, `--weight-medium`, `--color-fg-secondary`, above the field |
| Helper text | `--text-sm`, `--color-fg-secondary` |
| Error state | Border and message `--color-danger`; message includes an icon and text (not color alone) |
| Disabled | `--opacity-disabled` |
| Select | Same tokens as an input; native control with `color-scheme: dark` |
| Radio and checkbox | 20px control, accent color when checked, label hit area at least 44px high |

## 15. Card Tokens

| Token | Value |
|---|---|
| `--card-bg` | `--color-card` |
| `--card-bg-solid` | `--color-card-solid` |
| `--card-border` | `--border-width solid --color-border` |
| `--card-radius` | `--radius-lg` |
| `--card-padding` | `--space-5` (compact: `--space-4`) |
| `--card-shadow` | `--shadow-inset-highlight` |
| `--card-hover-border` | `--color-border-hover` |
| `--card-blur` | 12px, used only on the header, drawers, and hero panels |

## 16. Product Card Tokens

| Token or element | Value |
|---|---|
| `--product-card-image-ratio` | 4 / 5 |
| `--product-card-padding` | `--space-3` on mobile, `--space-4` from 640px |
| `--product-card-gap` | `--space-2` |
| Image background while loading | `--color-muted` |
| Category label | mono, `--text-xs`, uppercase, label tracking, `--color-fg-secondary` |
| Name | body, `--text-base`, `--weight-medium`, maximum 2 lines with ellipsis |
| Price | display, `--text-lg`, `--color-fg` |
| Original price | `--text-sm`, `--color-fg-secondary`, strikethrough |
| Discount badge | Top-left of the image, `--color-accent-muted` background, `--color-accent` text, mono, `--radius-sm`, text like "-20%" |
| Rating | Five stars (filled in `--color-accent`, empty outlines in `--color-muted-fg`), numeric value in mono, review count in `--color-fg-secondary` |
| Wishlist heart (P1) | Top-right 44px icon button on a translucent dark circle; outline by default, filled amber when active |
| Add to cart | Secondary button, full width; becomes amber on hover |
| Hover | Lift 2px, border to `--color-border-hover`, `--glow-accent-sm`, image scale 1.03 |
| Skeleton | Same ratio and dimensions as the real card |

## 17. Navigation Tokens

| Token or element | Value |
|---|---|
| `--nav-height` | 64px (mobile), 72px (from 1024px) |
| `--nav-bg` | `rgba(10, 10, 15, 0.72)` with `backdrop-filter: blur(--card-blur)` |
| `--nav-border` | Bottom `--border-width solid --color-border` |
| Link | `--color-fg-secondary`; hover `--color-fg`; active `--color-fg` with a 2px accent underline |
| Brand mark | display font, `--weight-semibold`, `--text-xl`, with a small amber dot or crescent accent |
| Cart badge | `--color-accent` background, `--color-accent-fg` text, mono `--text-xs`, `--radius-full`, minimum 18px, hidden when the count is 0 |
| Search field | Input tokens; on mobile revealed as a row beneath the header |
| Drawer width | `--drawer-width` |
| Footer | `--color-bg-alt` background, top border `--color-border`, link text `--color-fg-secondary` |

## 18. Modal and Drawer Tokens

| Token | Value |
|---|---|
| `--modal-overlay` | `--color-overlay` |
| `--modal-bg` | `--color-bg-alt` |
| `--modal-border` | `--border-width solid --color-border` |
| `--modal-radius` | `--radius-xl` (drawers round only the exposed edges) |
| `--modal-shadow` | `--shadow-lg` |
| `--modal-padding` | `--space-6` |
| Navigation drawer | Slides from the right, width `--drawer-width`, glass background |
| Filter drawer | Slides from the bottom, maximum height 85vh, with a header (title and close button) and a sticky footer button "Show N results" |
| Enter animation | `--duration-slow` with `--ease-out` |
| Exit | May be instant (native dialog limitation) |
| Backdrop | Native `::backdrop` styled with `--modal-overlay` |

## 19. Badge and Chip Tokens

| Variant | Style |
|---|---|
| Discount badge | `--color-accent-muted` background, `--color-accent` text, mono `--text-xs` |
| Tag badge (for example "Free shipping", category label chips) | `--color-muted` background, `--color-fg` text, `--color-border` border |
| Filter chip (active, P1) | `--color-accent-muted` background, accent border at low alpha, `--color-fg` text, trailing remove icon button |
| Filter chip (idle) | `--color-muted` background, `--color-border` border |
| Shape | `--radius-sm` for badges, `--radius-full` for chips; chip height 28px (hit area 44px through the remove button) |

## 20. Toast and Notification Tokens

| Token | Value |
|---|---|
| `--toast-bg` | `--color-card-solid` |
| `--toast-border` | `--color-border-hover` |
| `--toast-radius` | `--radius-lg` |
| `--toast-shadow` | `--shadow-md` |
| `--toast-padding` | `--space-4` |
| `--toast-width` | `min(92vw, 360px)` |
| Position | Bottom center on mobile; bottom right from 1024px; offset `--space-4` from edges |
| Types | Success: icon `--color-success`; error: icon `--color-danger`; info: icon `--color-accent`. Text is always `--color-fg`; the icon plus text carries the meaning |
| Duration | `--toast-duration`: 3500ms |
| Motion | Enter 240ms (fade and 8px rise), exit 160ms |
| Accessibility | The container is `role="status"` (polite live region) |

## 21. Skeleton Tokens

| Token | Value |
|---|---|
| Base color | `--color-muted` at `--opacity-skeleton` |
| Shimmer | A moving band of `--color-highlight`, 1.6s linear infinite; disabled under reduced motion |
| Radius | Matches the element it replaces |

## 22. Focus State Tokens

| Token | Value |
|---|---|
| `--focus-ring-width` | 2px |
| `--focus-ring-offset` | 2px |
| `--focus-ring-color` | `--color-focus-ring` |

Rules: apply with `:focus-visible`; the ring follows the element's radius; never remove it. Inputs also change their border to `--input-border-focus`. On amber buttons the ring uses an offset so it remains visible against the dark background.

## 23. Hover States

| Element | Hover |
|---|---|
| Primary button | Glow `--glow-accent-md`, slight brightening |
| Secondary button | Border to `--color-border-hover` |
| Ghost button and icon button | White wash at `--opacity-hover-overlay`; text to `--color-fg` |
| Link | Text to `--color-fg`; underline offset appears |
| Nav link | Text to `--color-fg` |
| Product card | Lift 2px, border `--color-border-hover`, `--glow-accent-sm`, image scale 1.03 |
| Category tile | Border `--color-border-hover`, icon tinted `--color-accent`, `--glow-accent-sm` |
| Gallery thumbnail | Border `--color-border-hover` |
| Input | Border `--color-border-hover` |
| Chip | Border `--color-border-hover` |

Hover effects are applied only under `@media (hover: hover)` so touch devices do not stick on hover.

## 24. Active (Pressed and Selected) States

| Element | State |
|---|---|
| Button, icon button | Pressed: scale 0.98 and no glow |
| Nav link (current page) | `--color-fg` with a 2px accent underline |
| Gallery thumbnail (selected) | 1px accent border and `--glow-accent-md` |
| Filter option (selected) | Accent radio or checkbox; label `--color-fg` |
| Pagination (current page) | `--color-accent-muted` background, `--color-accent` text, `aria-current="page"` |
| Wishlist heart (active) | Filled `--color-accent` |
| Sort and select (open) | Native control with dark color scheme |
