---
id: viet-middleware-pipeline-pattern-giong-express
position: backend
technology: coding-challenge
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết middleware pipeline pattern (giống Express)?

## Question (EN)
Write a middleware pipeline pattern (like Express).

## Đáp án chi tiết (VI)
Middleware pipeline là pattern cho phép xâu chuỗi nhiều hàm xử lý tuần tự, mỗi hàm nhận context và hàm next() để chuyển sang middleware tiếp theo — giống cách Express và Koa xử lý HTTP requests.\
\
```js\
function compose(...fns) {\
  return (ctx, next) =\u003e {\
    let i = -1;\
    function dispatch(n) {\
      if (n \u003c= i) return Promise.reject('next() called multiple times');\
      i = n;\
      const fn = fns[n] || next;\
      if (!fn) return Promise.resolve();\
      return Promise.resolve(fn(ctx, () =\u003e dispatch(n + 1)));\
    }\
    return dispatch(0);\
  };\
}\
```\
\
Hàm compose nhận danh sách middlewares và trả về một hàm duy nhất gọi lần lượt từng middleware. Biến `i` dùng để detect nếu next() bị gọi nhiều lần trong cùng một middleware, tránh loop vô hạn. Câu hỏi nâng cao test hiểu biết về async composition, recursion, và Promise chaining.

## Detailed Answer (EN)
A middleware pipeline chains multiple processing functions sequentially, each receiving a context and a next() function to pass control forward — just like Express and Koa handle HTTP requests.\
\
```js\
function compose(...fns) {\
  return (ctx, next) =\u003e {\
    let i = -1;\
    function dispatch(n) {\
      if (n \u003c= i) return Promise.reject('next() called multiple times');\
      i = n;\
      const fn = fns[n] || next;\
      if (!fn) return Promise.resolve();\
      return Promise.resolve(fn(ctx, () =\u003e dispatch(n + 1)));\
    }\
    return dispatch(0);\
  };\
}\
```\
\
The compose function takes a list of middlewares and returns a single function that calls each middleware in sequence. The variable `i` detects if next() is called multiple times within the same middleware, preventing infinite loops. An advanced question testing async composition, recursion, and Promise chaining.
