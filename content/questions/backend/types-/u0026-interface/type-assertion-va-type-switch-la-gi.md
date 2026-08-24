---
id: type-assertion-va-type-switch-la-gi
position: backend
technology: types-\u0026-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type assertion và type switch là gì?

## Question (EN)
What are type assertions and type switches?

## Đáp án chi tiết (VI)
Type assertion lấy giá trị cụ thể từ interface. Type switch xử lý nhiều types một cách gọn gàng. Tương tự instanceof trong JS.\
```go\
var i any = \\"hello\\"\
\
// Type assertion — panic nếu sai type\
s := i.(string)\
\
// Safe type assertion — không panic\
s, ok := i.(string)\
if ok {\
    fmt.Println(s)\
}\
\
// Type switch — idiomatic Go\
func describe(i any) {\
    switch v := i.(type) {\
    case string:\
        fmt.Printf(\\"string of length %d\\\
\\

## Detailed Answer (EN)
Type assertions extract a concrete value from an interface. Type switches handle multiple types cleanly. Similar to `instanceof` in JavaScript.\
```go\
var i any = \\"hello\\"\
\
// Type assertion — panics if wrong type\
s := i.(string)\
\
// Safe type assertion — no panic\
s, ok := i.(string)\
if ok {\
    fmt.Println(s)\
}\
\
// Type switch — idiomatic Go\
func describe(i any) {\
    switch v := i.(type) {\
    case string:\
        fmt.Printf(\\"string of length %d\\\
\\
