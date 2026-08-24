---
id: fibers-trong-php-8-1-la-gi-va-khac-threads-nhu-the-nao
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fibers trong PHP 8.1 là gì và khác threads như thế nào?

## Question (EN)
What are Fibers in PHP 8.1 and how are they different from threads?

## Đáp án chi tiết (VI)
Fibers là các luồng nhẹ (lightweight) ở user-space, cho phép tạm dừng và tiếp tục thực thi code mà không cần đa luồng OS. \
\
**Ví dụ:** `$fiber = new Fiber(function() { $value = Fiber::suspend(\\"hello\\"); echo $value; }); $fiber-\u003estart(); $fiber-\u003eresume(\\"world\\");`. Khác với threads: Fibers không tạo tiến trình OS riêng, tiêu tốn ít bộ nhớ hơn, không cần lock/mutex. Ứng dụng: xử lý nhiều I/O đồng thời (API call, query DB) trong một request. Các thư viện như Amp và ReactPHP dùng Fibers để xây dựng server phi đồng bộ hiệu năng cao.

## Detailed Answer (EN)
Fibers are lightweight user-space coroutines that enable pausing and resuming code execution without OS-level threading. \
\
**Example:** `$fiber = new Fiber(function() { $value = Fiber::suspend(\\"hello\\"); echo $value; }); $fiber-\u003estart(); $fiber-\u003eresume(\\"world\\");`. Unlike threads: Fibers don't create separate OS processes, consume less memory, no need for locks/mutexes. Use cases: handling multiple concurrent I/O (API calls, DB queries) in one request. Libraries like Amp and ReactPHP use Fibers to build high-performance async servers.
