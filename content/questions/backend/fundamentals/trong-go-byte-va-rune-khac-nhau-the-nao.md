---
id: trong-go-byte-va-rune-khac-nhau-the-nao
position: backend
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Go, `byte` và `rune` khác nhau thế nào?

## Question (EN)
In Go, how do `byte` and `rune` differ?

## Đáp án chi tiết (VI)
`byte` là alias của `uint8` (1 byte thô); `rune` là alias của `int32`, đại diện cho **một code point Unicode**. String trong Go là chuỗi byte UTF-8 bất biến, không phải mảng ký tự.\
\
Hệ quả:\
- `s[i]` trả về **byte**, và `len(s)` đếm **byte** — không phải số ký tự.\
- `for i, r := range s` lặp theo **rune**: giải mã UTF-8, `i` là offset byte, `r` là rune.\
- `[]byte(s)` copy byte thô; `[]rune(s)` giải mã ra các code point.\
\
```go\
s := \\"héllo\\"\
len(s)                     // 6 — é chiếm 2 byte UTF-8\
utf8.RuneCountInString(s)  // 5 — số rune\
for i, r := range s {      // r là rune, i là offset byte\
    _ = i; _ = r\
}\
```

## Detailed Answer (EN)
`byte` is an alias for `uint8` (one raw byte); `rune` is an alias for `int32` and represents **one Unicode code point**. A Go string is an immutable sequence of UTF-8 bytes, not an array of characters.\
\
Consequences:\
- `s[i]` returns a **byte**, and `len(s)` counts **bytes** — not characters.\
- `for i, r := range s` iterates by **rune**: it decodes UTF-8, `i` is the byte offset, `r` is the rune.\
- `[]byte(s)` copies raw bytes; `[]rune(s)` decodes into code points.\
\
```go\
s := \\"héllo\\"\
len(s)                     // 6 — é is 2 UTF-8 bytes\
utf8.RuneCountInString(s)  // 5 — number of runes\
for i, r := range s {      // r is a rune, i is a byte offset\
    _ = i; _ = r\
}\
```
