---
id: react-hooks-usestate-vs-usereducer
position: frontend
technology: react
level: mid
tags: [hooks, state-management]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào bạn nên dùng `useReducer` thay vì `useState` trong React?

## Question (EN)
When should you use `useReducer` instead of `useState` in React?

## Đáp án chi tiết (VI)
`useReducer` phù hợp khi state có logic cập nhật phức tạp, nhiều state con liên quan đến nhau, hoặc khi state tiếp theo phụ thuộc vào action cụ thể thay vì chỉ một giá trị mới.

## Detailed Answer (EN)
`useReducer` fits better when update logic is complex, multiple sub-values are related, or the next state depends on a specific action rather than a single new value.
