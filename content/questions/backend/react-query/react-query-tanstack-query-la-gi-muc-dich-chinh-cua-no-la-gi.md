---
id: react-query-tanstack-query-la-gi-muc-dich-chinh-cua-no-la-gi
position: backend
technology: react-query
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Query (TanStack Query) là gì? Mục đích chính của nó là gì?

## Question (EN)
What is React Query (TanStack Query)? What is its main purpose?

## Đáp án chi tiết (VI)
React Query (nay là TanStack Query v5) là thư viện quản lý server state cho React, giải quyết bài toán mà useState + useEffect không làm tốt: fetching, caching, synchronizing và updating data từ API. Ví dụ thực tế: không cần React Query, bạn phải tự viết loading state, error handling, cache, deduplication, refetch khi focus window, retry khi fail — React Query làm tất cả tự động. Khác biệt cốt lõi với Redux: Redux quản lý client state (UI state, form state), React Query quản lý server state (data từ API có thể thay đổi bởi người khác bất kỳ lúc nào). Trong thực tế, 80% Redux code trong các dự án là để fetch và cache API data — React Query thay thế hoàn toàn phần đó.

## Detailed Answer (EN)
React Query (now TanStack Query v5) is a server state management library for React that solves problems useState + useEffect handle poorly: fetching, caching, synchronizing, and updating data from APIs. Practical example: without React Query, you'd have to manually implement loading state, error handling, caching, deduplication, refetching on window focus, and retry on failure — React Query does all of this automatically. Core difference from Redux: Redux manages client state (UI state, form state); React Query manages server state (API data that can change at any time, owned by the server). In practice, 80% of Redux code in most projects exists to fetch and cache API data — React Query replaces that entirely.
