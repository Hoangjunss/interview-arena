---
id: sentinel-errors-va-custom-error-types-khi-nao-dung-cai-nao
position: backend
technology: error-handling-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sentinel errors và custom error types — khi nào dùng cái nào?

## Question (EN)
Sentinel errors vs custom error types — when to use which?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
**Sentinel errors** are predefined package-level error variables, suitable for simple error conditions without extra context. **Custom error types** carry metadata and should implement `Unwrap()` to participate in the error chain.\
\
```go\
// Sentinel — checked with errors.Is\
var ErrNotFound = errors.New(\\"not found\\")\
\
// Custom type — checked with errors.As, carries metadata\
type AppError struct {\
    Code    int\
    Message string\
    Err     error\
}\
func (e *AppError) Error() string { return fmt.Sprintf(\\"[%d] %s\\
