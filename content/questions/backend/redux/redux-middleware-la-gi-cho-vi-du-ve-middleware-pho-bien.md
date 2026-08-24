---
id: redux-middleware-la-gi-cho-vi-du-ve-middleware-pho-bien
position: backend
technology: redux
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redux middleware là gì? Cho ví dụ về middleware phổ biến?

## Question (EN)
What is Redux middleware? Give examples of common middleware.

## Đáp án chi tiết (VI)
Middleware là function nằm giữa `dispatch(action)` và reducer, có thể inspect, modify, delay, hoặc cancel action trước khi đến reducer. Flow: `dispatch → middleware1 → middleware2 → reducer`. Middleware phổ biến: `redux-thunk` (cho phép dispatch function thay vì object, xử lý async — RTK include mặc định), `redux-saga` (dùng generator functions cho complex async flows như race conditions, cancellation, debounce), `redux-logger` (log action type, prev state, next state — hữu ích cho debug). Ví dụ custom middleware: `const logger = store =\u003e next =\u003e action =\u003e { console.log(action.type); return next(action) }`. Lưu ý: thứ tự middleware quan trọng — thunk phải ở đầu để dispatch(function) được xử lý trước khi đến middleware khác. Với RTK, `configureStore` tự setup thunk + serialization check + immutability check, chỉ cần thêm custom middleware qua `middleware` option nếu cần.

## Detailed Answer (EN)
Middleware is a function that sits between `dispatch(action)` and the reducer, able to inspect, modify, delay, or cancel an action before it reaches the reducer. Flow: `dispatch → middleware1 → middleware2 → reducer`. Common middleware: `redux-thunk` (allows dispatching functions instead of objects for async logic — included in RTK by default), `redux-saga` (uses generator functions for complex async flows like race conditions, cancellation, debounce), `redux-logger` (logs action type, prev state, next state — useful for debugging). Example custom middleware: `const logger = store =\u003e next =\u003e action =\u003e { console.log(action.type); return next(action) }`. Pitfall: middleware order matters — thunk must come first so dispatched functions are processed before other middleware. With RTK, `configureStore` automatically sets up thunk, serialization checks, and immutability checks; add custom middleware via the `middleware` option only when needed.
