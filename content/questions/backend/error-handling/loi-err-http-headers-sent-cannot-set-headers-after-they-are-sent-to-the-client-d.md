---
id: loi-err-http-headers-sent-cannot-set-headers-after-they-are-sent-to-the-client-d
position: backend
technology: error-handling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lỗi `ERR_HTTP_HEADERS_SENT` — \\"Cannot set headers after they are sent to the client\\" — do đâu và sửa thế nào?

## Question (EN)
What causes `ERR_HTTP_HEADERS_SENT` — \\"Cannot set headers after they are sent to the client\\" — and how do you fix it?

## Đáp án chi tiết (VI)
Khi headers đã được flush xuống client, Node cấm sửa header hoặc bắt đầu một response thứ hai trên cùng request. Bản chất lỗi luôn là **gửi response hai lần cho một request**.\
\
Ba mẫu code hay gây ra:\
\
```js\
// 1. missing return before res.json\
app.get('/user/:id', async (req, res) =\u003e {\
  const user = await findUser(req.params.id)\
  if (!user) res.status(404).json({ message: 'not found' })  // no return\
  res.json(user)                                              // runs anyway -\u003e throws\
})\
\
// 2. responding then calling next() -\u003e a later handler responds again\
// 3. an async callback replies after the sync path already replied\
```\
\
**Cách sửa:**\
- Luôn `return res.json(...)` ở mọi nhánh thoát sớm.\
- Không gọi `next()` sau khi đã gửi response.\
- Trong error middleware, kiểm tra `res.headersSent` trước khi ghi: nếu đã gửi thì `next(err)` để Node đóng kết nối.\
- Gom việc trả lời về một chỗ duy nhất mỗi handler thay vì rải `res.send` nhiều nhánh.

## Detailed Answer (EN)
Once headers are flushed to the client, Node forbids changing them or starting a second response on the same request. The root cause is always **responding twice to one request**.\
\
Three patterns that trigger it:\
\
```js\
// 1. missing return before res.json\
app.get('/user/:id', async (req, res) =\u003e {\
  const user = await findUser(req.params.id)\
  if (!user) res.status(404).json({ message: 'not found' })  // no return\
  res.json(user)                                              // runs anyway -\u003e throws\
})\
\
// 2. responding then calling next() -\u003e a later handler responds again\
// 3. an async callback replying after the sync path already replied\
```\
\
**Fixes:**\
- Always `return res.json(...)` on every early-exit branch.\
- Never call `next()` after sending a response.\
- In the error middleware check `res.headersSent` first: if the response started, delegate with `next(err)` so Node closes the connection.\
- Keep exactly one exit point per handler instead of scattering `res.send` across branches.
