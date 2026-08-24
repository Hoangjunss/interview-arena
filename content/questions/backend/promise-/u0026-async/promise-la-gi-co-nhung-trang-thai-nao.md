---
id: promise-la-gi-co-nhung-trang-thai-nao
position: backend
technology: promise-\u0026-async
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Promise là gì? Có những trạng thái nào?

## Question (EN)
What is a Promise? What states does it have?

## Đáp án chi tiết (VI)
Promise là \\"lời hứa\\" cho kết quả của tác vụ async (ví dụ gọi API). Nó có 3 trạng thái:\
- `pending`: đang chờ\
- `fulfilled`: thành công (`resolve`)\
- `rejected`: thất bại (`reject`)\
\
Một khi đã `fulfilled` hoặc `rejected` thì không quay lại `pending`.\
\
```javascript\
const p = new Promise((resolve, reject) =\u003e {\
  setTimeout(() =\u003e resolve('done'), 1000);\
  // hoặc reject(new Error('failed')) nếu có lỗi\
});\
p.then(val =\u003e console.log(val)).catch(err =\u003e console.error(err));\
```\
\
Promise giúp tránh callback hell và làm luồng async dễ đọc hơn.

## Detailed Answer (EN)
A Promise represents the future result of an async task, such as an API call. It has 3 states:\
- `pending`: waiting\
- `fulfilled`: success (`resolve`)\
- `rejected`: failure (`reject`)\
\
Once fulfilled or rejected, it never returns to pending.\
\
```javascript\
const p = new Promise((resolve, reject) =\u003e {\
  setTimeout(() =\u003e resolve('done'), 1000);\
  // or reject(new Error('failed')) on error\
});\
p.then(val =\u003e console.log(val)).catch(err =\u003e console.error(err));\
```\
\
Promises reduce callback hell and make async flows easier to read.
