---
id: context-package-dung-de-lam-gi
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context package dùng để làm gì?

## Question (EN)
What is the context package used for?

## Đáp án chi tiết (VI)
Package `context` cung cấp cơ chế truyền deadline, tín hiệu hủy (cancellation), và các giá trị request-scoped xuyên suốt chuỗi goroutine. Nguyên tắc quan trọng: luôn truyền context như tham số đầu tiên của function, không bao giờ lưu context vào struct.\
```go\
// WithTimeout — tự động hủy sau timeout\
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\
defer cancel() // luôn gọi cancel để tránh leak\
\
resp, err := http.NewRequestWithContext(ctx, \\"GET\\

## Detailed Answer (EN)
The `context` package propagates deadlines, cancellation signals, and request-scoped values across goroutines. Key rule: always pass context as the first function parameter; never store it in a struct.\
```go\
// WithTimeout — auto-cancels after the deadline\
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\
defer cancel() // always call cancel to avoid goroutine leaks\
\
req, _ := http.NewRequestWithContext(ctx, \\"GET\\
