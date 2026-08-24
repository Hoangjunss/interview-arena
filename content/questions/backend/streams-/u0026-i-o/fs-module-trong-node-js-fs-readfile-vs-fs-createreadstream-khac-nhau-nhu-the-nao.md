---
id: fs-module-trong-node-js-fs-readfile-vs-fs-createreadstream-khac-nhau-nhu-the-nao
position: backend
technology: streams-\u0026-i-o
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
fs module trong Node.js: fs.readFile vs fs.createReadStream khác nhau như thế nào?

## Question (EN)
fs module in Node.js: how do fs.readFile and fs.createReadStream differ?

## Đáp án chi tiết (VI)
fs.readFile() load toàn bộ file vào RAM trước khi callback — file 100MB chiếm ít nhất 100MB heap; 100 concurrent requests = 10GB RAM, dễ OOM crash. fs.createReadStream() đọc theo chunks (default highWaterMark 64KB) — file 100MB chỉ dùng ~64KB RAM bất kể bao nhiêu requests đồng thời. Serve file thực tế: `fs.createReadStream(filePath).pipe(res)` stream thẳng đến TCP buffer không qua RAM. pipeline() API (Node 10+) tốt hơn pipe(): `await pipeline(fs.createReadStream(path), res)` — tự cleanup khi error, tránh memory leak khi client disconnect. Backpressure tự động: pipe/pipeline dừng đọc file khi client chậm, tiếp tục khi TCP buffer drain. Khi nào dùng readFile: config files \u003c 1MB đọc lúc startup, JSON parse một lần. Khi nào dùng createReadStream: file download, log streaming, CSV export, bất kỳ file \u003e vài MB.

## Detailed Answer (EN)
fs.readFile() loads the entire file into RAM before calling the callback — a 100MB file occupies at least 100MB of heap; 100 concurrent requests = 10GB RAM, easy to cause an OOM crash. fs.createReadStream() reads in chunks (default highWaterMark 64KB) — a 100MB file only uses ~64KB of RAM regardless of how many concurrent requests are active. Serving files in practice: `fs.createReadStream(filePath).pipe(res)` streams directly to the TCP buffer without touching RAM. pipeline() API (Node 10+) is better than pipe(): `await pipeline(fs.createReadStream(path), res)` — auto-cleanup when an error occurs, prevents memory leaks when the client disconnects. Automatic backpressure: pipe/pipeline stops reading the file when the client is slow, resumes when the TCP buffer drains. When to use readFile: config files \u003c1MB read at startup, one-time JSON parsing. When to use createReadStream: file downloads, log streaming, CSV exports, any file larger than a few MB.
