---
id: streams-trong-node-js-la-gi-tai-sao-can-dung-streams-thay-vi-doc-toan-bo-file
position: backend
technology: node.js-deep
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Streams trong Node.js là gì? Tại sao cần dùng Streams thay vì đọc toàn bộ file?

## Question (EN)
What are Streams in Node.js? Why use Streams instead of reading the full file?

## Đáp án chi tiết (VI)
Streams xử lý data theo từng phần nhỏ (chunks) thay vì load toàn bộ vào memory — rất quan trọng khi xử lý file lớn (CSV hàng GB, video).\
\
Có 4 loại: Readable (đọc data, ví dụ fs.createReadStream), Writable (ghi data, ví dụ fs.createWriteStream), Duplex (vừa đọc vừa ghi, ví dụ TCP socket), Transform (biến đổi data trong quá trình truyền, ví dụ compression). Dùng `.pipe()` để nối streams: `fs.createReadStream('big.csv').pipe(transform).pipe(res)`.\
\
Nếu đọc file 2GB bằng `fs.readFile` sẽ cần 2GB RAM, nhưng Stream chỉ cần vài MB.

## Detailed Answer (EN)
Streams process data in small chunks rather than loading everything into memory — critical for large files (multi-GB CSVs, videos). There are 4 types: Readable (read data, e.g., fs.createReadStream), Writable (write data, e.g., fs.createWriteStream), Duplex (read and write, e.g., TCP socket), Transform (transform data in flight, e.g., compression). Use `.pipe()` to chain streams: `fs.createReadStream('big.csv').pipe(transform).pipe(res)`. Reading a 2GB file with `fs.readFile` requires 2GB of RAM; a Stream needs only a few MB.
