---
id: cach-toi-uu-largest-contentful-paint-lcp-trong-react-next-js
position: backend
technology: next.js-seo
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tối ưu Largest Contentful Paint (LCP) trong React/Next.js?

## Question (EN)
How do you optimize Largest Contentful Paint (LCP) in React/Next.js?

## Đáp án chi tiết (VI)
LCP đo thời gian render element lớn nhất trên viewport — optimize bằng cách xác định đúng LCP element rồi tối ưu theo loại: image, text, hay video poster.\
\
Target: \u003c2.5s. **Xác định LCP element**: dùng Chrome DevTools Performance tab hoặc web-vitals library.\
\
**Tối ưu theo loại**: (1) Image LCP: `priority` prop trong next/image, preload với `\u003clink rel='preload'\u003e`, avoid lazy load, dùng CDN, responsive sizes, WebP. (2) Text LCP: font-display swap, preload font file, avoid web font nếu được (system font stack). (3) Video poster: preload poster image.\
\
**Server optimizations**: reduce TTFB (\u003c600ms) bằng SSG/ISR/edge functions, streaming SSR.\
\
**Tránh**: redirect chains, render-blocking CSS/JS lớn, client-side data fetch trước khi render LCP, quá nhiều third-party scripts (analytics, chat widgets). Trong Next.js: `next/image` với `priority`, `next/font` với `display: swap`, App Router streaming.

## Detailed Answer (EN)
LCP measures time to render the largest viewport element — optimize by identifying the LCP element then targeting the right optimization for its type: image, text, or video poster.\
\
Target: \u003c2.5s. **Identify the LCP element**: use the Chrome DevTools Performance tab or the web-vitals library.\
\
**Optimizations by type**: (1) Image LCP: use the `priority` prop in next/image, preload with `\u003clink rel='preload'\u003e`, avoid lazy loading, use a CDN, responsive sizes, and WebP. (2) Text LCP: use font-display swap, preload the font file, avoid web fonts if possible (system font stack). (3) Video poster: preload the poster image.\
\
**Server optimizations**: reduce TTFB (\u003c600ms) using SSG/ISR/edge functions and streaming SSR.\
\
**Avoid**: redirect chains, large render-blocking CSS/JS, client-side data fetching before the LCP renders, and too many third-party scripts. In Next.js: use `next/image` with `priority`, `next/font` with `display: swap`, and App Router streaming.
