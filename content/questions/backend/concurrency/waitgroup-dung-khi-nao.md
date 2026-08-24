---
id: waitgroup-dung-khi-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WaitGroup dùng khi nào?

## Question (EN)
When should you use a WaitGroup?

## Đáp án chi tiết (VI)
Dùng khi cần đợi nhiều goroutines hoàn thành trước khi tiếp tục. Đơn giản hơn channel cho fan-out/fan-in.\
```go\
var wg sync.WaitGroup\
\
urls := []string{\\"https://a.com\\

## Detailed Answer (EN)
Use it when you need to wait for multiple goroutines to finish before continuing. Simpler than channels for fan-out/fan-in patterns.\
```go\
var wg sync.WaitGroup\
\
urls := []string{\\"https://a.com\\
