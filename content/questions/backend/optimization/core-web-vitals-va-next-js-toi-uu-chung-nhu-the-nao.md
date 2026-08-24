---
id: core-web-vitals-va-next-js-toi-uu-chung-nhu-the-nao
position: backend
technology: optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Core Web Vitals và Next.js tối ưu chúng như thế nào?

## Question (EN)
What are Core Web Vitals and how does Next.js optimize them?

## Đáp án chi tiết (VI)
Next.js tối ưu: LCP (Largest Contentful Paint) qua image optimization, priority images; CLS (Cumulative Layout Shift) qua next/image với dimensions, next/font với size-adjust; INP (Interaction to Next Paint, thay FID từ 3/2024) qua code splitting, lazy loading, Concurrent Mode. Dùng `@vercel/analytics` (không phải `next/analytics`) để báo cáo Core Web Vitals production.

## Detailed Answer (EN)
Next.js optimizes: LCP (Largest Contentful Paint) via image optimization and the priority prop on above-the-fold images; CLS (Cumulative Layout Shift) via next/image dimensions and next/font's automatic size-adjust; FID/INP (Interaction to Next Paint) via code splitting, lazy loading, and Concurrent Mode. Use `@vercel/analytics` to report Core Web Vitals from production.
