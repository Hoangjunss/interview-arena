---
id: dependent-queries-trong-react-query-la-gi
position: backend
technology: react-query
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependent queries trong React Query là gì?

## Question (EN)
What are dependent queries in React Query?

## Đáp án chi tiết (VI)
Dependent query dùng `enabled: !!prerequisite` để chỉ chạy khi dependency sẵn sàng — tránh waterfall bằng cách chạy parallel khi queries độc lập. Dependent query (hay serial query) là query mà việc thực thi phụ thuộc vào kết quả của query khác. Dùng `enabled` option để kiểm soát: ví dụ fetch user trước, rồi mới fetch posts của user đó — `useQuery({ queryKey: ['posts', userId], queryFn: () =\u003e fetchPosts(userId), enabled: !!userId })`. Khi userId chưa có (query user chưa xong), enabled = false nên posts query không chạy. Khi userId có giá trị, enabled = true → tự động fetch. React Query handle loading states đúng cho cả chain: component thấy isLoading = true cho tới khi query cuối cùng hoàn thành. Tránh lạm dụng dependent queries vì tạo waterfall — nếu queries độc lập, chạy parallel tốt hơn.

## Detailed Answer (EN)
Dependent queries use `enabled: !!prerequisite` to run only when the dependency is ready — avoid waterfalls by running queries in parallel when they are independent. A dependent query (or serial query) is a query whose execution depends on the result of another query. Use the `enabled` option to control it: e.g., fetch user first, then fetch that user's posts — `useQuery({ queryKey: ['posts', userId], queryFn: () =\u003e fetchPosts(userId), enabled: !!userId })`. When userId is not yet available (user query not complete), enabled is false so the posts query doesn't run. When userId has a value, enabled becomes true → automatically fetches. React Query handles loading states correctly for the entire chain: the component sees isLoading = true until the last query in the chain completes. Avoid overusing dependent queries as they create waterfalls — if queries are independent, run them in parallel instead.
