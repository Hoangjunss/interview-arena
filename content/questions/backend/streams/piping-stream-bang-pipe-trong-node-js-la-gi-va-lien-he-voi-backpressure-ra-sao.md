---
id: piping-stream-bang-pipe-trong-node-js-la-gi-va-lien-he-voi-backpressure-ra-sao
position: backend
technology: streams
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Piping stream bằng `.pipe()` trong Node.js là gì và liên hệ với backpressure ra sao?

## Question (EN)
What is stream piping with `.pipe()` in Node.js, and how does it relate to backpressure?

## Đáp án chi tiết (VI)
`readable.pipe(writable)` nối một **Readable** vào một **Writable**, tự động chuyển dữ liệu từ nguồn sang đích theo từng chunk và tự gọi `end()` khi hết.\
\
Giá trị lớn nhất là nó **quản lý backpressure** giúp bạn. **Backpressure** xảy ra khi bên đọc sản xuất nhanh hơn bên ghi tiêu thụ:\
\
- Khi buffer nội bộ của writable đầy, `write()` trả về `false`.\
- `pipe` bắt tín hiệu đó và **pause** readable, ngừng bơm thêm.\
- Khi writable xả xong (event `drain`), `pipe` **resume** readable.\
\
Nhờ vòng pause/resume này, xử lý file/HTTP lớn không nuốt hết RAM (không nạp cả file vào bộ nhớ). Nếu tự `read` rồi `write` mà bỏ qua giá trị trả về của `write`, dữ liệu dồn trong buffer và bộ nhớ phình. Bản hiện đại nên dùng **`stream.pipeline()`** thay `.pipe()`: cùng cơ chế backpressure nhưng xử lý lỗi và dọn dẹp resource tốt hơn.

## Detailed Answer (EN)
`readable.pipe(writable)` connects a **Readable** to a **Writable**, automatically moving data chunk by chunk from source to destination and calling `end()` when done.\
\
Its biggest value is that it **manages backpressure** for you. **Backpressure** arises when the reader produces faster than the writer consumes:\
\
- When the writable's internal buffer is full, `write()` returns `false`.\
- `pipe` catches that and **pauses** the readable, stopping the flow.\
- When the writable drains (the `drain` event), `pipe` **resumes** the readable.\
\
Thanks to this pause/resume loop, processing large files/HTTP doesn't swallow all your RAM (no loading the whole file into memory). If you hand-roll `read` then `write` and ignore `write`'s return value, data piles up in the buffer and memory balloons. Modern code should prefer **`stream.pipeline()`** over `.pipe()`: same backpressure handling, but better error propagation and resource cleanup.
