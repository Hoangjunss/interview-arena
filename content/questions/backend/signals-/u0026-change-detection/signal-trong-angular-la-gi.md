---
id: signal-trong-angular-la-gi
position: backend
technology: signals-\u0026-change-detection
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Signal trong Angular là gì?

## Question (EN)
What is a signal in Angular?

## Đáp án chi tiết (VI)
Signal là reactive value được đọc bằng cách gọi function, ví dụ `count()`, và được cập nhật bằng `set()` hoặc `update()`.\
\
Khi signal được đọc trong template hoặc `computed`, Angular track dependency đó; khi value đổi, phần phụ thuộc được cập nhật. Signal giúp state local rõ ràng hơn và giảm nhu cầu dùng RxJS cho các state đồng bộ đơn giản.

## Detailed Answer (EN)
A signal is a reactive value read by calling a function, for example `count()`, and updated with `set()` or `update()`.\
\
When a signal is read in a template or `computed`, Angular tracks that dependency; when the value changes, dependent consumers update. Signals make local state clearer and reduce the need for RxJS for simple synchronous state.
