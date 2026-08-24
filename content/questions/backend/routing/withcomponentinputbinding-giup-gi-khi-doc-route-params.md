---
id: withcomponentinputbinding-giup-gi-khi-doc-route-params
position: backend
technology: routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`withComponentInputBinding()` giúp gì khi đọc route params?

## Question (EN)
How does `withComponentInputBinding()` help with route params?

## Đáp án chi tiết (VI)
`withComponentInputBinding()` bind path params, query params, matrix params và route data vào component inputs có cùng tên.\
\
Ví dụ:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [provideRouter(routes, withComponentInputBinding())],\
})\
\
@Component({ template: \\"User {{ id() }}\\" })\
export class UserPage {\
  id = input.required\u003cstring\u003e()\
}\
```\
Cách này làm component dễ test hơn và giảm coupling với `ActivatedRoute`.

## Detailed Answer (EN)
`withComponentInputBinding()` binds path params, query params, matrix params and route data into component inputs with matching names.\
\
Example:\
```typescript\
bootstrapApplication(AppComponent, {\
  providers: [provideRouter(routes, withComponentInputBinding())],\
})\
\
@Component({ template: \\"User {{ id() }}\\" })\
export class UserPage {\
  id = input.required\u003cstring\u003e()\
}\
```\
This makes components easier to test and less coupled to `ActivatedRoute`.
