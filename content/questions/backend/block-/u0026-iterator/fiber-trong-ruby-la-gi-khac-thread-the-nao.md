---
id: fiber-trong-ruby-la-gi-khac-thread-the-nao
position: backend
technology: block-\u0026-iterator
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fiber trong Ruby là gì? Khác Thread thế nào?

## Question (EN)
What is a Fiber in Ruby? How does it differ from a Thread?

## Đáp án chi tiết (VI)
Fiber là **coroutine nhẹ** — đơn vị code có thể tạm dừng (`Fiber.yield`) và tiếp tục (`resume`) theo ý muốn. Không có preemption như Thread.\
\
```ruby\
fib = Fiber.new do\
  a, b = 0, 1\
  loop do\
    Fiber.yield a   # trả giá trị về caller, tạm dừng\
    a, b = b, a + b\
  end\
end\
\
10.times { print fib.resume, \\" \\" }\
# 0 1 1 2 3 5 8 13 21 34\
```\
\
| | Fiber | Thread |\
|---|---|---|\
| Scheduling | **thủ công** — caller quyết định | OS / Ruby scheduler |\
| Overhead | rất nhỏ (stack riêng ~4 KB) | lớn hơn (~1 MB stack) |\
| Dùng cho | generator, lazy sequence, async I/O (Async gem) | parallelism (GIL hạn chế CPU) |\
\
**Ruby 3.0+:** `Fiber::Scheduler` interface cho phép tích hợp với event loop (Async, io-event gem) để non-blocking I/O.

## Detailed Answer (EN)
A Fiber is a **lightweight coroutine** — a unit of code that can be paused (`Fiber.yield`) and resumed (`resume`) on demand, without preemption.\
\
```ruby\
fib = Fiber.new do\
  a, b = 0, 1\
  loop do\
    Fiber.yield a\
    a, b = b, a + b\
  end\
end\
\
10.times { print fib.resume, \\" \\" }\
# 0 1 1 2 3 5 8 13 21 34\
```\
\
| | Fiber | Thread |\
|---|---|---|\
| Scheduling | **manual** — caller controls | OS / Ruby scheduler |\
| Overhead | tiny (~4 KB stack) | larger (~1 MB stack) |\
| Used for | generators, lazy sequences, async I/O | parallelism (GIL limits CPU) |\
\
**Ruby 3.0+:** `Fiber::Scheduler` interface enables non-blocking I/O integration with event loops (Async gem, io-event).
