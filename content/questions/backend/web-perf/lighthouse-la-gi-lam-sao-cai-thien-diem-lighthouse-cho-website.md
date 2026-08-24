---
id: lighthouse-la-gi-lam-sao-cai-thien-diem-lighthouse-cho-website
position: backend
technology: web-perf
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lighthouse là gì? Làm sao cải thiện điểm Lighthouse cho website?

## Question (EN)
What is Lighthouse? How do you improve a website's Lighthouse score?

## Đáp án chi tiết (VI)
Lighthouse là công cụ của Google đánh giá website theo 4 tiêu chí:\
\
- Performance: lazy load images (`loading='lazy'`), code splitting với React.lazy, compress assets (gzip/brotli), preload fonts quan trọng.\
- Accessibility: mọi image có alt text, color contrast đủ ratio, dùng ARIA cho interactive elements.\
- Best Practices: dùng HTTPS, không console errors, không deprecated APIs.\
- SEO: meta tags đầy đủ (title, description), semantic HTML (h1, nav, main), sitemap.xml.\
\
Mục tiêu: Performance \u003e 90, Accessibility \u003e 90. Đo bằng Chrome DevTools tab Lighthouse hoặc PageSpeed Insights.

## Detailed Answer (EN)
Lighthouse is Google's tool for auditing websites across 4 categories:\
\
- Performance: lazy-load images (`loading='lazy'`), code splitting with React.lazy, compress assets (gzip/brotli), preload critical fonts.\
- Accessibility: every image has alt text, sufficient color contrast ratio, ARIA for interactive elements.\
- Best Practices: HTTPS, no console errors, no deprecated APIs.\
- SEO: complete meta tags (title, description), semantic HTML (h1, nav, main), sitemap.xml.\
\
Targets: Performance \u003e 90, Accessibility \u003e 90. Measure via Chrome DevTools Lighthouse tab or PageSpeed Insights.
