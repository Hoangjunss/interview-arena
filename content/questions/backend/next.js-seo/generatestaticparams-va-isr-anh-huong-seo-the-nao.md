---
id: generatestaticparams-va-isr-anh-huong-seo-the-nao
position: backend
technology: next.js-seo
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
generateStaticParams và ISR ảnh hưởng SEO thế nào?

## Question (EN)
How do generateStaticParams and ISR affect SEO?

## Đáp án chi tiết (VI)
`generateStaticParams` pre-render dynamic routes tại build time (SSG) → HTML sẵn sàng, Google index ngay, TTFB cực nhanh. \
\
**Ví dụ:** blog có 100 posts → generate 100 static HTML pages. **ISR (Incremental Static Regeneration)**: kết hợp tốt nhất của SSG và SSR — serve cached HTML, background revalidate sau N giây. SEO benefits: (1) Fast TTFB → Google crawl nhanh hơn, (2) HTML đầy đủ → index ngay không cần render JS, (3) Luôn fresh content với revalidate. Pattern: `generateStaticParams` cho known routes (categories, popular posts), fallback dynamic rendering cho routes mới (long-tail). Với `revalidate: 3600` (1 giờ): Google luôn thấy content mới nhất, users luôn thấy fast page.

## Detailed Answer (EN)
`generateStaticParams` pre-renders dynamic routes at build time (SSG) — HTML is ready immediately, Google can index it right away, and TTFB is extremely fast. \
\
**Example:** a blog with 100 posts generates 100 static HTML pages. **ISR (Incremental Static Regeneration)**: combines the best of SSG and SSR — serves cached HTML while revalidating in the background after N seconds. SEO benefits: (1) Fast TTFB → Google crawls faster, (2) Full HTML → indexed immediately without needing to render JS, (3) Always-fresh content with revalidation. Pattern: use `generateStaticParams` for known routes (categories, popular posts) and fallback to dynamic rendering for new routes (long-tail). With `revalidate: 3600` (1 hour): Google always sees the latest content and users always get a fast page.
