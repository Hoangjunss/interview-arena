---
id: ractor-trong-ruby-3-0-la-gi-giai-quyet-van-de-gi-ma-thread-khong-lam-duoc
position: backend
technology: exception-\u0026-gem
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ractor trong Ruby (3.0+) là gì? Giải quyết vấn đề gì mà Thread không làm được?

## Question (EN)
What is a Ractor in Ruby (3.0+)? What problem does it solve that Threads cannot?

## Đáp án chi tiết (VI)
Ractor (Ruby Actor, Ruby 3.0+) là đơn vị thực thi **không chia sẻ state** — mỗi Ractor có heap riêng, không có GIL giữa các Ractor. Đây là cách duy nhất trong CRuby để đạt **CPU parallelism thật sự**.\
\
```ruby\
# Thread — bị GIL giới hạn khi CPU-bound\
results = (1..4).map do |i|\
  Thread.new { i * i }  # chạy tuần tự thực sự\
end.map(\u0026:value)\
\
# Ractor — parallel thật sự\
ractors = (1..4).map do |i|\
  Ractor.new(i) { |n| n * n }  # parallel trên multi-core\
end\
results = ractors.map(\u0026:take)  # =\u003e [1, 4, 9, 16]\
```\
\
**Hạn chế:**\
- Object chia sẻ giữa Ractor phải là **frozen** hoặc được **move** (chuyển quyền sở hữu).\
- Ractor.new chỉ được truyền frozen/shareable object — mutable object phải dùng `Ractor.make_shareable`.\
- Nhiều gem (đặc biệt dùng global state) chưa Ractor-safe.\
\
Ractor phù hợp CPU-bound (tính toán nặng, mã hóa, image processing). Với I/O-bound, Thread vẫn đủ.

## Detailed Answer (EN)
A Ractor (Ruby Actor, Ruby 3.0+) is an execution unit with **no shared state** — each Ractor has its own heap, and there is no GIL between Ractors. This is the only way to achieve **true CPU parallelism** in CRuby.\
\
```ruby\
# Thread — blocked by GIL for CPU-bound work\
results = (1..4).map { |i| Thread.new { i * i } }.map(\u0026:value)\
\
# Ractor — true parallelism\
ractors = (1..4).map { |i| Ractor.new(i) { |n| n * n } }\
results = ractors.map(\u0026:take)  # =\u003e [1, 4, 9, 16]\
```\
\
**Constraints:**\
- Objects shared between Ractors must be **frozen** or **moved** (ownership transferred).\
- `Ractor.new` only accepts frozen/shareable objects; mutable objects need `Ractor.make_shareable`.\
- Many gems (especially those using global state) are not yet Ractor-safe.\
\
Ractors suit CPU-bound work (heavy computation, encryption, image processing). For I/O-bound, Threads remain sufficient.
