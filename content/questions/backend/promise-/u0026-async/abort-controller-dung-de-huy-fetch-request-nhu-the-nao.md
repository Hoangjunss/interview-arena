---
id: abort-controller-dung-de-huy-fetch-request-nhu-the-nao
position: backend
technology: promise-\u0026-async
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abort controller dùng để hủy fetch request như thế nào?

## Question (EN)
How do you use AbortController to cancel a fetch request?

## Đáp án chi tiết (VI)
AbortController tạo controller và signal. Truyền signal vào fetch options, khi gọi controller.abort() request bị hủy với AbortError.\
\
```javascript\
const controller = new AbortController();\
const { signal } = controller;\
\
fetch('/api/data', { signal })\
  .then(r =\u003e r.json())\
  .catch(err =\u003e {\
    if (err.name === 'AbortError') return; // bỏ qua cancel\
    throw err;\
  });\
\
controller.abort(); // hủy request\
```\
\
Quan trọng khi component unmount (React useEffect cleanup), search với debounce, hay race conditions.

## Detailed Answer (EN)
AbortController creates a controller and a signal. Pass the signal in fetch options; when controller.abort() is called, the request is cancelled with an AbortError.\
\
```javascript\
const controller = new AbortController();\
const { signal } = controller;\
\
fetch('/api/data', { signal })\
  .then(r =\u003e r.json())\
  .catch(err =\u003e {\
    if (err.name === 'AbortError') return; // ignore cancel\
    throw err;\
  });\
\
controller.abort(); // cancel request\
```\
\
Important when a component unmounts (React useEffect cleanup), with debounced search, or race conditions.
