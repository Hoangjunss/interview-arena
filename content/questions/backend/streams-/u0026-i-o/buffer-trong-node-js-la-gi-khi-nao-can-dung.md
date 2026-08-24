---
id: buffer-trong-node-js-la-gi-khi-nao-can-dung
position: backend
technology: streams-\u0026-i-o
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Buffer trong Node.js là gì? Khi nào cần dùng?

## Question (EN)
What is a Buffer in Node.js? When do you need to use it?

## Đáp án chi tiết (VI)
Buffer là class built-in xử lý binary data — vùng nhớ raw bytes nằm ngoài V8 heap. JavaScript thuần không có kiểu dữ liệu binary, Buffer lấp đầy khoảng trống này cho Node.js. Cần dùng khi: đọc file binary (ảnh, PDF, executable), xử lý network packets TCP/UDP, mã hóa/giải mã base64 (`Buffer.from('hello').toString('base64')`), tính hash với `crypto.createHash`. Ví dụ thực tế: upload ảnh qua API, `req.body` là Buffer chứa raw bytes của file, cần convert hoặc pipe trực tiếp lên S3. Lưu ý: `Buffer.allocUnsafe(size)` nhanh hơn nhưng chứa dữ liệu cũ trong bộ nhớ — chỉ dùng khi sẽ ghi đè toàn bộ ngay sau đó, dùng `Buffer.alloc(size)` (zero-filled) cho trường hợp thông thường.

## Detailed Answer (EN)
Buffer is a built-in class for handling binary data — a region of raw bytes that lives outside the V8 heap. Plain JavaScript has no binary data type; Buffer fills that gap in Node.js. When you need it: reading binary files (images, PDFs, executables), processing TCP/UDP network packets, base64 encoding/decoding (`Buffer.from('hello').toString('base64')`), computing hashes with `crypto.createHash`. Practical example: uploading an image via API, `req.body` is a Buffer containing the raw bytes of the file — either convert it or pipe it directly to S3. Pitfall: `Buffer.allocUnsafe(size)` is faster but contains leftover memory data — only use it when you'll immediately overwrite the entire buffer; use `Buffer.alloc(size)` (zero-filled) in all other cases.
