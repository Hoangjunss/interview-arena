---
id: controlleradvice-va-exceptionhandler-dung-de-lam-gi
position: backend
technology: exception-\u0026-validation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@ControllerAdvice và @ExceptionHandler dùng để làm gì?

## Question (EN)
What are @ControllerAdvice and @ExceptionHandler used for?

## Đáp án chi tiết (VI)
`@RestControllerAdvice` + `@ExceptionHandler` xử lý exception **tập trung** — không try/catch rải khắp controller.\
\
```java\
@RestControllerAdvice\
class GlobalExceptionHandler {\
  @ExceptionHandler(EntityNotFoundException.class)\
  @ResponseStatus(HttpStatus.NOT_FOUND)\
  ProblemDetail handleNotFound(EntityNotFoundException ex) {\
    return ProblemDetail.forStatusAndDetail(NOT_FOUND, ex.getMessage());\
  }\
}\
```\
\
Tương tự bắt `MethodArgumentNotValidException` (lỗi `@Valid`) trả 400 kèm map field→message từ `ex.getBindingResult().getFieldErrors()`, và `Exception.class` trả 500 generic (log full stack, không lộ chi tiết ra ngoài).\
\
**ProblemDetail** (Spring 6, RFC 9457) = format error response chuẩn: `type`, `title`, `status`, `detail` + property tuỳ biến.\
\
**Scope:** `@ControllerAdvice` áp cho mọi controller; thu hẹp bằng `@ControllerAdvice(basePackages = \\"com.example.api\\")`.

## Detailed Answer (EN)
`@RestControllerAdvice` + `@ExceptionHandler` handle exceptions **centrally** — no try/catch scattered across controllers.\
\
```java\
@RestControllerAdvice\
class GlobalExceptionHandler {\
  @ExceptionHandler(EntityNotFoundException.class)\
  @ResponseStatus(HttpStatus.NOT_FOUND)\
  ProblemDetail handleNotFound(EntityNotFoundException ex) {\
    return ProblemDetail.forStatusAndDetail(NOT_FOUND, ex.getMessage());\
  }\
}\
```\
\
Similarly catch `MethodArgumentNotValidException` (`@Valid` failures) returning 400 with a field→message map from `ex.getBindingResult().getFieldErrors()`, and `Exception.class` returning a generic 500 (log the full stack, expose no internals).\
\
**ProblemDetail** (Spring 6, RFC 9457) = the standard error response format: `type`, `title`, `status`, `detail` + custom properties.\
\
**Scope:** `@ControllerAdvice` applies to all controllers; narrow with `@ControllerAdvice(basePackages = \\"com.example.api\\")`.
