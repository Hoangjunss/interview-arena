---
id: react-query-tanstack-query-la-gi-staletime-va-cache-khac-nhau-ra-sao
position: backend
technology: data-fetching
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Query (TanStack Query) là gì? `staleTime` và cache khác nhau ra sao?

## Question (EN)
What is React Query (TanStack Query)? How do `staleTime` and cache differ?

## Đáp án chi tiết (VI)
React Query quản lý **server state**: cache dữ liệu theo **query key**, gộp (dedupe) request trùng, refetch nền, retry — thay cho việc tự viết loading/error/cache bằng `useEffect`.\
\
Hai tham số hay bị nhầm:\
- **`staleTime`**: dữ liệu còn \\"tươi\\" trong bao lâu. Trong khoảng này, React Query **không refetch** dù component mount lại (mặc định `0` = stale ngay lập tức). Tăng `staleTime` để **giảm số request**.\
- **`gcTime`** (trước là `cacheTime`): giữ dữ liệu trong cache bao lâu **sau khi không còn observer nào** dùng, rồi mới thu hồi (mặc định 5 phút).\
\
Khi dữ liệu đã stale, React Query tự refetch lúc: **mount lại**, **focus lại cửa sổ**, **reconnect mạng**.

## Detailed Answer (EN)
React Query manages **server state**: it caches data by **query key**, dedupes duplicate requests, refetches in the background, and retries — replacing hand-rolled loading/error/cache logic in `useEffect`.\
\
Two often-confused options:\
- **`staleTime`**: how long data stays \\"fresh\\". Within that window React Query **does not refetch** even if a component remounts (default `0` = stale immediately). Raise `staleTime` to **cut request count**.\
- **`gcTime`** (formerly `cacheTime`): how long cached data is kept **after there are no observers** left using it, before it is garbage-collected (default 5 minutes).\
\
Once data is stale, React Query auto-refetches on: **remount**, **window refocus**, and **network reconnect**.
