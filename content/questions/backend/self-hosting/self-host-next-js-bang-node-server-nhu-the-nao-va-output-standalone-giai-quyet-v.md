---
id: self-host-next-js-bang-node-server-nhu-the-nao-va-output-standalone-giai-quyet-v
position: backend
technology: self-hosting
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Self-host Next.js bằng Node server như thế nào, và `output: 'standalone'` giải quyết vấn đề gì khi đóng gói deploy?

## Question (EN)
How do you self-host Next.js with a Node server, and what problem does `output: 'standalone'` solve when packaging a deployment?

## Đáp án chi tiết (VI)
Cách mặc định: `next build` rồi `next start` chạy một Node server phục vụ cả static assets lẫn SSR/Route Handlers. Bạn đặt nó sau reverse proxy (Nginx) và cần cả thư mục `.next` lẫn toàn bộ `node_modules`.\
\
**Vấn đề:** copy nguyên `node_modules` (hàng trăm MB) vào image thì nặng và chậm.\
\
**`output: 'standalone'`** giải quyết: Next.js trace đồ thị dependency và **chỉ đóng gói những file thực sự được dùng** vào `.next/standalone/` kèm một `server.js` chạy độc lập.\
\
```js\
// next.config.js\
module.exports = { output: 'standalone' }\
```\
\
Lúc deploy chỉ cần `.next/standalone`, `.next/static` và `public`, rồi `node server.js` — không cần `npm install` ở runtime.\
\
**Lưu ý:** standalone **không** tự copy `public/` và `.next/static` — phải copy thủ công (Docker thường thêm 2 thư mục này). Image optimization cần cài `sharp`.

## Detailed Answer (EN)
Default approach: `next build` then `next start` runs a Node server serving both static assets and SSR/Route Handlers. You put it behind a reverse proxy (Nginx) and need the `.next` folder plus all of `node_modules`.\
\
**Problem:** copying the entire `node_modules` (hundreds of MB) into an image is heavy and slow.\
\
**`output: 'standalone'`** fixes this: Next.js traces the dependency graph and **bundles only the files actually used** into `.next/standalone/` with a self-contained `server.js`.\
\
```js\
// next.config.js\
module.exports = { output: 'standalone' }\
```\
\
Then deploy only needs `.next/standalone`, `.next/static`, and `public`, then `node server.js` — no `npm install` at runtime.\
\
**Note:** standalone doesn't copy `public/` and `.next/static` for you — copy them manually (Docker usually adds these two). Image optimization needs `sharp` installed.
