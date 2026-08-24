---
id: react-query-devtools-la-gi-cach-su-dung
position: backend
technology: react-query
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Query DevTools là gì? Cách sử dụng?

## Question (EN)
What is React Query DevTools and how does it help development?

## Đáp án chi tiết (VI)
React Query DevTools là công cụ không thể thiếu — visualize cache state real-time, inspect data/staleTime/subscribers, manual trigger refetch/invalidate; tự động excluded khỏi production build. React Query DevTools (`@tanstack/react-query-devtools`) là công cụ debug chuyên dụng, hiển thị floating panel trong browser. Tính năng: xem tất cả queries và trạng thái real-time (fresh/stale/inactive/fetching), inspect cached data dạng JSON tree, xem query timing (khi nào fetch, bao lâu), manual trigger refetch/invalidate/remove/reset từng query, xem subscribers count. Setup: `import { ReactQueryDevtools } from '@tanstack/react-query-devtools'` → đặt `\u003cReactQueryDevtools initialIsOpen={false} /\u003e` bên trong QueryClientProvider. Tự động ẩn trong production build (tree-shaken). Rất hữu ích khi debug cache issues: tại sao data stale, query nào đang fetch, cache hit hay miss. Là 1 trong những lý d"])</script><script>self.__next_f.push([1,"o developer chọn React Query — visibility vào cache layer mà Redux DevTools không cho.

## Detailed Answer (EN)
$85
