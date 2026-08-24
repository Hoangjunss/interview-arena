---
id: injectiontoken-dung-khi-nao
position: backend
technology: dependency-injection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
InjectionToken dùng khi nào?

## Question (EN)
When should you use `InjectionToken`?

## Đáp án chi tiết (VI)
`InjectionToken` dùng khi dependency không phải class concrete, ví dụ config object, primitive value, feature flag, API URL hoặc interface không tồn tại ở runtime.\
\
Ví dụ:\
```typescript\
export const API_URL = new InjectionToken\u003cstring\u003e(\\"API_URL\\")\
\
bootstrapApplication(AppComponent, {\
  providers: [{ provide: API_URL, useValue: \\"/api\\" }],\
})\
\
const apiUrl = inject(API_URL)\
```\
Với config cần lazy hoặc phụ thuộc dependency khác, provider có thể dùng `useFactory`.

## Detailed Answer (EN)
`InjectionToken` is used when a dependency is not a concrete class, such as a config object, primitive value, feature flag, API URL or an interface that does not exist at runtime.\
\
Example:\
```typescript\
export const API_URL = new InjectionToken\u003cstring\u003e(\\"API_URL\\")\
\
bootstrapApplication(AppComponent, {\
  providers: [{ provide: API_URL, useValue: \\"/api\\" }],\
})\
\
const apiUrl = inject(API_URL)\
```\
For lazy config or config depending on another dependency, use a `useFactory` provider.
