---
id: composition-cua-custom-hooks-la-gi
position: backend
technology: custom-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composition của custom hooks là gì?

## Question (EN)
What is custom hook composition?

## Đáp án chi tiết (VI)
Custom hooks có thể gọi custom hooks khác, tạo composable layers. \
\
**Ví dụ:** useUser gọi useFetch, useCache, useAuth. Pattern này giống function composition, cho phép xây dựng complex behaviors từ simple hooks. Giữ mỗi hook single-responsibility, tránh hooks quá fat có nhiều trách nhiệm không liên quan.

## Detailed Answer (EN)
Custom hooks can call other custom hooks, creating composable layers. For example, useUser can call useFetch, useCache, and useAuth internally. This mirrors function composition and allows building complex behaviors from simple, focused hooks. Keep each hook single-responsibility — avoid bloated hooks with multiple unrelated concerns.
