---
id: testing-trong-go-viet-the-nao
position: backend
technology: testing-\u0026-tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Testing trong Go viết thế nào?

## Question (EN)
How do you write tests in Go?

## Đáp án chi tiết (VI)
File `_test.go`, function `TestXxx(t *testing.T)`. Run: `go test ./...`. Go không có built-in assert — dùng if/t.Errorf. Table-driven tests là pattern phổ biến.\
```go\
// math_test.go\
package math\
\
import \\"testing\\"\
\
func TestAdd(t *testing.T) {\
    got := Add(2, 3)\
    want := 5\
    if got != want {\
        t.Errorf(\\"Add(2, 3) = %d; want %d\\

## Detailed Answer (EN)
Test files end in `_test.go`; test functions are `TestXxx(t *testing.T)`. Run with: `go test ./...`. There is no built-in assert — use if/t.Errorf. Table-driven tests are the idiomatic style.\
```go\
// math_test.go\
package math\
\
import \\"testing\\"\
\
func TestAdd(t *testing.T) {\
    got := Add(2, 3)\
    want := 5\
    if got != want {\
        t.Errorf(\\"Add(2, 3) = %d; want %d\\
