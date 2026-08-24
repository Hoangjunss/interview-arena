---
id: vi-sao-error-handling-middleware-trong-express-bat-buoc-phai-khai-bao-du-4-tham
position: backend
technology: error-handling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao error-handling middleware trong Express bắt buộc phải khai báo đủ 4 tham số?

## Question (EN)
Why must an Express error-handling middleware declare all four parameters?

## Đáp án chi tiết (VI)
Express nhận diện error handler **hoàn toàn dựa vào số tham số của hàm** (`fn.length === 4`). Nếu bạn viết `(err, req, res)` — bỏ `next` — Express coi đó là middleware thường với `err` được hiểu là `req`, và lỗi sẽ rơi xuống default error handler thay vì hàm của bạn.\
\
```js\
// wrong: only 3 params -\u003e treated as a normal middleware\
app.use((err, req, res) =\u003e res.status(500).json({ message: err.message }))\
\
// đúng: 4 params, even if next is unused\
app.use((err, req, res, next) =\u003e {\
  if (res.headersSent) return next(err)\
  res.status(err.status ?? 500).json({ message: err.message })\
})\
```\
\
Hai điểm hay bị hỏi thêm:\
- Error middleware phải đặt **sau tất cả** `app.use()` và route, nếu không lỗi từ route sẽ không đi qua nó.\
- Nếu response đã bắt đầu gửi (`res.headersSent === true`) thì phải `next(err)` để default handler đóng kết nối, không được ghi thêm.\
\
Không cần đặt tên tham số là `next` — chỉ số lượng tham số mới quan trọng.

## Detailed Answer (EN)
Express identifies an error handler **purely by the function's arity** (`fn.length === 4`). If you write `(err, req, res)` and drop `next`, Express treats it as a regular middleware where `err` is bound to `req`, and errors fall through to the default handler instead of yours.\
\
```js\
// wrong: only 3 params -\u003e treated as a normal middleware\
app.use((err, req, res) =\u003e res.status(500).json({ message: err.message }))\
\
// correct: 4 params, even if next is unused\
app.use((err, req, res, next) =\u003e {\
  if (res.headersSent) return next(err)\
  res.status(err.status ?? 500).json({ message: err.message })\
})\
```\
\
Two common follow-ups:\
- The error middleware must sit **after all** `app.use()` calls and routes, otherwise route errors never reach it.\
- If the response already started (`res.headersSent === true`), delegate with `next(err)` so the default handler closes the connection; do not write again.\
\
The parameter does not have to be named `next` — only the count matters.
