---
id: useoptimistic-hook-react-19-la-gi
position: backend
technology: advanced-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useOptimistic hook (React 19) là gì?

## Question (EN)
What is the useOptimistic hook in React 19?

## Đáp án chi tiết (VI)
useOptimistic cho phép hiển thị state tạm thời (optimistic) ngay lập tức khi user hành động, trước khi server response. Nếu action thất bại, tự động rollback về state thực. Cú pháp: `const [optimisticMessages, addOptimistic] = useOptimistic(messages, (state, newMsg) =\u003e [...state, newMsg])`. Cải thiện perceived performance.

## Detailed Answer (EN)
useOptimistic lets you immediately show a temporary optimistic state when the user takes an action, before the server responds. If the action fails, it automatically rolls back to the real state. Syntax: `const [optimisticMessages, addOptimistic] = useOptimistic(messages, (state, newMsg) =\u003e [...state, newMsg])`. This significantly improves perceived performance.
