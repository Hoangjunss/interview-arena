---
id: usequery-hook-hoat-dong-nhu-the-nao-cac-tham-so-co-ban-la-gi
position: backend
technology: react-query
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useQuery hook hoạt động như thế nào? Các tham số cơ bản là gì?

## Question (EN)
How does the useQuery hook work? What are its basic parameters?

## Đáp án chi tiết (VI)
useQuery là hook chính để đọc data, nhận 2 tham số bắt buộc: `queryKey` (mảng định danh duy nhất, ví dụ `['todos', { status: 'active' }]`) và `queryFn` (async function trả về data, ví dụ `() =\u003e fetch('/api/todos').then(r =\u003e r.json())`). Trả về object gồm: `data` (kết quả), `isLoading` (true lần fetch đầu), `isFetching` (true khi đang fetch kể cả background), `isError`/`error` (lỗi), `isSuccess`, `status`. Cơ chế: component mount → check cache theo queryKey → nếu có data fresh thì dùng luôn, nếu stale thì vừa show cached data vừa refetch background. Đây là pattern stale-while-revalidate.

## Detailed Answer (EN)
useQuery is the primary hook for reading data. It takes two required parameters: `queryKey` (a unique identifier array, e.g., `['todos', { status: 'active' }]`) and `queryFn` (an async function returning data, e.g., `() =\u003e fetch('/api/todos').then(r =\u003e r.json())`). Returns an object with: `data` (result), `isLoading` (true on first fetch), `isFetching` (true whenever fetching, including background), `isError`/`error` (error info), `isSuccess`, `status`. How it works: component mounts → checks cache by queryKey → if data is fresh, uses it immediately; if stale, shows cached data while refetching in the background. This is the stale-while-revalidate pattern.
