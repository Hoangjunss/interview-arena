---
id: infinite-queries-trong-react-query-la-gi-dung-cho-pagination-nhu-the-nao
position: backend
technology: react-query
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Infinite queries trong React Query là gì? Dùng cho pagination như thế nào?

## Question (EN)
What are infinite queries in React Query? How do you use them for pagination?

## Đáp án chi tiết (VI)
`useInfiniteQuery` quản lý nhiều pages trong 1 query — getNextPageParam quyết định cursor page tiếp theo, fetchNextPage() load thêm khi user scroll tới cuối. `useInfiniteQuery` là hook chuyên biệt cho infinite scroll và load-more pagination — thay vì fetch 1 page, nó quản lý nhiều pages trong 1 query. Cấu hình: `queryFn` nhận `pageParam` (cursor hoặc page number), `getNextPageParam` trả về param cho page tiếp theo (return undefined khi hết data). Kết quả: `data.pages` là mảng chứa data từng page, `data.pageParams` lưu params đã dùng. Gọi `fetchNextPage()` khi user scroll tới cuối (dùng IntersectionObserver). Ví dụ: social feed, product listing, chat history. Có thêm `fetchPreviousPage()` cho bi-directional infinite scroll.

## Detailed Answer (EN)
`useInfiniteQuery` manages multiple pages in a single query — getNextPageParam determines the next cursor, fetchNextPage() loads more when the user scrolls to the bottom. `useInfiniteQuery` is a specialized hook for infinite scroll and load-more pagination — instead of fetching one page, it manages multiple pages in a single query. Config: `queryFn` receives `pageParam` (a cursor or page number), `getNextPageParam` returns the param for the next page (return undefined when there is no more data). Result: `data.pages` is an array of data per page, `data.pageParams` stores the params used. Call `fetchNextPage()` when the user scrolls to the bottom (using IntersectionObserver). Use cases: social feeds, product listings, chat history. `fetchPreviousPage()` is also available for bi-directional infinite scroll.
