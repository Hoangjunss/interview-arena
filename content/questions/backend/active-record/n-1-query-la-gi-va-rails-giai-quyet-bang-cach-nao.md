---
id: n-1-query-la-gi-va-rails-giai-quyet-bang-cach-nao
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
N+1 Query là gì và Rails giải quyết bằng cách nào?

## Question (EN)
What is the N+1 query problem and how does Rails solve it?

## Đáp án chi tiết (VI)
N+1 xảy ra khi load 1 collection rồi lặp để lấy association của mỗi item → 1 query lấy list + N query con.\
\
```ruby\
# N+1: 1 query lấy posts + N query lấy user của mỗi post\
Post.all.each { |p| puts p.user.name }\
\
# FIX: includes eager-loads user cùng lúc\
Post.includes(:user).each { |p| puts p.user.name }\
# SQL: SELECT * FROM posts + SELECT * FROM users WHERE id IN (1, 2, ...)\
```\
\
**`includes` vs `eager_load` vs `preload`:**\
- `includes` → Rails tự chọn strategy (`preload` hoặc `eager_load`).\
- `preload` → luôn 2 query riêng.\
- `eager_load` → luôn 1 query JOIN (dùng khi cần filter theo association).\
\
Gem **bullet** tự phát hiện N+1 trong development.

## Detailed Answer (EN)
N+1 occurs when loading a collection then iterating to fetch each item's association → 1 query for the list + N sub-queries.\
\
```ruby\
# N+1: 1 query for posts + N queries for each post's user\
Post.all.each { |p| puts p.user.name }\
\
# FIX: includes eager-loads users in one go\
Post.includes(:user).each { |p| puts p.user.name }\
# SQL: SELECT * FROM posts + SELECT * FROM users WHERE id IN (1, 2, ...)\
```\
\
**`includes` vs `eager_load` vs `preload`:**\
- `includes` → Rails picks the strategy automatically.\
- `preload` → always 2 separate queries.\
- `eager_load` → always 1 JOIN query (use when filtering on the association).\
\
The **bullet** gem auto-detects N+1 in development.
