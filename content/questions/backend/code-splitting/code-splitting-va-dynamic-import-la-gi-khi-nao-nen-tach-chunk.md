---
id: code-splitting-va-dynamic-import-la-gi-khi-nao-nen-tach-chunk
position: backend
technology: code-splitting
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Code splitting và dynamic `import()` là gì? Khi nào nên tách chunk?

## Question (EN)
What are code splitting and dynamic `import()`? When should you split chunks?

## Đáp án chi tiết (VI)
Thay vì gửi **một bundle to** cho toàn app, **code splitting** chia thành nhiều **chunk tải theo nhu cầu** → giảm JS phải parse/execute ban đầu, cải thiện thời gian tương tác (TTI).\
\
- **`import('./mod')`** động trả về **Promise**; bundler (webpack/Vite) tự tách một chunk riêng ngay tại điểm gọi.\
- Điểm split phổ biến: **theo route**, component nặng (chart, editor, map), tính năng chỉ dùng sau khi người dùng tương tác.\
- React: `React.lazy` + `\u003cSuspense\u003e`. Next.js: `next/dynamic`.\
\
Đánh đổi: chia **quá nhỏ** thành nhiều chunk → nhiều request và overhead; cân bằng bằng **prefetch** các chunk sắp cần.

## Detailed Answer (EN)
Instead of shipping **one big bundle** for the whole app, **code splitting** breaks it into **on-demand chunks** → less JS to parse/execute up front, improving time-to-interactive (TTI).\
\
- Dynamic **`import('./mod')`** returns a **Promise**; the bundler (webpack/Vite) splits a separate chunk right at that call site.\
- Common split points: **by route**, heavy components (chart, editor, map), features used only after user interaction.\
- React: `React.lazy` + `\u003cSuspense\u003e`. Next.js: `next/dynamic`.\
\
Trade-off: splitting **too finely** yields many chunks and request overhead; balance it by **prefetching** chunks you expect to need soon.
