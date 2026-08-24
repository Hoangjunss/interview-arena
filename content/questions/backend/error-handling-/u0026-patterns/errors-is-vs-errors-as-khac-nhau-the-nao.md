---
id: errors-is-vs-errors-as-khac-nhau-the-nao
position: backend
technology: error-handling-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
errors.Is vs errors.As khác nhau thế nào?

## Question (EN)
What is the difference between errors.Is and errors.As?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
Both traverse the **error chain** (errors wrapped with `%w`), but serve different purposes.\
\
**`errors.Is(err, target)`** — checks identity: is `err` (or any wrapped error) equal to `target`? Use for **sentinel errors**.\
\
```go\
var ErrNotFound = errors.New(\\"not found\\")\
err := fmt.Errorf(\\"service: %w\\
