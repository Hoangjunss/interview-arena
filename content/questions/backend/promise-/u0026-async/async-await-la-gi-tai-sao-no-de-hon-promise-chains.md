---
id: async-await-la-gi-tai-sao-no-de-hon-promise-chains
position: backend
technology: promise-\u0026-async
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
async/await là gì? Tại sao nó dễ hơn Promise chains?

## Question (EN)
What is async/await? Why is it easier than Promise chains?

## Đáp án chi tiết (VI)
`async/await` là cú pháp viết Promise theo kiểu gần giống code đồng bộ, nên dễ đọc hơn chain `.then()`.\
\
Ví dụ:\
```javascript\
async function loadUser() {\
  try {\
    const res = await fetch(\\"/api/user\\")\
    const data = await res.json()\
    return data\
  } catch (err) {\
    console.error(err)\
  }\
}\
```\
\
Điểm cần nhớ:\
- `await` chỉ dùng trong hàm `async`\
- lỗi nên bắt bằng `try/catch`\
- bản chất bên dưới vẫn là Promise.

## Detailed Answer (EN)
`async/await` is Promise syntax that reads more like synchronous code, so it is easier to follow than long `.then()` chains.\
\
Example:\
```javascript\
async function loadUser() {\
  try {\
    const res = await fetch(\\"/api/user\\")\
    const data = await res.json()\
    return data\
  } catch (err) {\
    console.error(err)\
  }\
}\
```\
\
Key points:\
- `await` only works inside `async` functions\
- handle errors with `try/catch`\
- under the hood, it is still Promise-based.
