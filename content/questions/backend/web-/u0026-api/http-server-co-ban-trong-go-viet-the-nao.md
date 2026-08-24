---
id: http-server-co-ban-trong-go-viet-the-nao
position: backend
technology: web-\u0026-api
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTP server cơ bản trong Go viết thế nào?

## Question (EN)
How do you write a basic HTTP server in Go?

## Đáp án chi tiết (VI)
Stdlib đủ mạnh cho production. Không bắt buộc framework. `http.ServeMux` là default router.\
```go\
package main\
\
import (\
    \\"fmt\\"\
    \\"net/http\\"\
)\
\
func helloHandler(w http.ResponseWriter, r *http.Request) {\
    fmt.Fprintf(w, \\"Hello, %s!\\

## Detailed Answer (EN)
The standard library is production-capable — no framework required. `http.ServeMux` is the default router.\
```go\
package main\
\
import (\
    \\"fmt\\"\
    \\"net/http\\"\
)\
\
func helloHandler(w http.ResponseWriter, r *http.Request) {\
    fmt.Fprintf(w, \\"Hello, %s!\\
