---
id: tai-sao-ruby-co-gil-global-interpreter-lock-anh-huong-the-nao-den-concurrency
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao Ruby có GIL (Global Interpreter Lock)? Ảnh hưởng thế nào đến concurrency?

## Question (EN)
Why does Ruby have a GIL (Global Interpreter Lock)? How does it affect concurrency?

## Đáp án chi tiết (VI)
MRI Ruby (CRuby) có **GIL** (còn gọi GVL — Global VM Lock): chỉ 1 thread được thực thi Ruby bytecode tại một thời điểm, ngay cả trên multi-core CPU.\
\
Lý do tồn tại: đơn giản hoá garbage collector và C extension — không cần lock từng object.\
\
Ảnh hưởng:\
- CPU-bound work (tính toán nặng): nhiều thread không tăng hiệu năng → dùng `Process.fork` hoặc Ractors (Ruby 3.0+).\
- I/O-bound work (HTTP call, DB, file): GIL tự động nhả khi thread chờ I/O → nhiều thread vẫn hữu ích.\
\
```ruby\
threads = urls.map { |url| Thread.new { Net::HTTP.get(URI(url)) } }\
threads.each(\u0026:join)\
```\
\
JRuby / TruffleRuby không có GIL → parallelism thật sự.

## Detailed Answer (EN)
MRI Ruby (CRuby) has a **GIL** (also called GVL — Global VM Lock): only one thread can execute Ruby bytecode at a time, even on multi-core hardware.\
\
Why it exists: simplifies the garbage collector and C extensions — no per-object locking needed.\
\
Impact:\
- CPU-bound work (heavy computation): multiple threads don't scale → use `Process.fork` or Ractors (Ruby 3.0+).\
- I/O-bound work (HTTP, DB, file): GIL is released while waiting for I/O → threads still help.\
\
```ruby\
threads = urls.map { |url| Thread.new { Net::HTTP.get(URI(url)) } }\
threads.each(\u0026:join)\
```\
\
JRuby / TruffleRuby have no GIL — true parallelism is possible.
