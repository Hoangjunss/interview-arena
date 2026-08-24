---
id: errgroup-dung-khi-nao
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Errgroup dùng khi nào?

## Question (EN)
When should you use errgroup?

## Đáp án chi tiết (VI)
`golang.org/x/sync/errgroup`: chạy nhiều goroutines, trả lỗi đầu tiên, cancel tất cả khi 1 lỗi. `g, ctx := errgroup.WithContext(ctx); g.Go(func() error { ... }); if err := g.Wait(); err != nil { ... }`. Tốt hơn WaitGroup khi cần error propagation và cancellation.

## Detailed Answer (EN)
`golang.org/x/sync/errgroup` runs multiple goroutines, returns the first error, and cancels all goroutines when one fails. `g, ctx := errgroup.WithContext(ctx); g.Go(func() error { ... }); if err := g.Wait(); err != nil { ... }`. Better than WaitGroup when you need error propagation and automatic cancellation.
