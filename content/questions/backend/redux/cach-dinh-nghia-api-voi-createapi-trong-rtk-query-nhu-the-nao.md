---
id: cach-dinh-nghia-api-voi-createapi-trong-rtk-query-nhu-the-nao
position: backend
technology: redux
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách định nghĩa API với createApi trong RTK Query như thế nào?

## Question (EN)
How do you define an API with createApi in RTK Query?

## Đáp án chi tiết (VI)
`createApi` là core API của RTK Query, định nghĩa toàn bộ endpoints cho một base URL. Cấu hình `baseQuery` (thường `fetchBaseQuery({ baseUrl: '/api' })`) xác định cách gọi API, có thể custom để thêm auth headers hay handle token refresh. Mỗi endpoint là query (GET) hoặc mutation (POST/PUT/DELETE), tự động tạo hooks: `getUsers` → `useGetUsersQuery()`, `addUser` → `useAddUserMutation()`. Cache invalidation dùng tag system: `tagTypes: ['User']`, query `providesTags: ['User']`, mutation `invalidatesTags: ['User']` — khi add user xong, danh sách users tự refetch. Ví dụ: `endpoints: (builder) =\u003e ({ getUsers: builder.query({ query: () =\u003e '/users', providesTags: ['User'] }), addUser: builder.mutation({ query: (body) =\u003e ({ url: '/users', method: 'POST', body }), invalidatesTags: ['User'] }) })`. Lưu ý: chỉ nên có MỘT `createApi` per base URL, dùng `injectEndpoints` để code-split endpoints ra nhiều files.

## Detailed Answer (EN)
`createApi` is the core API of RTK Query, defining all endpoints for a base URL. The `baseQuery` config (typically `fetchBaseQuery({ baseUrl: '/api' })`) determines how API calls are made; it can be customized to add auth headers or handle token refresh. Each endpoint is a query (GET) or mutation (POST/PUT/DELETE), automatically generating hooks: `getUsers` → `useGetUsersQuery()`, `addUser` → `useAddUserMutation()`. Cache invalidation uses a tag system: `tagTypes: ['User']`, query with `providesTags: ['User']`, mutation with `invalidatesTags: ['User']` — after adding a user, the user list automatically refetches. Example: `endpoints: (builder) =\u003e ({ getUsers: builder.query({ query: () =\u003e '/users', providesTags: ['User'] }), addUser: builder.mutation({ query: (body) =\u003e ({ url: '/users', method: 'POST', body }), invalidatesTags: ['User'] }) })`. Pitfall: only one `createApi` per base URL — use `injectEndpoints` to code-split endpoints across files.
