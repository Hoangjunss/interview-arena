---
id: viet-ham-throttle-tu-dau
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết hàm throttle từ đầu?

## Question (EN)
Implement a throttle function from scratch.

## Đáp án chi tiết (VI)
Throttle giới hạn call rate xuống tối đa một lần mỗi interval — gọi ngay lần đầu rồi chặn.\
\
```js\
function throttle(fn, limit) {\
  let inThrottle;\
  return (...args) =\u003e {\
    if (!inThrottle) {\
      fn(...args);\
      inThrottle = true;\
      setTimeout(() =\u003e inThrottle = false, limit);\
    }\
  };\
}\
```\
\
Khác debounce: throttle gọi ngay lần đầu rồi chặn, debounce đợi hết delay mới gọi. Dùng cho scroll, mousemove.

## Detailed Answer (EN)
`function throttle(fn, limit) { let inThrottle; return (...args) =\u003e { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() =\u003e inThrottle = false, limit); } }; }` Difference from debounce: throttle fires immediately then blocks, debounce waits for the delay to finish before firing. Use for scroll, mousemove events.
