---
id: async-atoms-trong-jotai-hoat-dong-nhu-the-nao
position: backend
technology: jotai
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Async atoms trong Jotai hoạt động như thế nào?

## Question (EN)
How do async atoms work in Jotai?

## Đáp án chi tiết (VI)
Async read atom: `const userAtom = atom(async (get) =\u003e { const id = get(userIdAtom); return await fetchUser(id); })` — component dùng `useAtomValue(userAtom)` sẽ tự suspend trong khi fetch (cần bọc `\u003cSuspense\u003e`). Đây là tích hợp với React Suspense tự nhiên nhất trong các state libs. `loadable(userAtom)` từ `jotai/utils` trả về `{ state: 'loading'|'hasData'|'hasError', data, error }` — tránh Suspense khi cần kiểm soát loading UI thủ công. `atomWithQuery` từ `jotai-tanstack-query` tích hợp TanStack Query vào atom: `const postsAtom = atomWithQuery(() =\u003e ({ queryKey: ['posts'], queryFn: fetchPosts }))`. Lưu ý: async atom re-fetch mỗi khi dependency atom thay đổi, không có built-in stale-time như React Query — dùng `atomWithQuery` nếu cần caching strategy phức tạp.

## Detailed Answer (EN)
Async read atom: `const userAtom = atom(async (get) =\u003e { const id = get(userIdAtom); return await fetchUser(id); })` — a component using `useAtomValue(userAtom)` will automatically suspend while fetching (requires wrapping with `\u003cSuspense\u003e`). This is the most natural React Suspense integration of any state library. `loadable(userAtom)` from `jotai/utils` returns `{ state: 'loading'|'hasData'|'hasError', data, error }` — avoids Suspense when you need manual control over the loading UI. `atomWithQuery` from `jotai-tanstack-query` integrates TanStack Query into an atom: `const postsAtom = atomWithQuery(() =\u003e ({ queryKey: ['posts'], queryFn: fetchPosts }))`. Pitfall: an async atom refetches whenever a dependency atom changes; there is no built-in stale-time like React Query — use `atomWithQuery` when you need a more sophisticated caching strategy.
