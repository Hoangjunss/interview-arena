---
id: mutationobserver-la-gi
position: backend
technology: dom-\u0026-apis
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MutationObserver là gì?

## Question (EN)
What is MutationObserver?

## Đáp án chi tiết (VI)
MutationObserver theo dõi thay đổi trên DOM tree (attribute changes, child additions/removals, text changes). Asynchronous, callbacks chạy như microtask.\
\
```javascript\
const observer = new MutationObserver(mutations =\u003e {\
  mutations.forEach(m =\u003e console.log(m.type, m.target));\
});\
observer.observe(document.body, { childList: true, subtree: true });\
// observer.disconnect() để dừng\
```\
\
Hữu ích khi làm việc với third-party code thay đổi DOM, implement undo/redo, hay real-time updates. ResizeObserver theo dõi thay đổi kích thước element.

## Detailed Answer (EN)
MutationObserver watches for changes to the DOM tree (attribute changes, child additions/removals, text changes). Asynchronous, with callbacks running as microtasks.\
\
```javascript\
const observer = new MutationObserver(mutations =\u003e {\
  mutations.forEach(m =\u003e console.log(m.type, m.target));\
});\
observer.observe(document.body, { childList: true, subtree: true });\
// observer.disconnect() to stop\
```\
\
Useful when working with third-party code that changes the DOM, implementing undo/redo, or real-time updates. ResizeObserver watches for element size changes.
