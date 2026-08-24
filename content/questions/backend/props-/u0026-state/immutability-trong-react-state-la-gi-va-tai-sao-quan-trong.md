---
id: immutability-trong-react-state-la-gi-va-tai-sao-quan-trong
position: backend
technology: props-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Immutability trong React state là gì và tại sao quan trọng?

## Question (EN)
What is immutability in React state and why does it matter?

## Đáp án chi tiết (VI)
Immutability nghĩa là không trực tiếp mutate state mà tạo object/array mới. React dùng shallow comparison để detect thay đổi, nếu mutate trực tiếp React sẽ không nhận ra sự thay đổi và không re-render. Dùng spread operator `{...state, field: value}` hoặc Array.map/filter để tạo bản sao mới.

## Detailed Answer (EN)
Immutability means never mutating state directly, but always creating a new object or array. React uses shallow comparison to detect changes — if you mutate in place, React won't recognize the change and won't re-render. Use the spread operator `{...state, field: value}` or Array.map/filter to produce new copies.
