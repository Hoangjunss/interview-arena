---
id: vi-sao-mot-error-chua-con-tro-nil-lai-khong-bang-nil-trong-go
position: backend
technology: error-handling-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao một `error` chứa con trỏ nil lại không bằng `nil` trong Go?

## Question (EN)
Why does an `error` holding a nil pointer not equal `nil` in Go?

## Đáp án chi tiết (VI)
Một interface value trong Go gồm **hai phần**: (kiểu động, giá trị động). Interface chỉ bằng `nil` khi **cả hai** phần đều nil.\
\
Nếu bạn gán một con trỏ nil có kiểu cụ thể (vd `*MyError`) vào một biến `error`, interface giữ **kiểu ≠ nil** (dù value là nil). So sánh `!= nil` khi đó ra **true** — trái với kỳ vọng. Đây là bẫy typed-nil thường gặp khi trả `*MyError` qua kiểu `error`.\
\
```go\
func do() error {\
    var e *MyError = nil\
    return e            // interface = (*MyError, nil) — KHÔNG nil!\
}\
\
if do() != nil {       // chạy vào đây, sai kỳ vọng\
    // ...\
}\
```\
\
Cách tránh: trả thẳng `nil` khi không có lỗi, hoặc khai báo biến kiểu `error` ngay từ đầu chứ đừng dùng con trỏ cụ thể.

## Detailed Answer (EN)
A Go interface value has **two parts**: (dynamic type, dynamic value). An interface equals `nil` only when **both** parts are nil.\
\
If you assign a typed nil pointer (e.g. `*MyError`) into an `error` variable, the interface holds a **non-nil type** (even though the value is nil). Comparing `!= nil` then returns **true** — the opposite of what you expect. This is the classic typed-nil trap when returning `*MyError` through the `error` type.\
\
```go\
func do() error {\
    var e *MyError = nil\
    return e            // interface = (*MyError, nil) — NOT nil!\
}\
\
if do() != nil {       // this runs, against expectation\
    // ...\
}\
```\
\
To avoid it: return a literal `nil` when there is no error, or declare the variable as `error` from the start instead of a concrete pointer.
