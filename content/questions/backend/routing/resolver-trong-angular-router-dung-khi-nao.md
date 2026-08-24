---
id: resolver-trong-angular-router-dung-khi-nao
position: backend
technology: routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Resolver trong Angular Router dùng khi nào?

## Question (EN)
When should you use a resolver in Angular Router?

## Đáp án chi tiết (VI)
Resolver fetch hoặc chuẩn bị data trước khi route activate, giúp component nhận data đã sẵn sàng và xử lý loading/error ở routing layer.\
\
Ví dụ functional resolver:\
```typescript\
export const userResolver: ResolveFn\u003cUser\u003e = route =\u003e {\
  const api = inject(UserApi)\
  return api.getUser(route.paramMap.get(\\"id\\")!)\
}\
```\
Dùng resolver khi màn hình không có ý nghĩa nếu thiếu data chính, như detail page cần entity theo id. Không nên dùng cho mọi request; data phụ hoặc có thể stream sau khi render thì fetch trong component/store để route chuyển nhanh hơn.

## Detailed Answer (EN)
A resolver fetches or prepares data before a route activates, letting the component receive ready data and moving loading/error handling into the routing layer.\
\
Functional resolver example:\
```typescript\
export const userResolver: ResolveFn\u003cUser\u003e = route =\u003e {\
  const api = inject(UserApi)\
  return api.getUser(route.paramMap.get(\\"id\\")!)\
}\
```\
Use it when the screen is not meaningful without the main data, such as a detail page that needs an entity by id. Do not use it for every request; secondary data or data that can stream after render can be fetched in the component/store so route transitions stay fast.
