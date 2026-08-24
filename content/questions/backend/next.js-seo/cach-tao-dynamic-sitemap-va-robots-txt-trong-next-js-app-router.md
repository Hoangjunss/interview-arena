---
id: cach-tao-dynamic-sitemap-va-robots-txt-trong-next-js-app-router
position: backend
technology: next.js-seo
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tạo dynamic sitemap và robots.txt trong Next.js App Router?

## Question (EN)
How do you create a dynamic sitemap and robots.txt in Next.js App Router?

## Đáp án chi tiết (VI)
Next.js App Router tích hợp native sitemap và robots.txt với TypeScript type-safety — không cần plugin hay static files.\
\
**Sitemap**: tạo `app/sitemap.ts` export default function trả về mảng `MetadataRoute.Sitemap`. Mỗi item có `url`, `lastModified`, `changeFrequency`, `priority`. Có thể fetch data từ DB/CMS để generate dynamic URLs. Cho website lớn: export thêm `generateSitemaps()` từ `app/sitemap.ts` — trả về mảng `{ id }`, Next.js gọi default export với từng `id` để tạo nhiều sitemap (serve tại `/sitemap/[id].xml`).\
\
**robots.txt**: tạo `app/robots.ts` export default function trả về `MetadataRoute.Robots` object với `rules` (User-Agent, allow, disallow) và `sitemap` URL.\
\
**Ví dụ:** `{ rules: { userAgent: '*', allow: '/', disallow: '/admin/' }, sitemap: 'https://example.com/sitemap.xml' }`. Cả 2 đều type-safe với TypeScript, auto-generate tại build time.

## Detailed Answer (EN)
Next.js App Router has native sitemap and robots.txt support with TypeScript type-safety — no plugins or static files needed.\
\
**Sitemap**: create `app/sitemap.ts` with a default export function returning a `MetadataRoute.Sitemap` array. Each item includes `url`, `lastModified`, `changeFrequency`, and `priority`. Fetch from DB or CMS for dynamic URLs. For large sites: also export `generateSitemaps()` from `app/sitemap.ts` — return an array of `{ id }`, and Next.js calls the default export with each `id` to produce multiple sitemaps (served at `/sitemap/[id].xml`).\
\
**robots.txt**: create `app/robots.ts` with a default export function returning a `MetadataRoute.Robots` object with `rules` (User-Agent, allow, disallow) and a `sitemap` URL.\
\
**Example:** `{ rules: { userAgent: '*', allow: '/', disallow: '/admin/' }, sitemap: 'https://example.com/sitemap.xml' }`. Both are TypeScript type-safe, auto-generated at build time.
