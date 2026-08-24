---
id: parallel-queries-va-usequeries-trong-react-query-la-gi
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Parallel queries và useQueries trong React Query là gì?

## Question (EN)
How do you run parallel queries in React Query?

## Đáp án chi tiết (VI)
Parallel queries là kỹ thuật fetch nhiều API endpoints cùng lúc thay vì tuần tự (waterfall). Cách 1: gọi nhiều `useQuery` hooks trong cùng component — React Query tự động chạy chúng parallel. Cách 2: `useQueries` hook nhận mảng query configs, hữu ích khi số lượng queries dynamic (ví dụ fetch details cho danh sách product IDs). Kết quả trả về mảng objects, mỗi object giống useQuery result. Ví dụ: dashboard cần user info + notifications + stats → 3 useQuery hooks chạy song song, tổng thời gian = query chậm nhất (thay vì cộng dồn). Lưu ý: React Suspense mode sẽ waterfall nếu mỗi query ở component khác nhau — dùng `useSuspenseQueries` để parallel trong Suspense.

## Detailed Answer (EN)
Multiple useQuery calls in the same component run in parallel automatically — React Query fires all queries simultaneously without waiting for each to complete. For a static number of parallel queries: simply call multiple useQuery hooks; they run concurrently. For a dynamic number of parallel queries (array of unknown length): use useQueries — accepts an array of query options and returns an array of query results. Example: const results = useQueries({ queries: ids.map(id =\u003e ({ queryKey: ['user', id], queryFn: () =\u003e fetchUser(id) })) }). useQueries is more flexible than a .map() with useQuery because React hooks cannot be called inside loops. For dependent parallel queries (some queries depend on others): use the enabled option to control when a query starts — enabled: !!userId fires only after userId is available.
