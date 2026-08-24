---
id: ham-init-la-gi-va-thu-tu-khoi-tao-package-trong-go-dien-ra-the-nao
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm `init` là gì, và thứ tự khởi tạo package trong Go diễn ra thế nào?

## Question (EN)
What is the `init` function, and how does package initialization order work in Go?

## Đáp án chi tiết (VI)
Khi một package được nạp, Go khởi tạo theo thứ tự:\
\
1. Các **package được import** khởi tạo trước (đệ quy) — mỗi package chỉ một lần.\
2. **Biến cấp package** được gán, theo thứ tự **phụ thuộc** (không phải thứ tự viết): biến nào cần biến khác thì biến kia xong trước.\
3. Tất cả hàm **`init()`** chạy, theo thứ tự file (được compiler đưa vào).\
\
`init()` không tham số, không giá trị trả về, **không gọi bằng tay được**, và một package/file có thể có nhiều `init`. Với package `main`, toàn bộ init chạy xong rồi mới tới `main()`.\
\
```go\
var cfg = loadConfig() // (2) chạy trước init\
\
func init() {          // (3) sau khi biến package sẵn sàng\
    validate(cfg)\
}\
```

## Detailed Answer (EN)
When a package is loaded, Go initializes it in this order:\
\
1. **Imported packages** are initialized first (recursively) — each exactly once.\
2. **Package-level variables** are assigned in **dependency** order (not source order): if one variable needs another, that one finishes first.\
3. All **`init()`** functions run, in the file order the compiler presents.\
\
`init()` takes no arguments, returns nothing, **cannot be called manually**, and a package/file may have several. For package `main`, all initialization completes before `main()` runs.\
\
```go\
var cfg = loadConfig() // (2) runs before init\
\
func init() {          // (3) after package vars are ready\
    validate(cfg)\
}\
```
