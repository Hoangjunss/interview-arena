---
id: lua-scripting-trong-redis-tai-sao-can-dung-va-cac-use-case-dien-hinh
position: backend
technology: nhập-môn
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lua scripting trong Redis: tại sao cần dùng và các use case điển hình?

## Question (EN)
Lua scripting in Redis: why use it and what are the typical use cases?

## Đáp án chi tiết (VI)
Lua script trong Redis chạy atomically — toàn bộ script không thể bị interrupt bởi command khác, đây là điểm mạnh so với MULTI/EXEC. Dùng lệnh `EVAL script numkeys key [key ...] arg [arg ...]` hoặc `EVALSHA` (dùng SHA hash của script đã load để tránh gửi lại script). Use case: rate limiting — đọc counter, kiểm tra limit, tăng counter, set TTL trong một atomic operation; distributed lock — check và set lock atomically; complex conditional update không thể implement bằng một Redis command. Ví dụ rate limiter: `local current = redis.call('INCR', KEYS[1]); if current == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return current`. \
\
**Lưu ý:** Lua script block toàn bộ Redis trong khi chạy, không nên viết script chạy lâu; nên dùng `SCRIPT LOAD` để pre-load script và gọi bằng EVALSHA cho hiệu năng tốt hơn.

## Detailed Answer (EN)
Lua scripts in Redis execute atomically — the entire script cannot be interrupted by another command, which is a key advantage over MULTI/EXEC. Use `EVAL script numkeys key [key ...] arg [arg ...]` or `EVALSHA` (using the SHA hash of a pre-loaded script to avoid resending the script body). Use cases: rate limiting — read a counter, check the limit, increment, and set TTL all in one atomic operation; distributed locks — check and set a lock atomically; complex conditional updates that cannot be expressed as a single Redis command. Rate limiter example: `local current = redis.call('INCR', KEYS[1]); if current == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return current`. \
\
**Note:** Lua scripts block all of Redis while running, so scripts must be kept short; use `SCRIPT LOAD` to pre-load scripts and call them via EVALSHA for better performance.
