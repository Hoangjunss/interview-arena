---
id: router-long-nhau-trong-express-vi-sao-router-con-doc-req-params-userid-ra-undefi
position: backend
technology: routing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Router lồng nhau trong Express: vì sao router con đọc `req.params.userId` ra `undefined`? Sửa thế nào?

## Question (EN)
With nested Express routers, why is `req.params.userId` undefined in the child router, and how do you fix it?

## Đáp án chi tiết (VI)
Mặc định mỗi `express.Router()` có **không gian `req.params` riêng**, chỉ chứa param khai báo trong chính router đó. Param của router cha (`:userId`) không được truyền xuống, nên router con đọc ra `undefined`.\
\
```js\
const app = express()\
const posts = express.Router()\
\
posts.get('/', (req, res) =\u003e {\
  res.json({ userId: req.params.userId })  // undefined\
})\
\
app.use('/users/:userId/posts', posts)\
```\
\
**Sửa:** bật `mergeParams` khi tạo router con:\
\
```js\
const posts = express.Router({ mergeParams: true })\
```\
\
Khi bật, `req.params` của router con được **gộp** với param của router cha. Nếu trùng tên, **giá trị của router con thắng** — đây là bẫy thật khi cả hai cấp cùng dùng `:id`; đặt tên khác nhau (`:userId` / `:postId`) để tránh.\
\
Cùng nhóm với option này còn `caseSensitive` và `strict` — cả ba đều là option của `express.Router([options])` và chỉ áp dụng cho router được tạo ra, không kế thừa từ app.

## Detailed Answer (EN)
By default each `express.Router()` has its **own `req.params` namespace**, holding only the params declared on that router. The parent's `:userId` is not passed down, so the child reads `undefined`.\
\
```js\
const app = express()\
const posts = express.Router()\
\
posts.get('/', (req, res) =\u003e {\
  res.json({ userId: req.params.userId })  // undefined\
})\
\
app.use('/users/:userId/posts', posts)\
```\
\
**Fix:** enable `mergeParams` when creating the child router:\
\
```js\
const posts = express.Router({ mergeParams: true })\
```\
\
With it on, the child's `req.params` is **merged** with the parent's. On a name clash the **child's value wins** — a real trap when both levels use `:id`; name them distinctly (`:userId` / `:postId`) instead.\
\
The same option bag carries `caseSensitive` and `strict`. All three belong to `express.Router([options])` and apply only to the router being created — they are not inherited from the app.
