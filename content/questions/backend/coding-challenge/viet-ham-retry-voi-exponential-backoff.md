---
id: viet-ham-retry-voi-exponential-backoff
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết hàm retry với exponential backoff?

## Question (EN)
Write a retry function with exponential backoff.

## Đáp án chi tiết (VI)
Exponential backoff retry một async call failing với delay tăng dần (1s, 2s, 4s...).\
\
```js\
async function retry(fn, maxRetries = 3, delay = 1000) {\
  for (let i = 0; i \u003c maxRetries; i++) {\
    try { return await fn(); }\
    catch (err) {\
      if (i === maxRetries - 1) throw err;\
      await new Promise(r =\u003e setTimeout(r, delay * 2 ** i));\
    }\
  }\
}\
```\
\
Dùng cho API calls không ổn định. Delay tăng: 1s, 2s, 4s.

## Detailed Answer (EN)
`async function retry(fn, maxRetries = 3, delay = 1000) { for (let i = 0; i \u003c maxRetries; i++) { try { return await fn(); } catch (err) { if (i === maxRetries - 1) throw err; await new Promise(r =\u003e setTimeout(r, delay * 2 ** i)); } } }` Useful for unreliable API calls. Delay increases exponentially: 1s, 2s, 4s.
