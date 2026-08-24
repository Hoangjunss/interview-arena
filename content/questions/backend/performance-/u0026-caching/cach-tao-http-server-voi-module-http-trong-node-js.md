---
id: cach-tao-http-server-voi-module-http-trong-node-js
position: backend
technology: performance-\u0026-caching
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tạo HTTP server với module http trong Node.js?

## Question (EN)
How do you create an HTTP server using Node.js's http module?

## Đáp án chi tiết (VI)
Module `http` là built-in, không cần cài thêm: `const server = http.createServer((req, res) =\u003e { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: true })); }); server.listen(3000)`. `req` chứa method, url, headers và là Readable stream (đọc body qua `req.on('data', chunk =\u003e ...)`). `res` là Writable stream — phải gọi `res.end()` để kết thúc, không thì client treo mãi. Trong thực tế hiếm ai dùng `http` module trực tiếp vì rất verbose — Express, Fastify, Hono wrap lại với routing, middleware, body parsing tiện hơn nhiều. Tuy nhiên hiểu `http` module giúp debug networking issues và hiểu cách các framework hoạt động bên dưới.

## Detailed Answer (EN)
The `http` module is built-in — no installation needed: `const server = http.createServer((req, res) =\u003e { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: true })); }); server.listen(3000)`. `req` contains method, url, headers, and is a Readable stream (read the body via `req.on('data', chunk =\u003e ...)`). `res` is a Writable stream — you must call `res.end()` to close the connection; if you don't, the client hangs indefinitely. In practice, almost nobody uses the `http` module directly because it's very verbose — Express, Fastify, and Hono wrap it with routing, middleware, and body parsing. However, understanding the `http` module helps with debugging networking issues and understanding how frameworks work internally.
