---
id: dynamic-routes-va-catch-all-routes-trong-next-js-app-router
position: backend
technology: app-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dynamic routes và catch-all routes trong Next.js App Router?

## Question (EN)
How do dynamic routes and catch-all routes work in the Next.js App Router?

## Đáp án chi tiết (VI)
Dynamic routes trong App Router sử dụng cú pháp folder name trong ngoặc vuông, ví dụ app/blog/[slug]/page.tsx sẽ match URL /blog/anything. **Next.js 15:** `params` là Promise — cần `const { slug } = await params` trong async Server Component, hoặc `React.use(params)` trong Client Component. Catch-all routes dùng app/[...slug]/page.tsx để match nhiều segments như /a/b/c (params.slug là mảng). Optional catch-all app/[[...slug]]/page.tsx còn match root route. TypeScript: `{ params: Promise\u003c{ slug: string }\u003e }` cho dynamic route.

## Detailed Answer (EN)
Dynamic routes use bracket folder names: `app/blog/[slug]/page.tsx` matches `/blog/anything`. **Next.js 15:** `params` is a Promise — use `const { slug } = await params` in async Server Components or `React.use(params)` in Client Components. Catch-all routes use spread syntax `app/[...slug]/page.tsx` to match multiple segments (`params.slug` is an array). Optional catch-all `app/[[...slug]]/page.tsx` also matches the root route. TypeScript: `{ params: Promise\u003c{ slug: string }\u003e }` for dynamic routes.
