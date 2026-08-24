---
id: chien-luoc-migrate-tu-pages-router-sang-app-router-la-gi-hai-router-co-chay-song
position: backend
technology: migration
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chiến lược migrate từ Pages Router sang App Router là gì? Hai router có chạy song song được không?

## Question (EN)
What's the strategy for migrating from Pages Router to App Router, and can the two routers run side by side?

## Đáp án chi tiết (VI)
$7a

## Detailed Answer (EN)
**Yes — `pages/` and `app/` can coexist**, so you migrate **incrementally** instead of a full rewrite. This is a core design point of Next.js for the transition.\
\
**Rule:** if a route exists in both, **`app/` wins** (the build warns on conflicts). Migrate route by route, leaf to root.\
\
**Main steps:**\
1. **Create `app/layout.tsx`** to replace `_app` + `_document` (move `\u003chtml\u003e`/`\u003cbody\u003e` here).\
2. **Move data fetching:** `getServerSideProps` → fetch directly in a Server Component; `getStaticProps` → fetch + `generateStaticParams`; `getStaticPaths` → `generateStaticParams`.\
3. **`next/router` → `next/navigation`** (`useRouter`, `usePathname`, `useSearchParams`) in Client Components.\
4. **Add `'use client'`** to components using hooks/events; the rest default to Server Components.\
5. **API routes** `pages/api` → **Route Handlers** `app/api/.../route.ts`.\
\
**Note:** don't bulk-port — migrate low-risk routes first and re-measure, since App Router's caching and rendering semantics differ significantly.
