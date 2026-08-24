---
id: data-loading-voi-react-router-v6-4-loader-functions-la-gi
position: backend
technology: context-\u0026-router
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Data loading với React Router v6.4+ loader functions là gì?

## Question (EN)
What are loader functions for data loading in React Router v6.4+?

## Đáp án chi tiết (VI)
React Router v6.4 giới thiệu loader function cho Route để fetch data trước khi render component: `{ path: '/users/:id', loader: ({ params }) =\u003e fetchUser(params.id), element: \u003cUserDetail /\u003e }`. Dùng `useLoaderData()` trong component để access data. Xử lý loading/error states qua errorElement. Tương tự Next.js data fetching pattern.

## Detailed Answer (EN)
React Router v6.4 introduced loader functions on Route definitions to fetch data before the component renders: `{ path: '/users/:id', loader: ({ params }) =\u003e fetchUser(params.id), element: \u003cUserDetail /\u003e }`. Access the data in the component with `useLoaderData()`. Handle loading and error states via the errorElement property. This is conceptually similar to Next.js data fetching patterns.
