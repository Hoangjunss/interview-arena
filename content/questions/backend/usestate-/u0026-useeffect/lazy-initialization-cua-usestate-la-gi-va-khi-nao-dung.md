---
id: lazy-initialization-cua-usestate-la-gi-va-khi-nao-dung
position: backend
technology: usestate-\u0026-useeffect
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lazy initialization của useState là gì và khi nào dùng?

## Question (EN)
What is lazy initialization of useState and when should you use it?

## Đáp án chi tiết (VI)
Truyền function vào useState thay vì giá trị trực tiếp: `useState(() =\u003e computeExpensiveValue())`. Function này chỉ chạy một lần khi mount, không chạy lại mỗi render. Hữu ích khi khởi tạo state từ localStorage hay tính toán phức tạp: `useState(() =\u003e JSON.parse(localStorage.getItem('key')))`.

## Detailed Answer (EN)
Pass a function to useState instead of a direct value: `useState(() =\u003e computeExpensiveValue())`. This initializer function runs only once on mount, not on every re-render. Use it when the initial state requires an expensive computation or a side effect like reading from localStorage: `useState(() =\u003e JSON.parse(localStorage.getItem('key')))`.
