---
id: responsestatus-dung-khi-nao
position: backend
technology: exception-\u0026-validation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@ResponseStatus dùng khi nào?

## Question (EN)
When do you use @ResponseStatus?

## Đáp án chi tiết (VI)
`@ResponseStatus` gán HTTP status cho exception class hoặc controller method — khai báo tĩnh thay vì `ResponseEntity`.\
\
**Trên exception class:**\
```java\
@ResponseStatus(HttpStatus.NOT_FOUND)   // → 404\
class UserNotFoundException extends RuntimeException {}\
\
@ResponseStatus(value = HttpStatus.CONFLICT, reason = \\"Email already registered\\")  // → 409\
class DuplicateEmailException extends RuntimeException {}\
```\
Spring bắt exception → tự trả status đã khai.\
\
**Trên controller method:**\
```java\
@PostMapping @ResponseStatus(HttpStatus.CREATED)   // → 201\
User create(@RequestBody @Valid CreateUserRequest req) { return userService.create(req); }\
```\
\
**vs `ResponseEntity`:** `@ResponseStatus` cho status cố định, đơn giản; `ResponseEntity` khi status động, cần header, body có thể null. **Lưu ý:** nếu có `@ExceptionHandler` trong `@ControllerAdvice`, `@ResponseStatus` trên exception bị bỏ qua — handler ưu tiên.

## Detailed Answer (EN)
`@ResponseStatus` assigns an HTTP status to an exception class or a controller method — a static declaration instead of `ResponseEntity`.\
\
**On an exception class:**\
```java\
@ResponseStatus(HttpStatus.NOT_FOUND)   // → 404\
class UserNotFoundException extends RuntimeException {}\
\
@ResponseStatus(value = HttpStatus.CONFLICT, reason = \\"Email already registered\\")  // → 409\
class DuplicateEmailException extends RuntimeException {}\
```\
Spring catches the exception → returns the declared status automatically.\
\
**On a controller method:**\
```java\
@PostMapping @ResponseStatus(HttpStatus.CREATED)   // → 201\
User create(@RequestBody @Valid CreateUserRequest req) { return userService.create(req); }\
```\
\
**vs `ResponseEntity`:** `@ResponseStatus` for a fixed status, simple; `ResponseEntity` when the status is dynamic, extra headers are needed, or the body may be null. **Note:** if a `@ExceptionHandler` exists in `@ControllerAdvice`, `@ResponseStatus` on the exception is ignored — the handler wins.
