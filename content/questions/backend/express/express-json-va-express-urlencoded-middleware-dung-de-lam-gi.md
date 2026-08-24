---
id: express-json-va-express-urlencoded-middleware-dung-de-lam-gi
position: backend
technology: express
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
express.json() và express.urlencoded() middleware dùng để làm gì?

## Question (EN)
What do express.json() and express.urlencoded() middleware do?

## Đáp án chi tiết (VI)
express.json() parse Content-Type application/json thành `req.body` object — built-in từ Express 4.16+, không cần `body-parser` riêng. express.urlencoded({ extended: true }) parse HTML form data (application/x-www-form-urlencoded); `extended: true` dùng `qs` library cho phép nested objects, `extended: false` dùng `querystring` chỉ flat. Size limit mặc định 100kb — thay đổi: `express.json({ limit: '10mb' })`. Security: large payloads gây DoS — luôn set limit hợp lý, không để mặc định cho upload endpoint. Custom content types: `express.json({ type: 'application/vnd.api+json' })`. Raw parser: `express.raw({ type: 'application/octet-stream' })` cho binary. Text parser: `express.text()` cho plain text webhooks. Lưu ý: `express.json()` không parse multipart/form-data (file upload) — cần `multer` riêng. Nếu `req.body` là undefined, kiểm tra middleware đã được đăng ký chưa và đúng thứ tự chưa.

## Detailed Answer (EN)
express.json() parses Content-Type application/json into a `req.body` object — built into Express 4.16+, no separate `body-parser` package needed. express.urlencoded({ extended: true }) parses HTML form data (application/x-www-form-urlencoded); `extended: true` uses the `qs` library allowing nested objects, `extended: false` uses `querystring` for flat data only. Default size limit is 100KB — change with: `express.json({ limit: '10mb' })`. Security: large payloads can cause DoS — always set a reasonable limit, especially on upload endpoints. Custom content types: `express.json({ type: 'application/vnd.api+json' })`. Raw parser: `express.raw({ type: 'application/octet-stream' })` for binary data. Text parser: `express.text()` for plain text webhooks. Pitfall: `express.json()` does NOT parse multipart/form-data (file uploads) — you need `multer` for that. If `req.body` is undefined, check that the middleware is registered and in the correct order.
