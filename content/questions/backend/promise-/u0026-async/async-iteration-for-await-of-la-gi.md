---
id: async-iteration-for-await-of-la-gi
position: backend
technology: promise-\u0026-async
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Async iteration (for await...of) là gì?

## Question (EN)
What is async iteration (for await...of)?

## Đáp án chi tiết (VI)
for await...of lặp qua async iterable — objects implement Symbol.asyncIterator trả về async iterator.\
\
Mỗi iteration await giá trị tiếp theo. Dùng với streams, pagination APIs, WebSocket messages. Async generators (async function*) tạo async iterables dễ dàng.\
\
```javascript\
async function* fetchPages(urls) {\
  for (const url of urls) {\
    const res = await fetch(url);\
    yield await res.json();\
  }\
}\
for await (const page of fetchPages(['url1', 'url2'])) {\
  console.log(page);\
}\
```

## Detailed Answer (EN)
for await...of iterates over async iterables — objects that implement Symbol.asyncIterator returning an async iterator.\
\
Each iteration awaits the next value. Used with streams, paginated APIs, and WebSocket messages. Async generators (async function*) easily create async iterables.\
\
```javascript\
async function* fetchPages(urls) {\
  for (const url of urls) {\
    const res = await fetch(url);\
    yield await res.json();\
  }\
}\
for await (const page of fetchPages(['url1', 'url2'])) {\
  console.log(page);\
}\
```
