---
id: usemutation-hook-dung-de-lam-gi-cach-xu-ly-optimistic-updates
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useMutation hook dùng để làm gì? Cách xử lý optimistic updates?

## Question (EN)
What is the useMutation hook used for? How do you handle optimistic updates?

## Đáp án chi tiết (VI)
useMutation xử lý write operations (POST/PUT/DELETE) — khác useQuery chỉ đọc. Cung cấp `mutate()` (fire-and-forget) hoặc `mutateAsync()` (trả về Promise). States: `isPending`, `isError`, `isSuccess`, `data`, `error`. Optimistic update flow: (1) `onMutate`: cancel ongoing queries, snapshot data cũ, set cache mới ngay → UI cập nhật tức thì. (2) `onError`: nhận snapshot từ onMutate context, rollback cache. (3) `onSettled`: invalidate queries để sync với server. Ví dụ thực tế: user like bài viết → heart đỏ ngay lập tức (optimistic), nếu API fail → rollback heart về trắng.

## Detailed Answer (EN)
useMutation handles write operations (POST/PUT/DELETE) — unlike useQuery which only reads. Provides `mutate()` (fire-and-forget) or `mutateAsync()` (returns a Promise). States: `isPending`, `isError`, `isSuccess`, `data`, `error`. Optimistic update flow: (1) `onMutate`: cancel ongoing queries, snapshot old data, immediately set new cache → UI updates instantly. (2) `onError`: receive snapshot from onMutate context, rollback cache. (3) `onSettled`: invalidate queries to sync with server. Practical example: user likes a post → heart turns red immediately (optimistic); if the API fails → rollback the heart to white.
