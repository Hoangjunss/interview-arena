---
id: toi-uu-bundle-angular-nen-bat-dau-tu-dau
position: backend
technology: ssr-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tối ưu bundle Angular nên bắt đầu từ đâu?

## Question (EN)
Where should you start when optimizing an Angular bundle?

## Đáp án chi tiết (VI)
Bắt đầu bằng route-level lazy loading, kiểm tra bundle analyzer/source-map-explorer, loại bỏ dependency nặng không cần thiết và dùng `@defer` cho UI chưa cần ngay.\
\
Tiếp theo tối ưu shared module/imports để tránh kéo cả thư viện vào initial chunk. Đừng micro-optimize trước khi đo; mục tiêu là giảm JavaScript critical path của màn hình đầu tiên.

## Detailed Answer (EN)
Start with route-level lazy loading, inspect bundles with an analyzer/source-map-explorer, remove unnecessary heavy dependencies and use `@defer` for UI that is not immediately needed.\
\
Then optimize shared modules/imports so entire libraries are not pulled into the initial chunk. Do not micro-optimize before measuring; the goal is to reduce the JavaScript critical path of the first screen.
