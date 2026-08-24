---
id: bundle-analyzer-trong-next-js-duoc-dung-nhu-the-nao
position: backend
technology: optimization
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bundle analyzer trong Next.js được dùng như thế nào?

## Question (EN)
How do you use the bundle analyzer in Next.js?

## Đáp án chi tiết (VI)
Dùng @next/bundle-analyzer để visualize bundle size. Cấu hình trong next.config.js với withBundleAnalyzer wrapper. Chạy `ANALYZE=true npm run build` để tạo report HTML. Giúp identify: large dependencies, duplicate code, unnecessary imports. Sau đó tối ưu: dynamic imports, tree-shaking, replace heavy libraries.

## Detailed Answer (EN)
Use @next/bundle-analyzer to visualize bundle sizes. Configure it in next.config.js with the withBundleAnalyzer wrapper. Run `ANALYZE=true npm run build` to generate an HTML report. It helps identify: large dependencies, duplicate code, and unnecessary imports. Follow up by applying dynamic imports, tree-shaking, and replacing heavy libraries with lighter alternatives.
