---
id: browser-rendering-pipeline-critical-rendering-path
position: backend
technology: web-perf
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Browser rendering pipeline. Critical rendering path?

## Question (EN)
What is the browser rendering pipeline? What is the critical rendering path?

## Đáp án chi tiết (VI)
Browser rendering pipeline gồm các bước: (1) parse HTML thành DOM tree, (2) parse CSS thành CSSOM tree, (3) kết hợp DOM và CSSOM thành render tree, (4) tính toán layout (vị trí, kích thước), (5) paint (vẽ pixel), (6) composite (ghép các layer). Critical rendering path là chuỗi bước tối thiểu trình duyệt phải hoàn thành trước khi hiển thị trang — CSS và JavaScript mặc định sẽ block quá trình render. Tối ưu bằng cách: inline critical CSS, defer hoặc async cho JavaScript, giảm kích thước CSS/JS, và dùng DevTools Coverage để tìm code không sử dụng.

## Detailed Answer (EN)
The browser rendering pipeline: (1) Parse HTML into a DOM tree, (2) Parse CSS into a CSSOM tree, (3) Combine DOM + CSSOM into a render tree, (4) Calculate layout (position and size), (5) Paint (draw pixels), (6) Composite (layer compositing). The critical rendering path is the minimum sequence of steps the browser must complete before showing anything — CSS and JavaScript are render-blocking by default. Optimize by: inlining critical CSS, using `defer` or `async` on scripts, reducing CSS/JS size, and using DevTools Coverage to find unused code.
