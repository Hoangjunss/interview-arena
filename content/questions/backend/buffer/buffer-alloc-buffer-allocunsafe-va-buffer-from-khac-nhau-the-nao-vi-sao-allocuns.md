---
id: buffer-alloc-buffer-allocunsafe-va-buffer-from-khac-nhau-the-nao-vi-sao-allocuns
position: backend
technology: buffer
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Buffer.alloc`, `Buffer.allocUnsafe` và `Buffer.from` khác nhau thế nào? Vì sao `allocUnsafe` bị coi là rủi ro?

## Question (EN)
How do `Buffer.alloc`, `Buffer.allocUnsafe`, and `Buffer.from` differ? Why is `allocUnsafe` considered risky?

## Đáp án chi tiết (VI)
- `Buffer.alloc(n)` cấp phát n byte và **ghi 0 toàn bộ** vùng nhớ.\
- `Buffer.allocUnsafe(n)` cấp phát n byte nhưng **không khởi tạo** — nội dung là phần bộ nhớ vừa được giải phóng trước đó, có thể còn dữ liệu cũ của tiến trình.\
- `Buffer.from(...)` tạo buffer **từ dữ liệu có sẵn**: chuỗi, mảng byte, hoặc `ArrayBuffer`.\
\
```js\
const safe = Buffer.alloc(8)          // \u003cBuffer 00 00 00 00 00 00 00 00\u003e\
const fast = Buffer.allocUnsafe(8)    // contents are unknown, may be leftover data\
const data = Buffer.from('hi', 'utf8')\
```\
\
**Rủi ro:** nếu bạn `allocUnsafe` rồi chỉ ghi đè một phần và gửi cả buffer ra ngoài (response HTTP, ghi file), phần chưa ghi có thể mang dữ liệu của request khác — đây là kiểu lộ dữ liệu đã từng xảy ra trong thực tế.\
\
**Quy tắc dùng:** mặc định dùng `Buffer.alloc`. Chỉ dùng `allocUnsafe` khi bạn **ghi đè toàn bộ buffer ngay lập tức** (vd đọc đúng n byte từ socket vào rồi mới dùng) và đã đo được rằng việc zero-fill là điểm nghẽn.

## Detailed Answer (EN)
- `Buffer.alloc(n)` allocates n bytes and **zero-fills** the whole region.\
- `Buffer.allocUnsafe(n)` allocates n bytes but leaves them **uninitialized** — the contents are recycled memory and may still hold old process data.\
- `Buffer.from(...)` builds a buffer **from existing data**: a string, a byte array, or an `ArrayBuffer`.\
\
```js\
const safe = Buffer.alloc(8)          // \u003cBuffer 00 00 00 00 00 00 00 00\u003e\
const fast = Buffer.allocUnsafe(8)    // contents are unknown, may be leftover data\
const data = Buffer.from('hi', 'utf8')\
```\
\
**The risk:** if you `allocUnsafe`, overwrite only part of it, and then send the whole buffer out (HTTP response, file write), the untouched bytes can carry data from another request — a real-world disclosure pattern.\
\
**Rule of thumb:** default to `Buffer.alloc`. Reach for `allocUnsafe` only when you **overwrite the entire buffer immediately** (e.g. reading exactly n bytes off a socket before use) and you have measured zero-filling as a bottleneck.
