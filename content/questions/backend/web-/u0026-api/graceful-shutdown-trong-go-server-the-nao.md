---
id: graceful-shutdown-trong-go-server-the-nao
position: backend
technology: web-\u0026-api
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Graceful shutdown trong Go server thế nào?

## Question (EN)
How do you implement graceful shutdown in a Go server?

## Đáp án chi tiết (VI)
Graceful shutdown đợi các request đang xử lý hoàn thành trước khi thoát process, tránh mất data hoặc trả 502 cho client.\
```go\
srv := \u0026http.Server{Addr: \\":8080\\

## Detailed Answer (EN)
Graceful shutdown lets in-flight requests complete before the process exits — preventing data loss or 502 responses to clients.\
```go\
srv := \u0026http.Server{Addr: \\":8080\\
