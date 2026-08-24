---
id: custom-events-trong-javascript-la-gi
position: backend
technology: dom-\u0026-apis
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom events trong JavaScript là gì?

## Question (EN)
What are custom events in JavaScript?

## Đáp án chi tiết (VI)
CustomEvent cho phép tạo events tùy chỉnh với data đính kèm. Dispatch với `element.dispatchEvent(event)`.\
\
```javascript\
// Tạo và dispatch\
const event = new CustomEvent('userLoggedIn', {\
  detail: { userId: 42 },\
  bubbles: true,\
});\
document.dispatchEvent(event);\
\
// Lắng nghe\
document.addEventListener('userLoggedIn', e =\u003e {\
  console.log(e.detail.userId); // 42\
});\
```\
\
Bubbles và cancelable tùy chỉnh được. Dùng cho component communication không dùng framework, pub/sub pattern trong vanilla JS.

## Detailed Answer (EN)
CustomEvent lets you create custom events with attached data. Dispatch with `element.dispatchEvent(event)`.\
\
```javascript\
// Create and dispatch\
const event = new CustomEvent('userLoggedIn', {\
  detail: { userId: 42 },\
  bubbles: true,\
});\
document.dispatchEvent(event);\
\
// Listen\
document.addEventListener('userLoggedIn', e =\u003e {\
  console.log(e.detail.userId); // 42\
});\
```\
\
Bubbling and cancelable behavior are configurable. Used for component communication without a framework, and for pub/sub patterns in vanilla JS.
