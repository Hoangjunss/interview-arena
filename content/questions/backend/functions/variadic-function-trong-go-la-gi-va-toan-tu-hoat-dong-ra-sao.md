---
id: variadic-function-trong-go-la-gi-va-toan-tu-hoat-dong-ra-sao
position: backend
technology: functions
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Variadic function trong Go là gì, và toán tử `...` hoạt động ra sao?

## Question (EN)
What is a variadic function in Go, and how does the `...` operator work?

## Đáp án chi tiết (VI)
Tham số **cuối cùng** của hàm có thể khai báo `...T` để nhận số lượng đối số biến thiên. Bên trong hàm, tham số đó là một `[]T` thường.\
\
Hai chiều dùng `...`:\
- **Gọi** với nhiều đối số rời: `sum(1, 2, 3)`.\
- **Spread** một slice có sẵn: `sum(xs...)` — truyền thẳng slice, không copy.\
\
Nếu không truyền gì, slice bên trong là `nil` (len 0). `fmt.Println(...any)` là ví dụ quen thuộc.\
\
```go\
func sum(nums ...int) int {\
    total := 0\
    for _, n := range nums {\
        total += n\
    }\
    return total\
}\
\
sum(1, 2, 3)          // 6\
xs := []int{1, 2, 3}\
sum(xs...)            // spread slice có sẵn\
```

## Detailed Answer (EN)
A function's **final** parameter can be declared `...T` to accept a variable number of arguments. Inside the function, that parameter is an ordinary `[]T`.\
\
`...` works two ways:\
- **Calling** with separate arguments: `sum(1, 2, 3)`.\
- **Spreading** an existing slice: `sum(xs...)` — passes the slice directly, without copying.\
\
With no arguments, the inner slice is `nil` (len 0). `fmt.Println(...any)` is the familiar example.\
\
```go\
func sum(nums ...int) int {\
    total := 0\
    for _, n := range nums {\
        total += n\
    }\
    return total\
}\
\
sum(1, 2, 3)          // 6\
xs := []int{1, 2, 3}\
sum(xs...)            // spread an existing slice\
```
