---
id: next-image-toi-uu-seo-va-performance-nhu-the-nao
position: backend
technology: next.js-seo
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
next/image tối ưu SEO và performance như thế nào?

## Question (EN)
How does next/image optimize SEO and performance?

## Đáp án chi tiết (VI)
`next/image` tự động handle lazy loading, responsive srcset, WebP conversion, và CLS prevention — 5 tính năng trực tiếp cải thiện Core Web Vitals.\
\
(1) **Lazy loading** mặc định — chỉ load khi gần viewport, giảm initial page weight. (2) **Responsive images** — tự generate srcset với nhiều sizes, browser chọn size phù hợp. (3) **Format optimization** — auto convert sang WebP/AVIF nếu browser hỗ trợ, giảm 30-50% file size. (4) **Prevent CLS** — bắt buộc width/height hoặc fill, tránh layout shift. (5) **Priority loading** — set `priority={true}` cho LCP image (above-the-fold).\
\
SEO impact: LCP cải thiện (ranking signal), CLS giảm (ranking signal), smaller images = faster page = better crawl experience. Luôn thêm `alt` text mô tả ảnh cho Google Image Search và accessibility.

## Detailed Answer (EN)
`next/image` automatically handles lazy loading, responsive srcset, WebP conversion, and CLS prevention — 5 features that directly improve Core Web Vitals.\
\
(1) **Lazy loading** by default — images only load when near the viewport, reducing initial page weight. (2) **Responsive images** — automatically generates a srcset at multiple sizes; the browser selects the most appropriate one. (3) **Format optimization** — auto-converts to WebP/AVIF when supported, reducing file size by 30-50%. (4) **Prevents CLS** — requires explicit width/height or fill prop, preventing layout shifts. (5) **Priority loading** — set `priority={true}` for the LCP image (above the fold).\
\
SEO impact: improved LCP (a ranking signal), reduced CLS (a ranking signal), smaller images mean faster pages and a better crawl experience. Always include a descriptive `alt` attribute for Google Image Search and accessibility.
