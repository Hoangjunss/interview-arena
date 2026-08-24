---
id: url-structure-anh-huong-seo-the-nao-best-practices
position: backend
technology: technical
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
URL structure ảnh hưởng SEO thế nào? Best practices?

## Question (EN)
How does URL structure affect SEO? What are the best practices?

## Đáp án chi tiết (VI)
URL là signal nhẹ cho Google hiểu nội dung, nhưng ảnh hưởng CTR đáng kể vì user đọc URL trước khi click — URL xấu mất click dù rank cao.\
\
**Best practices**: (1) Ngắn gọn, descriptive: `/blog/react-query-tutorial` tốt hơn `/blog/post?id=123`. (2) Dùng hyphens (-) ngăn cách từ, KHÔNG dùng underscores (_) — Google coi hyphen là word separator, underscore không. (3) Lowercase only — `/About` và `/about` là 2 URLs khác nhau (duplicate content). (4) Tránh parameters khi có thể — `/products/shoes` tốt hơn `/products?category=shoes`.\
\
(5) Tránh thay đổi URL — nếu bắt buộc, 301 redirect URL cũ → mới. (6) Include keyword target — nhưng tự nhiên. (7) Tránh nested quá sâu — `/a/b/c/d/e/page` kém hơn `/a/page`.\
\
Trong Next.js: file-based routing tạo clean URLs tự động.

## Detailed Answer (EN)
URLs are a lightweight ranking signal but have significant CTR impact since users read URLs before clicking — an ugly URL loses clicks even when ranking high.\
\
**Best practices**: (1) Keep them short and descriptive: `/blog/react-query-tutorial` is better than `/blog/post?id=123`. (2) Use hyphens (-) to separate words, NOT underscores (_) — Google treats hyphens as word separators, underscores do not. (3) Lowercase only — `/About` and `/about` are two different URLs (duplicate content). (4) Avoid query parameters when possible — `/products/shoes` is better than `/products?category=shoes`.\
\
(5) Avoid changing URLs — if unavoidable, use a 301 redirect from old to new. (6) Include target keywords — but keep it natural. (7) Avoid deep nesting — `/a/b/c/d/e/page` is worse than `/a/page`.\
\
In Next.js: file-based routing generates clean URLs automatically.
