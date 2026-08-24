---
id: rtk-query-la-gi-loi-ich-so-voi-cach-fetch-data-thu-cong
position: backend
technology: redux
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RTK Query là gì? Lợi ích so với cách fetch data thủ công?

## Question (EN)
What is RTK Query? What are its advantages over manual data fetching?

## Đáp án chi tiết (VI)
Server state thuộc về React Query; client UI state thuộc về Zustand/Redux — trộn lẫn dẫn đến duplication. RTK Query là data fetching và caching layer tích hợp sẵn trong Redux Toolkit, cạnh tranh trực tiếp với React Query/SWR. Ưu điểm so với fetch thủ công: tự động quản lý loading/error/success states (không cần viết 3 cases trong reducer), cache data theo endpoint + params, tự động refetch khi args thay đổi, deduplication (10 components cùng gọi `useGetUserQuery(1)` chỉ 1 request). Cache invalidation qua tag system: `providesTags: ['Post']` ở query và `invalidatesTags: ['Post']` ở mutation — khi mutation xong, tất cả queries với tag 'Post' tự động refetch. So với React Query: RTK Query tích hợp sẵn Redux store (không cần thêm thư viện), nhưng React Query có API linh hoạt hơn và không bắt buộc dùng Redux. Lưu ý: nếu project đã dùng React Query, thêm RTK Query tạo 2 cache layers trùng lặp — chọn một.

## Detailed Answer (EN)
Server state belongs in React Query; client UI state belongs in Zustand/Redux — mixing them leads to duplication. RTK Query is a data fetching and caching layer built into Redux Toolkit, competing directly with React Query/SWR. Advantages over manual fetching: automatically manages loading/error/success states (no need to write 3 cases in a reducer), caches data by endpoint and params, automatically refetches when args change, and deduplicates requests (10 components calling `useGetUserQuery(1)` results in only one HTTP request). Cache invalidation via tag system: `providesTags: ['Post']` on the query and `invalidatesTags: ['Post']` on the mutation — when a mutation completes, all queries with the 'Post' tag automatically refetch. Compared to React Query: RTK Query integrates into the Redux store (no extra library), but React Query has a more flexible API and doesn't require Redux. Pitfall: if a project already uses React Query, adding RTK Query creates two duplicate cache layers — pick one.
