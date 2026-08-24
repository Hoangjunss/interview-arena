---
id: async-await-voi-parallel-execution-nhu-the-nao
position: backend
technology: promise-\u0026-async
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
async/await với parallel execution như thế nào?

## Question (EN)
How do you use async/await with parallel execution?

## Đáp án chi tiết (VI)
await tuần tự từng operation sẽ chậm hơn. Chạy song song bằng cách tạo tất cả Promises trước rồi mới await.\
```javascript\
// Sequential — chậm (mỗi request phải chờ cái trước)\
const user = await fetchUser(id);\
const posts = await fetchPosts(id); // chờ user xong mới gọi\
\
// Parallel — nhanh hơn\
const [user, posts] = await Promise.all([\
  fetchUser(id),\
  fetchPosts(id),\
]);\
\
// Tránh await trong loop (serial)\
for (const id of ids) {\
  await fetchItem(id); // BAD: 1 by 1\
}\
\
// Dùng Promise.all cho parallel\
const items = await Promise.all(ids.map(id =\u003e fetchItem(id)));\
```

## Detailed Answer (EN)
Sequentially awaiting each operation is slower. Run in parallel by creating all Promises first, then awaiting them.\
```javascript\
// Sequential — slow (each request waits for the previous)\
const user = await fetchUser(id);\
const posts = await fetchPosts(id); // waits for user first\
\
// Parallel — much faster\
const [user, posts] = await Promise.all([\
  fetchUser(id),\
  fetchPosts(id),\
]);\
\
// Avoid await inside loops (serial)\
for (const id of ids) {\
  await fetchItem(id); // BAD: 1 by 1\
}\
\
// Use Promise.all for parallel\
const items = await Promise.all(ids.map(id =\u003e fetchItem(id)));\
```
