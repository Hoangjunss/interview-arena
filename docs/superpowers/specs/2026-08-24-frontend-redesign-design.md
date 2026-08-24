# Frontend Redesign — Design Spec

Date: 2026-08-24
Status: Approved for planning

## Problem

The `web/` frontend (Vite + React 19 + React Router 7) currently has no
design system: every page hand-rolls inline `style={{ ... }}` objects,
shares a handful of loosely-named CSS classes (`.btn-primary`,
`.auth-card`, `.home-container`), still carries leftover Vite-template
CSS (`.hero`, `#next-steps`, `.ticks` in `App.css`), and has no shared
navigation — every page reinvents its own "Quay lại / Thoát" link back
to `/`. Status colors (success/warning/danger) are hardcoded hex per
page instead of design tokens. Loading/error/empty states are ad-hoc
plain text. The result reads as a prototype, not a production product.

Goal: give Interview Arena a distinctive, production-grade look —
dark-mode-first, developer-centric — without changing any backend
contract, API shape, or user-facing copy (Vietnamese strings must stay
verbatim so existing RTL tests keep passing).

## Non-goals

- No backend/API changes.
- No new features (no fake data, no chart data not already returned
  by `progressApi`, etc.).
- No copy changes — user-visible Vietnamese text stays exactly as-is.
- No sidebar-based layout (rejected — 4 top-level sections don't need
  one).

## Stack

- **Tailwind CSS v4** (Vite plugin) for utility styling, replacing
  inline `style={{}}` objects and the ad-hoc CSS classes.
- **shadcn/ui** components copied into `src/components/ui/*` (Radix
  primitives underneath): `Button`, `Card`, `Badge`, `Input`, `Select`,
  `Textarea`, `Dialog`, `Tabs`, `Skeleton`, `Alert`, `Sonner` (toast).
  These are plain editable React+CSS in the repo, not an opaque
  dependency.
- **lucide-react** for icons, replacing emoji (🤖📈🎯🗂️).
- Keep `react-markdown` + the existing `MarkdownRenderer` component,
  restyled via Tailwind's typography (`prose`) classes.

## Design tokens

- Dark-mode-first palette: background near-black (`zinc-950`
  territory), foreground light gray, following the same dark values
  already defined under `@media (prefers-color-scheme: dark)` in
  `index.css` today — this becomes the *default* theme rather than the
  media-query fallback. Light mode remains available via
  `prefers-color-scheme: light` for parity, not primary.
- Keep the current accent hue family (`#aa3bff` purple, `#c084fc` in
  dark) so the app doesn't lose its existing identity — carried into
  Tailwind as `--color-accent`.
- Semantic status colors become real tokens (`--color-success`,
  `--color-warning`, `--color-danger`) instead of hardcoded hex
  (`#10b981`, `#f59e0b`, `#ef4444`) repeated across
  Flashcards/Quiz/InterviewSession pages.
- Monospace font (system mono stack, e.g. `ui-monospace, "JetBrains
  Mono", Consolas`) applied to metadata badges (position/tech/level),
  scores, and code — reinforcing the developer-tool feel.

## Layout & navigation

- New `AppShell` component wrapping every authenticated route: slim
  top header with wordmark, primary nav (Kho câu hỏi / Flashcards /
  Phỏng vấn AI / Tiến độ) with active-route highlighting, and a
  user menu (avatar-initials dropdown with Đăng xuất) replacing the
  scattered per-page "Quay lại" links.
- Unauthenticated routes (`/login`, `/register`) keep a minimal
  centered layout with no nav — unchanged flow, restyled with
  shadcn `Card`.
- Mobile: top nav collapses into a hamburger sheet (shadcn `Sheet`).
- One shared page-content container (max-width + consistent padding
  scale) replaces the copy-pasted `maxWidth: 'Npx', margin: '0 auto'`
  inline style on every page.

## Shared interaction patterns (cross-cutting)

Every data-fetching page currently shows one of: nothing, a plain
"Đang tải..." string, or a plain error sentence. Standardize to three
explicit states everywhere data is fetched:

- **Loading** → shadcn `Skeleton` shaped like the eventual content
  (not a spinner-only screen).
- **Error** → shadcn `Alert` (destructive variant) with the existing
  error message text plus a retry action where the page already has a
  retry-able fetch function.
- **Empty** → a styled placeholder (icon + existing copy), not a bare
  paragraph.

Transient feedback (quiz submit failure, interview answer submit
failure — currently only `console.error`) gets a `Sonner` toast so
failures are visible to the user, matching what the error state text
already implies should happen.

## Page-by-page treatment

- **Home**: real hero for logged-out users (unchanged CTAs/copy,
  restyled). Logged-in view becomes a light dashboard: existing
  greeting text plus the current 4 action links restyled as `Card`
  tiles; optionally surfaces due-flashcards-count / last-score if
  cheaply available from already-called APIs — otherwise stays
  link-tiles only (no new API calls added to Home in this pass).
- **Question Bank**: filter bar as a `Card` containing shadcn
  `Select`/`Input`; list rows become clickable `Card`s with `Badge`
  for position/tech/level; pagination restyled with shadcn button
  group. Empty/loading/error per the shared pattern above.
- **Question Detail**: content in a `Card` with `prose` typography;
  action buttons (Quiz/Back) restyled, sticky on scroll for long
  content.
- **Flashcards**: real 3D flip (CSS `transform-style: preserve-3d` +
  `backface-visibility`) instead of the current one-shot `rotateY`
  snap; 4 rating buttons become `Button` variants (destructive/warning/
  accent/success) mapped to Again/Hard/Good/Easy, with number-key
  (1-4) shortcuts added; remaining-count shown as a small progress
  indicator.
- **Quiz**: options become selectable `Card`/list items with a real
  reveal transition on submit (replacing the instant background-color
  swap); correct/incorrect still uses success/danger tokens.
- **Interview Setup**: form fields unchanged, wrapped in shadcn `Card`
  + `Select`/`Input`.
- **Interview Session**: keep the existing chat-bubble structure
  (already the right shape) — restyle bubbles with clearer
  AI/user labeling, add a typing-indicator animation for the existing
  "AI đang suy nghĩ..." state, keep auto-scroll-to-bottom behavior,
  restyle the completion state's score display as a radial/gauge
  element instead of a pill, keep the failed-state alert.
- **Progress**: 4 stat cards restyled with `lucide-react` icons
  instead of emoji; advice card unchanged copy in an `Alert`/`Card`
  variant. No new metrics invented.
- **Login / Register**: unchanged fields/flow, shadcn `Card` + `Input`
  + `Button`, existing error alert restyled as shadcn `Alert`.

## Testing strategy

Existing tests (`*.test.tsx` per page) query via `screen.getByText`/
`getByRole` on visible copy, not class names or DOM structure — so a
purely visual restyle is safe as long as:

1. All existing user-facing Vietnamese strings are preserved verbatim.
2. Interactive elements keep the same accessible role/name (e.g., a
   restyled button must still be a `<button>` with the same visible
   text, not a `<div onClick>`).

After each page is redesigned: run `npx vitest run` for that page's
test file, then `npm run lint` (oxlint) and `npm run build` (tsc + vite
build) before moving to the next page, to catch regressions early
rather than at the end.

## Rollout

Single pass, in this order:

1. Install & configure Tailwind v4 + shadcn/ui; port design tokens
   into Tailwind theme config; build the base primitive set used
   across pages (Button, Card, Badge, Input, Select, Textarea, Alert,
   Skeleton, Sonner, Dialog, Sheet).
2. Build `AppShell` (header/nav) and wire it into routes that need it
   (all except `/login`, `/register`).
3. Redesign pages in dependency order: Login/Register → Home →
   Question Bank → Question Detail → Quiz → Flashcards →
   Interview Setup → Interview Session → Progress.
4. Remove now-dead CSS (`App.css` leftovers, superseded classes in
   `index.css`) once no page references them.

Each step ends with vitest + lint + build passing before proceeding.
