---
id: table-driven-tests-trong-go-la-gi
position: backend
technology: testing-\u0026-tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Table-driven tests trong Go là gì?

## Question (EN)
What are table-driven tests in Go?

## Đáp án chi tiết (VI)
Pattern test nhiều cases bằng slice of structs — DRY, dễ thêm cases, idiomatic Go.\
```go\
func TestSquare(t *testing.T) {\
    cases := []struct {\
        name  string\
        input int\
        want  int\
    }{\
        {\\"positive\\

## Detailed Answer (EN)
A pattern that tests multiple cases using a slice of structs — DRY, easy to extend, idiomatic Go.\
```go\
func TestSquare(t *testing.T) {\
    cases := []struct {\
        name  string\
        input int\
        want  int\
    }{\
        {\\"positive\\
