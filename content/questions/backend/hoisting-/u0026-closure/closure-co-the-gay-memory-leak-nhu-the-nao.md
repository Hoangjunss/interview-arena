---
id: closure-co-the-gay-memory-leak-nhu-the-nao
position: backend
technology: hoisting-\u0026-closure
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Closure có thể gây memory leak như thế nào?

## Question (EN)
How can closures cause memory leaks?

## Đáp án chi tiết (VI)
Closure giữ tham chiếu đến scope ngoài, ngăn garbage collector giải phóng bộ nhớ. Vấn đề xảy ra khi closure không cần thiết giữ tham chiếu đến đối tượng lớn hoặc DOM node đã bị xóa.\
\
Ví dụ điển hình: event listener không được xóa giữ reference đến component đã unmount:\
```javascript\
function setup() {\
  const largeData = new Array(1000000); // dữ liệu lớn\
  window.addEventListener(\\"resize\\

## Detailed Answer (EN)
Closures hold references to the outer scope, preventing garbage collection. Problems arise when unnecessary closures hold large objects or removed DOM nodes.\
\
Classic example: an event listener that is never removed keeps a component reference alive:\
```javascript\
function setup() {\
  const largeData = new Array(1000000);\
  window.addEventListener(\\"resize\\
