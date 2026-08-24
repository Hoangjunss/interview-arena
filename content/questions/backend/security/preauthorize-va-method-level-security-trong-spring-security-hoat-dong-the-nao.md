---
id: preauthorize-va-method-level-security-trong-spring-security-hoat-dong-the-nao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@PreAuthorize và method-level security trong Spring Security hoạt động thế nào?

## Question (EN)
How do @PreAuthorize and method-level security work in Spring Security?

## Đáp án chi tiết (VI)
**Method-level security** bảo vệ từng method bằng annotation thay vì chỉ ở URL level. Bật bằng `@EnableMethodSecurity` (thay `@EnableGlobalMethodSecurity` đã deprecated).\
\
**`@PreAuthorize`** — kiểm tra trước khi method chạy (dùng SpEL):\
```java\
@PreAuthorize(\\"hasRole('ADMIN')\\")\
void deleteOrder(Long id) { ... }\
\
@PreAuthorize(\\"#orderId == authentication.principal.id or hasRole('ADMIN')\\")   // ownership\
Order getOrder(Long orderId) { ... }\
```\
\
**`@PostAuthorize`** — kiểm tra sau khi method chạy (check return value): `@PostAuthorize(\\"returnObject.owner == authentication.name\\")`.\
**`@Secured(\\"ROLE_ADMIN\\")`** — đơn giản hơn, không SpEL.\
\
**Lưu ý:** `@PreAuthorize` (SpEL) linh hoạt nhất, recommended; chạy qua AOP proxy → self-invocation không được bảo vệ.

## Detailed Answer (EN)
**Method-level security** protects individual methods with annotations rather than only at the URL level. Enable with `@EnableMethodSecurity` (replaces the deprecated `@EnableGlobalMethodSecurity`).\
\
**`@PreAuthorize`** — checks before the method runs (uses SpEL):\
```java\
@PreAuthorize(\\"hasRole('ADMIN')\\")\
void deleteOrder(Long id) { ... }\
\
@PreAuthorize(\\"#orderId == authentication.principal.id or hasRole('ADMIN')\\")   // ownership\
Order getOrder(Long orderId) { ... }\
```\
\
**`@PostAuthorize`** — checks after the method runs (checks the return value): `@PostAuthorize(\\"returnObject.owner == authentication.name\\")`.\
**`@Secured(\\"ROLE_ADMIN\\")`** — simpler, no SpEL.\
\
**Note:** `@PreAuthorize` (SpEL) is the most flexible, recommended; it runs through an AOP proxy → self-invocation is not protected.
