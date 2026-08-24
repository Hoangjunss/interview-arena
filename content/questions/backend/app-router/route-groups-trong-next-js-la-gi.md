---
id: route-groups-trong-next-js-la-gi
position: backend
technology: app-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Route Groups trong Next.js là gì?

## Question (EN)
What are Route Groups in Next.js?

## Đáp án chi tiết (VI)
Route Groups dùng ngoặc đơn `(groupName)` để tổ chức routes mà không ảnh hưởng URL. \
\
**Ví dụ:** `(auth)/login` và `(auth)/register` share cùng layout auth nhưng URL vẫn là `/login` và `/register`. Useful để: apply layout cho subset of routes, organize large codebases theo features.

## Detailed Answer (EN)
Route Groups use parentheses `(groupName)` to organize routes without affecting the URL. For example, `(auth)/login` and `(auth)/register` share the same auth layout but the URLs remain `/login` and `/register`. Useful for: applying a layout to a subset of routes, and organizing large codebases by feature.
