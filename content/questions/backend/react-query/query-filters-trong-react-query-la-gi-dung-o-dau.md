---
id: query-filters-trong-react-query-la-gi-dung-o-dau
position: backend
technology: react-query
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Query Filters trong React Query là gì? Dùng ở đâu?

## Question (EN)
What are Query Filters in React Query?

## Đáp án chi tiết (VI)
Query Filters là pattern matching system cho phép target nhóm queries khi thao tác hàng loạt. Dùng trong `invalidateQueries`, `refetchQueries`, `removeQueries`, `cancelQueries`. Filter options: `queryKey` (fuzzy match — `['todos']` match cả `['todos', 1]`), `type` ('active' = đang có subscriber, 'inactive' = cached nhưng không ai dùng, 'all'), `stale` (true/false), `fetchStatus` ('fetching'/'paused'/'idle'). Ví dụ thực tế: user logout → `queryClient.removeQueries({ type: 'all' })` xóa toàn bộ cache. Hoặc: mutation thành công → `invalidateQueries({ queryKey: ['todos'], type: 'active' })` chỉ refetch todos đang hiển thị.

## Detailed Answer (EN)
Query Filters are objects used to target specific queries when calling methods like invalidateQueries, cancelQueries, removeQueries, and refetchQueries. Filter properties: queryKey — partial or exact key matching; exact: true — only match queries with exactly this key; type — 'active' (has observers), 'inactive' (no observers), 'all'; stale — filter by stale state; predicate — function that receives a Query object and returns boolean for full custom filtering. Examples: queryClient.invalidateQueries({ queryKey: ['todos'] }) — invalidates all queries whose key starts with 'todos'; queryClient.invalidateQueries({ queryKey: ['todos'], exact: true }) — only invalidates ['todos'] exactly; queryClient.invalidateQueries({ type: 'active' }) — only refetches queries currently being observed. Filters are essential for targeted cache management after mutations.
