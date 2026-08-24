---
id: ham-function-trong-go-khai-bao-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm (function) trong Go khai báo thế nào?

## Question (EN)
How are functions declared in Go?

## Đáp án chi tiết (VI)
Khai báo hàm cơ bản dùng từ khóa `func`. Go hỗ trợ multiple return values và named returns.\
```go\
// Hàm cơ bản\
func add(a int, b int) int {\
    return a + b\
}\
\
// Multiple return values\
func divide(a, b float64) (float64, error) {\
    if b == 0 {\
        return 0, fmt.Errorf(\\"division by zero\\")\
    }\
    return a / b, nil\
}\
\
// Named return values\
func swap(a, b int) (x, y int) {\
    x, y = b, a\
    return\
}\
\
// Functions là first-class citizens\
add := func(a, b int) int { return a + b }\
```\
Functions là first-class citizens, có thể gán cho biến hoặc truyền như tham số.

## Detailed Answer (EN)
Function declaration uses the `func` keyword. Go supports multiple return values and named returns.\
```go\
// Basic function\
func add(a int, b int) int {\
    return a + b\
}\
\
// Multiple return values\
func divide(a, b float64) (float64, error) {\
    if b == 0 {\
        return 0, fmt.Errorf(\\"division by zero\\")\
    }\
    return a / b, nil\
}\
\
// Named return values\
func swap(a, b int) (x, y int) {\
    x, y = b, a\
    return\
}\
\
// Functions are first-class citizens\
add := func(a, b int) int { return a + b }\
```\
Functions can be assigned to variables or passed as parameters.
