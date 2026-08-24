---
id: inject-khac-constructor-injection-the-nao
position: backend
technology: dependency-injection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`inject()` khác constructor injection thế nào?

## Question (EN)
How is `inject()` different from constructor injection?

## Đáp án chi tiết (VI)
Constructor injection khai báo dependency qua constructor parameters, rõ ràng và quen thuộc.\
\
Ví dụ functional guard dùng `inject()`:\
```typescript\
export const authGuard: CanActivateFn = () =\u003e {\
  const auth = inject(AuthService)\
  const router = inject(Router)\
\
  return auth.isLoggedIn() ? true : router.createUrlTree([\\"/login\\"])\
}\
```\
`inject()` gọn hơn cho guards, resolvers, interceptors hoặc field initializers; chỉ gọi trong injection context hợp lệ.

## Detailed Answer (EN)
Constructor injection declares dependencies through constructor parameters and is explicit and familiar.\
\
Example functional guard using `inject()`:\
```typescript\
export const authGuard: CanActivateFn = () =\u003e {\
  const auth = inject(AuthService)\
  const router = inject(Router)\
\
  return auth.isLoggedIn() ? true : router.createUrlTree([\\"/login\\"])\
}\
```\
`inject()` is convenient for guards, resolvers, interceptors or field initializers; call it only in a valid injection context.
