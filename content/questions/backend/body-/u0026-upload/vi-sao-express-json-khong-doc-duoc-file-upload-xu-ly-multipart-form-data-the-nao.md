---
id: vi-sao-express-json-khong-doc-duoc-file-upload-xu-ly-multipart-form-data-the-nao
position: backend
technology: body-\u0026-upload
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `express.json()` không đọc được file upload? Xử lý `multipart/form-data` thế nào?

## Question (EN)
Why can't `express.json()` read a file upload? How do you handle `multipart/form-data`?

## Đáp án chi tiết (VI)
`express.json()` chỉ parse body có `Content-Type: application/json`; `express.urlencoded()` chỉ parse `application/x-www-form-urlencoded`. Form có file được browser gửi dưới dạng **`multipart/form-data`** — body bị chia thành nhiều phần ngăn bởi chuỗi **boundary**, mỗi phần có header riêng. Không parser nào trong hai cái trên hiểu định dạng đó, nên `req.body` rỗng và `req.file` không tồn tại.\
\
Dùng **multer** (middleware chính thức của Express):\
\
```js\
import multer from 'multer'\
\
const upload = multer({\
  storage: multer.diskStorage({ destination: '/tmp/uploads' }),\
  limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB\
})\
\
app.post('/avatar', upload.single('avatar'), (req, res) =\u003e {\
  res.json({ path: req.file.path, name: req.body.name })\
})\
```\
\
Multer điền `req.file` (hoặc `req.files`) và vẫn đặt các field text vào `req.body`. Luôn khai báo `limits.fileSize` và kiểm tra mimetype — thiếu giới hạn là một lối tấn công cạn tài nguyên.

## Detailed Answer (EN)
`express.json()` only parses bodies with `Content-Type: application/json`; `express.urlencoded()` only handles `application/x-www-form-urlencoded`. A form containing a file is sent as **`multipart/form-data`** — the body is split into parts separated by a **boundary** string, each part carrying its own headers. Neither parser understands that format, so `req.body` is empty and `req.file` does not exist.\
\
Use **multer**, the official Express middleware:\
\
```js\
import multer from 'multer'\
\
const upload = multer({\
  storage: multer.diskStorage({ destination: '/tmp/uploads' }),\
  limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB\
})\
\
app.post('/avatar', upload.single('avatar'), (req, res) =\u003e {\
  res.json({ path: req.file.path, name: req.body.name })\
})\
```\
\
Multer populates `req.file` (or `req.files`) and still puts text fields on `req.body`. Always set `limits.fileSize` and check the mimetype — an unbounded upload endpoint is a resource-exhaustion vector.
