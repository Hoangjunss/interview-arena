---
id: react-router-searchparams-query-strings-duoc-xu-ly-nhu-the-nao
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Router SearchParams (query strings) được xử lý như thế nào?

## Question (EN)
How are query strings (SearchParams) handled in React Router?

## Đáp án chi tiết (VI)
Dùng useSearchParams hook: `const [searchParams, setSearchParams] = useSearchParams()`. Đọc: `searchParams.get('tab')`. Cập nhật: `setSearchParams({ tab: 'new' })` hay `setSearchParams(prev =\u003e { prev.set('tab', 'new'); return prev; })`. Phù hợp cho filter, pagination state cần share qua URL.

## Detailed Answer (EN)
Use the useSearchParams hook: `const [searchParams, setSearchParams] = useSearchParams()`. Read a value: `searchParams.get('tab')`. Update: `setSearchParams({ tab: 'new' })` or `setSearchParams(prev =\u003e { prev.set('tab', 'new'); return prev; })`. This is ideal for filter and pagination state that needs to be shareable via URL.
