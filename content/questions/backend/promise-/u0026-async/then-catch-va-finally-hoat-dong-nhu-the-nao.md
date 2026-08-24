---
id: then-catch-va-finally-hoat-dong-nhu-the-nao
position: backend
technology: promise-\u0026-async
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
.then(), .catch() và .finally() hoạt động như thế nào?

## Question (EN)
How do .then(), .catch(), and .finally() work?

## Đáp án chi tiết (VI)
- `.then(...)`: chạy khi Promise thành công.\
- `.catch(...)`: chạy khi có lỗi ở Promise trước đó.\
- `.finally(...)`: luôn chạy sau cùng (dù thành công hay lỗi).\
\
Ví dụ:\
```javascript\
fetch(url)\
  .then(r =\u003e r.json())\
  .then(data =\u003e console.log(data))\
  .catch(err =\u003e console.error(err))\
  .finally(() =\u003e setLoading(false))\
```\
\
Mẹo cho người mới: dùng `finally` để dọn trạng thái UI như `loading`.

## Detailed Answer (EN)
- `.then(...)`: runs when the Promise succeeds.\
- `.catch(...)`: runs when an error happens in the previous Promise chain.\
- `.finally(...)`: always runs at the end, success or error.\
\
Example:\
```javascript\
fetch(url)\
  .then(r =\u003e r.json())\
  .then(data =\u003e console.log(data))\
  .catch(err =\u003e console.error(err))\
  .finally(() =\u003e setLoading(false))\
```\
\
Beginner tip: use `finally` for UI cleanup, such as turning off loading state.
