---
id: phan-biet-next-next-err-va-next-route-trong-express
position: backend
technology: middleware
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `next()`, `next(err)` và `next('route')` trong Express?

## Question (EN)
What is the difference between `next()`, `next(err)` and `next('route')` in Express?

## Đáp án chi tiết (VI)
Ba cách gọi `next` cho ba luồng khác nhau:\
\
- **`next()`** — chuyển sang middleware/handler kế tiếp trong stack, luồng bình thường.\
- **`next(err)`** — truyền bất kỳ giá trị nào khác chuỗi `'route'` sẽ **nhảy thẳng tới error-handling middleware** (loại 4 tham số), bỏ qua toàn bộ middleware thường còn lại.\
- **`next('route')`** — bỏ qua các handler **còn lại của chính route đó** và chuyển sang route tiếp theo khớp path. Chỉ có tác dụng trong `app.METHOD()` / `router.METHOD()`, không dùng với `app.use()`.\
\
```js\
app.get('/user/:id', (req, res, next) =\u003e {\
  if (req.params.id === '0') return next('route')  // skip to the next matching route\
  next()\
}, (req, res) =\u003e res.send('regular user'))\
\
app.get('/user/:id', (req, res) =\u003e res.send('special user'))\
```\
\
Lưu ý: `next()` sau khi đã gửi response sẽ dẫn tới lỗi `ERR_HTTP_HEADERS_SENT` nếu handler sau đó cũng ghi response.

## Detailed Answer (EN)
Three call forms, three flows:\
\
- **`next()`** — move to the next middleware/handler in the stack; the normal path.\
- **`next(err)`** — passing anything other than the string `'route'` **jumps straight to the error-handling middleware** (the 4-argument kind), skipping all remaining regular middleware.\
- **`next('route')`** — skip the **remaining handlers of that route** and continue to the next route matching the path. It only works inside `app.METHOD()` / `router.METHOD()`, not `app.use()`.\
\
```js\
app.get('/user/:id', (req, res, next) =\u003e {\
  if (req.params.id === '0') return next('route')  // skip to the next matching route\
  next()\
}, (req, res) =\u003e res.send('regular user'))\
\
app.get('/user/:id', (req, res) =\u003e res.send('special user'))\
```\
\
Note: calling `next()` after the response has been sent leads to `ERR_HTTP_HEADERS_SENT` if a later handler also writes to the response.
