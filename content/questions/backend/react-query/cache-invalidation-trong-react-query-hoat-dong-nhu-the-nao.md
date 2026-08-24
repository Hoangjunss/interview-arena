---
id: cache-invalidation-trong-react-query-hoat-dong-nhu-the-nao
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache invalidation trong React Query hoạt động như thế nào?

## Question (EN)
How does cache invalidation work in React Query?

## Đáp án chi tiết (VI)
Cache invalidation là cơ chế đánh dấu data đã cũ (stale) để trigger refetch. Cách dùng: `queryClient.invalidateQueries({ queryKey: ['todos'] })` — tất cả queries có key bắt đầu bằng 'todos' bị đánh dấu stale. Nếu component đang mount thì refetch ngay, nếu không thì refetch khi component mount lại. Thường gọi sau mutation thành công: thêm todo mới → invalidate todo list → list tự động refetch. Ngoài ra có `queryClient.setQueryData()` để update cache trực tiếp mà không cần refetch — hữu ích khi mutation trả về data mới.

## Detailed Answer (EN)
Cache invalidation marks data as stale to trigger a refetch. Usage: `queryClient.invalidateQueries({ queryKey: ['todos'] })` — all queries whose key starts with 'todos' are marked stale. If a component is currently mounted, it refetches immediately; otherwise it refetches when the component mounts again. Typically called after a successful mutation: add a todo → invalidate the todo list → list automatically refetches. You can also use `queryClient.setQueryData()` to update the cache directly without refetching — useful when a mutation returns the updated data.
