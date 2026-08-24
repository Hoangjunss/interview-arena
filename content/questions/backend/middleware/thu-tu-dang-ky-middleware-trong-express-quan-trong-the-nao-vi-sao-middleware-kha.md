---
id: thu-tu-dang-ky-middleware-trong-express-quan-trong-the-nao-vi-sao-middleware-kha
position: backend
technology: middleware
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thứ tự đăng ký middleware trong Express quan trọng thế nào? Vì sao middleware khai báo sau route lại không chạy?

## Question (EN)
Why does middleware order matter in Express, and why does middleware declared after a route never run?

## Đáp án chi tiết (VI)
Express xếp mọi `app.use()` và route handler vào **một stack theo đúng thứ tự khai báo**, rồi duyệt từ trên xuống cho mỗi request. Một middleware chỉ chạy nếu request đi tới được vị trí của nó.\
\
Hai điều kiện làm dòng chảy dừng lại:\
- Handler phía trên **kết thúc response** (`res.send`, `res.json`) và không gọi `next()`.\
- Handler phía trên **quên gọi `next()`** — request treo đến khi timeout.\
\
```js\
app.get('/users', (req, res) =\u003e res.json([]))  // response ends here\
app.use(logger)                                // never reached for GET /users\
\
// đúng order\
app.use(logger)\
app.get('/users', (req, res) =\u003e res.json([]))\
```\
\
Trật tự chuẩn của một app: middleware hạ tầng (helmet, cors, body parser, logger) → routes → handler 404 → **error-handling middleware đặt cuối cùng**. Đặt sai chỗ là nguyên nhân phổ biến của \\"CORS không có tác dụng\\" hoặc \\"req.body undefined\\".

## Detailed Answer (EN)
Express puts every `app.use()` and route handler into **one stack in declaration order** and walks it top-down per request. A middleware runs only if the request actually reaches its position.\
\
Two things stop the flow:\
- An earlier handler **ends the response** (`res.send`, `res.json`) without calling `next()`.\
- An earlier handler **forgets to call `next()`** — the request hangs until timeout.\
\
```js\
app.get('/users', (req, res) =\u003e res.json([]))  // response ends here\
app.use(logger)                                // never reached for GET /users\
\
// correct order\
app.use(logger)\
app.get('/users', (req, res) =\u003e res.json([]))\
```\
\
The standard layout: infrastructure middleware (helmet, cors, body parser, logger) → routes → 404 handler → **error-handling middleware last**. Wrong placement is the usual cause of \\"CORS has no effect\\" or \\"req.body is undefined\\".
