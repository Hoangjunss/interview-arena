---
id: scope-chain-trong-javascript-hoat-dong-nhu-the-nao
position: backend
technology: hoisting-\u0026-closure
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Scope chain trong JavaScript hoạt động như thế nào?

## Question (EN)
How does the scope chain work in JavaScript?

## Đáp án chi tiết (VI)
Scope chain là cơ chế JavaScript tìm kiếm biến từ scope hiện tại ra ngoài đến global scope. Khi không tìm thấy biến trong scope hiện tại, JS tìm trong scope cha, rồi tiếp tục lên cho đến global. Nếu không tìm thấy ở global, ném ReferenceError.\
\
```javascript\
const x = \\"global\\";\
function outer() {\
  const x = \\"outer\\";\
  function inner() {\
    // không có x ở đây → tìm cha (outer) → tìm thấy \\"outer\\"\
    console.log(x); // \\"outer\\"\
  }\
  inner();\
}\
```\
\
Scope chain được tạo khi hàm được định nghĩa (lexical scope), không phải khi gọi.

## Detailed Answer (EN)
The scope chain is JavaScript's mechanism for looking up variables from the current scope outward to the global scope. When a variable is not found in the current scope, JS looks in the parent scope, continuing upward to global. If not found at global, a ReferenceError is thrown.\
\
```javascript\
const x = \\"global\\";\
function outer() {\
  const x = \\"outer\\";\
  function inner() {\
    // no x here → search parent (outer) → found \\"outer\\"\
    console.log(x); // \\"outer\\"\
  }\
  inner();\
}\
```\
\
The scope chain is created when a function is defined (lexical scope), not when it is called.
