---
id: multiple-return-values-trong-go-dung-khi-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multiple return values trong Go dùng khi nào?

## Question (EN)
When are multiple return values used in Go?

## Đáp án chi tiết (VI)
Pattern phổ biến nhất: trả `(result, error)`. Nếu không cần 1 giá trị, dùng `_` (blank identifier). Khác biệt lớn với JS/TS: Go không dùng try/catch mà handle error ngay tại chỗ.\
```go\
// Pattern (result, error)\
val, err := strconv.Atoi(\\"123\\")\
if err != nil {\
    log.Fatal(err)\
}\
\
// Bỏ qua giá trị không cần dùng blank identifier\
_, err := doSomething()\
\
// Trả nhiều giá trị tùy ý\
func minMax(nums []int) (min, max int) { ... }\
min, max := minMax([]int{3, 1, 4, 1, 5})\
```

## Detailed Answer (EN)
The most common pattern is returning `(result, error)`. Use `_` (blank identifier) to discard unwanted values. A key difference from JS/TS: Go does not use try/catch; errors are handled inline at the call site.\
```go\
// (result, error) pattern\
val, err := strconv.Atoi(\\"123\\")\
if err != nil {\
    log.Fatal(err)\
}\
\
// Discard unwanted value with blank identifier\
_, err := doSomething()\
\
// Return arbitrary number of values\
func minMax(nums []int) (min, max int) { ... }\
min, max := minMax([]int{3, 1, 4, 1, 5})\
```
