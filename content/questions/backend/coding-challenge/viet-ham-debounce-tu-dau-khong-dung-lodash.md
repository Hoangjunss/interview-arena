---
id: viet-ham-debounce-tu-dau-khong-dung-lodash
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết hàm debounce từ đầu (không dùng lodash)?

## Question (EN)
Implement a debounce function from scratch (without lodash).

## Đáp án chi tiết (VI)
Debounce trì hoãn execution cho đến khi input ngừng, tránh gọi API quá nhiều lần.\
\
```js\
function debounce(fn, delay) {\
  let timer;\
  return (...args) =\u003e {\
    clearTimeout(timer);\
    timer = setTimeout(() =\u003e fn(...args), delay);\
  };\
}\
```\
\
Ứng dụng: search input (gõ xong 300ms mới gọi API), resize handler, auto-save. Phỏng vấn thường hỏi viết tay để kiểm tra hiểu closure và timer.

## Detailed Answer (EN)
`function debounce(fn, delay) { let timer; return (...args) =\u003e { clearTimeout(timer); timer = setTimeout(() =\u003e fn(...args), delay); }; }` Applications: search input (wait 300ms after typing stops before calling the API), resize handler, auto-save. Interviewers ask this to verify understanding of closures and timers.
