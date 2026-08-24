---
id: closure-la-gi-cho-vi-du-thuc-te
position: backend
technology: hoisting-\u0026-closure
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Closure là gì? Cho ví dụ thực tế.

## Question (EN)
What is a closure? Give a practical example.

## Đáp án chi tiết (VI)
Closure là hàm 'nhớ' được biến từ lexical scope bên ngoài, ngay cả sau khi hàm ngoài đã return.\
```javascript\
function makeCounter() {\
  let count = 0;\
  return () =\u003e ++count;\
}\
const c = makeCounter();\
c(); // 1\
c(); // 2\
```\
Hàm trả về vẫn truy cập `count`. \
\
**Ứng dụng thực tế:** private variables (encapsulation), factory functions, event handlers giữ state, debounce/throttle, React hooks (useState bên trong dùng closure).

## Detailed Answer (EN)
A closure is a function that 'remembers' variables from its outer lexical scope, even after the outer function has returned.\
```javascript\
function makeCounter() {\
  let count = 0;\
  return () =\u003e ++count;\
}\
const c = makeCounter();\
c(); // 1\
c(); // 2\
```\
The returned function still accesses `count`. \
\
**Practical uses:** private variables (encapsulation), factory functions, event handlers holding state, debounce/throttle, React hooks (useState internally uses closures).
