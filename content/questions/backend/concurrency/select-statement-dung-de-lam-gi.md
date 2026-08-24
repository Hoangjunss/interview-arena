---
id: select-statement-dung-de-lam-gi
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Select statement dùng để làm gì?

## Question (EN)
What is the select statement used for?

## Đáp án chi tiết (VI)
`select { case v := \u003c-ch1: ... case ch2 \u003c- x: ... default: ... }` chờ multiple channel operations, chạy case sẵn sàng đầu tiên. Nếu nhiều case sẵn sàng → chọn random. `default` chạy nếu không case nào sẵn sàng (non-blocking). Dùng cho timeout: `case \u003c-time.After(5*time.Second)`.

## Detailed Answer (EN)
`select { case v := \u003c-ch1: ... case ch2 \u003c- x: ... default: ... }` waits on multiple channel operations and runs the first one ready. If multiple cases are ready, one is chosen at random. `default` runs immediately if no case is ready (non-blocking). Useful for timeouts: `case \u003c-time.After(5*time.Second)`.
