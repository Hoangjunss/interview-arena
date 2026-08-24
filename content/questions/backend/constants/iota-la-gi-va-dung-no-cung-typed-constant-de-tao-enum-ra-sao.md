---
id: iota-la-gi-va-dung-no-cung-typed-constant-de-tao-enum-ra-sao
position: backend
technology: constants
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`iota` là gì, và dùng nó cùng typed constant để tạo enum ra sao?

## Question (EN)
What is `iota`, and how do you use it with typed constants to build enums?

## Đáp án chi tiết (VI)
`iota` là bộ đếm compile-time: nó **reset về 0 ở đầu mỗi block `const`** và **tăng 1 sau mỗi dòng ConstSpec**. Kết hợp với một kiểu riêng, đây là cách Go dựng enum.\
\
- Gán một kiểu (`Weekday int`) để tạo enum có type an toàn thay vì `int` trần.\
- Một dòng trống-biểu-thức lặp lại biểu thức phía trên (không cần viết lại `iota`).\
- Bỏ qua giá trị đầu bằng `_`; dịch bit để tạo cờ hoặc bội số.\
\
```go\
type Weekday int\
const (\
    Sunday Weekday = iota // 0\
    Monday                // 1\
    Tuesday               // 2\
)\
\
const (\
    _  = iota             // bỏ 0\
    KB = 1 \u003c\u003c (10 * iota) // 1\u003c\u003c10\
    MB                    // 1\u003c\u003c20\
)\
```

## Detailed Answer (EN)
`iota` is a compile-time counter: it **resets to 0 at the start of each `const` block** and **increments by 1 after every ConstSpec line**. Paired with a named type, this is how Go builds enums.\
\
- Assign a type (`Weekday int`) for a type-safe enum instead of a bare `int`.\
- A blank expression line repeats the expression above (no need to rewrite `iota`).\
- Skip the first value with `_`; shift bits to make flags or multiples.\
\
```go\
type Weekday int\
const (\
    Sunday Weekday = iota // 0\
    Monday                // 1\
    Tuesday               // 2\
)\
\
const (\
    _  = iota             // skip 0\
    KB = 1 \u003c\u003c (10 * iota) // 1\u003c\u003c10\
    MB                    // 1\u003c\u003c20\
)\
```
