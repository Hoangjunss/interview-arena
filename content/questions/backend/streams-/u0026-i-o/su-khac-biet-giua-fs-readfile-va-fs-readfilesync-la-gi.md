---
id: su-khac-biet-giua-fs-readfile-va-fs-readfilesync-la-gi
position: backend
technology: streams-\u0026-i-o
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa fs.readFile và fs.readFileSync là gì?

## Question (EN)
What is the difference between fs.readFile and fs.readFileSync?

## Đáp án chi tiết (VI)
readFileSync blocking — giữ event loop hoàn toàn cho đến khi OS trả data, không xử lý request nào khác trong thời gian đó. readFile non-blocking — gửi I/O request đến libuv thread pool, event loop tự do xử lý requests khác. Impact thực tế: readFileSync đọc file 50ms trên server 1000 req/s → mỗi request xếp hàng bị delay 50ms cộng dồn → latency spike hàng giây. Khi sync chấp nhận được: (1) module initialization trước `server.listen()` — `const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))` chạy một lần duy nhất lúc startup, không có traffic; (2) CLI tools; (3) build scripts. Quy tắc: bất kỳ code nào chạy SAU `server.listen()` trong request path — bắt buộc dùng async. Đo blocking: `node --prof app.js` → `node --prof-process isolate-*.log` → readFileSync trong hot path hiện rõ ràng với % CPU time.

## Detailed Answer (EN)
readFileSync blocks — it holds the event loop completely until the OS returns data; no other requests are processed during that time. readFile is non-blocking — it sends an I/O request to libuv's thread pool and the event loop is free to handle other requests. Real-world impact: readFileSync reading a file with 50ms latency on a server handling 1,000 req/s → every request in the queue is delayed by 50ms, compounding to seconds of cumulative latency. When sync is acceptable: (1) module initialization before `server.listen()` — `const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))` runs once at startup before any traffic; (2) CLI tools; (3) build scripts. Rule: any code running AFTER `server.listen()` in the request path — must use async. Measuring blocking: `node --prof app.js` → `node --prof-process isolate-*.log` → readFileSync in a hot path shows up clearly with % CPU time.
