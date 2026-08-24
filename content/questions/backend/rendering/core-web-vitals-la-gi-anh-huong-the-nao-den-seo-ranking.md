---
id: core-web-vitals-la-gi-anh-huong-the-nao-den-seo-ranking
position: backend
technology: rendering
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Core Web Vitals là gì? Ảnh hưởng thế nào đến SEO ranking?

## Question (EN)
What are Core Web Vitals? How do they affect SEO rankings?

## Đáp án chi tiết (VI)
Core Web Vitals (CWV) là 3 metrics đo trải nghiệm người dùng, là ranking signal của Google từ 2021. INP thay thế FID từ tháng 3/2024.\
\
**LCP (Largest Contentful Paint)**: thời gian render phần tử lớn nhất (hero image, heading) — target: \u003c2.5s. Cải thiện: optimize images (WebP, lazy load), preload fonts, SSR/SSG.\
\
**INP (Interaction to Next Paint)**: thời gian phản hồi khi user interact (click, tap) — target: \u003c200ms. Cải thiện: code split, defer heavy JS, reduce main thread work.\
\
**CLS (Cumulative Layout Shift)**: mức độ layout bị 'nhảy' — target: \u003c0.1. Cải thiện: set width/height cho images/videos, font-display swap, avoid dynamic content injection above fold.\
\
Google Search Console báo CWV cho từng URL. Trang có CWV tốt được ưu tiên ranking khi 2 trang có relevance tương đương.

## Detailed Answer (EN)
Core Web Vitals (CWV) are three metrics measuring real user experience and have been a Google ranking signal since 2021. INP replaced FID in March 2024.\
\
**LCP (Largest Contentful Paint)**: measures how long it takes to render the largest element (hero image, heading) — target: \u003c2.5s. Improve by: optimizing images (WebP, lazy load), preloading fonts, using SSR/SSG.\
\
**INP (Interaction to Next Paint)**: measures responsiveness to user interactions (clicks, taps) — target: \u003c200ms. Improve by: code splitting, deferring heavy JS, reducing main thread work.\
\
**CLS (Cumulative Layout Shift)**: measures unexpected layout shifts — target: \u003c0.1. Improve by: setting explicit width/height on images/videos, using font-display swap, and avoiding injecting dynamic content above the fold.\
\
Google Search Console reports CWV scores per URL. Pages with strong CWV scores gain a ranking advantage when competing pages have similar relevance.
