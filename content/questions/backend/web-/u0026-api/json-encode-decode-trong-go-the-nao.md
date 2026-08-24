---
id: json-encode-decode-trong-go-the-nao
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JSON encode/decode trong Go thế nào?

## Question (EN)
How does JSON encoding and decoding work in Go?

## Đáp án chi tiết (VI)
Go sử dụng package `encoding/json`. Struct tags quyết định cách ánh xạ field sang JSON key.\
```go\
// Định nghĩa struct với JSON tags\
type User struct {\
    Name  string `json:\\"name\\"`\
    Age   int    `json:\\"age,omitempty\\"` // bỏ qua nếu zero value\
    Email string `json:\\"-\\"`             // luôn bỏ qua khi encode\
}\
\
// Marshal — struct → JSON bytes\
u := User{Name: \\"Alice\\

## Detailed Answer (EN)
Go uses the `encoding/json` package. Struct tags control field-to-key mapping.\
```go\
// Struct with JSON tags\
type User struct {\
    Name  string `json:\\"name\\"`\
    Age   int    `json:\\"age,omitempty\\"` // omit if zero value\
    Email string `json:\\"-\\"`             // always omit\
}\
\
// Marshal — struct → JSON bytes\
u := User{Name: \\"Alice\\
