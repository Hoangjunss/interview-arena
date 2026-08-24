---
id: staletime-va-gctime-cachetime-trong-react-query-la-gi-su-khac-biet
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
staleTime và gcTime (cacheTime) trong React Query là gì? Sự khác biệt?

## Question (EN)
What are staleTime and gcTime (cacheTime) in React Query? What is the difference?

## Đáp án chi tiết (VI)
staleTime kiểm soát khi nào refetch; gcTime kiểm soát khi nào xóa cache — staleTime nên ≤ gcTime. Hai config quan trọng nhất quyết định caching behavior. **staleTime** (mặc định 0): thời gian data được coi là 'fresh' — trong khoảng này component mount mới sẽ dùng cached data mà KHÔNG refetch. Ví dụ: `staleTime: 5 * 60 * 1000` (5 phút) → trong 5 phút, navigate qua lại giữa các page sẽ show cached data ngay, không loading. **gcTime** (mặc định 5 phút): thời gian data ở lại trong cache SAU KHI không còn component nào subscribe. Khi hết gcTime, data bị xóa khỏi memory. Quan hệ: staleTime quyết định 'khi nào refetch', gcTime quyết định 'khi nào xóa cache'. staleTime nên ≤ gcTime.

## Detailed Answer (EN)
staleTime controls when to refetch; gcTime controls when to delete the cache — staleTime should always be ≤ gcTime. Two of the most important config options controlling caching behavior. **staleTime** (default 0): how long data is considered 'fresh' — during this window, newly mounted components use cached data WITHOUT refetching. Example: `staleTime: 5 * 60 * 1000` (5 minutes) → navigating back and forth between pages within 5 minutes shows cached data instantly, no loading state. **gcTime** (default 5 minutes): how long data stays in cache AFTER no components are subscribed. When gcTime expires, data is removed from memory. Relationship: staleTime controls 'when to refetch', gcTime controls 'when to delete the cache'. staleTime should always be ≤ gcTime.
