---
id: caching-trong-rails-fragment-cache-va-russian-doll-cache-la-gi
position: backend
technology: controller-\u0026-view
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Caching trong Rails — fragment cache và Russian-doll cache là gì?

## Question (EN)
What is Rails caching — what are fragment cache and Russian-doll cache?

## Đáp án chi tiết (VI)
Caching giảm số lần tính toán/query tốn kém bằng cách lưu kết quả HTML.\
\
**Fragment cache** — cache một đoạn view:\
```erb\
\u003c%# cache @article do %\u003e\
  \u003c%= render @article %\u003e\
\u003c%# end %\u003e\
```\
\
**Russian-doll cache** — cache lồng nhau: outer cache bao inner cache. Outer chỉ expired khi inner thay đổi.\
\
```erb\
\u003c%# cache @article do  — outer: cache cả article %\u003e\
  \u003ch1\u003e\u003c%= @article.title %\u003e\u003c/h1\u003e\
  \u003c%# cache @article.comments do  — inner: cache list comments %\u003e\
    \u003c%= render @article.comments %\u003e\
  \u003c%# end %\u003e\
\u003c%# end %\u003e\
```\
\
Khi 1 comment thay đổi → chỉ outer expired, inner comment cache vẫn còn. Cache key tự động từ `cache_key_with_version` (dùng `updated_at`).\
\
Configure store: `config.cache_store = :redis_cache_store, { url: ENV[\\"REDIS_URL\\"] }`.

## Detailed Answer (EN)
Caching reduces expensive computation/queries by storing rendered HTML output.\
\
**Fragment cache** — cache a portion of a view:\
```erb\
\u003c%# cache @article do %\u003e\
  \u003c%= render @article %\u003e\
\u003c%# end %\u003e\
```\
\
**Russian-doll cache** — nested caching: outer cache wraps inner caches. Outer expires only when inner changes.\
\
```erb\
\u003c%# cache @article do  — outer: caches the whole article %\u003e\
  \u003ch1\u003e\u003c%= @article.title %\u003e\u003c/h1\u003e\
  \u003c%# cache @article.comments do  — inner: caches comment list %\u003e\
    \u003c%= render @article.comments %\u003e\
  \u003c%# end %\u003e\
\u003c%# end %\u003e\
```\
\
When one comment changes → only the outer is expired; inner comment caches remain valid. Cache keys are auto-generated from `cache_key_with_version` (uses `updated_at`).\
\
Configure store: `config.cache_store = :redis_cache_store, { url: ENV[\\"REDIS_URL\\"] }`.
