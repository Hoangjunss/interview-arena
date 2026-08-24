---
id: reducer-trong-redux-la-gi-cach-viet-mot-reducer-dung-chuan
position: backend
technology: redux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reducer trong Redux là gì? Cách viết một reducer đúng chuẩn?

## Question (EN)
What is a reducer in Redux? How do you write a proper reducer?

## Đáp án chi tiết (VI)
Reducer là pure function nhận `(state, action)` và trả về state mới — không được mutate state trực tiếp mà phải tạo bản sao mới.\
\
Ví dụ đúng: `case 'ADD_TODO': return [...state, action.payload]` thay vì `state.push(action.payload)`. Pure function nghĩa là không có side effects, không gọi API, không random — cùng input luôn cho cùng output, điều này giúp Redux DevTools time-travel hoạt động được. Luôn có `default: return state` để tránh trả về `undefined` khi action không khớp. Với Redux Toolkit, dùng Immer bên trong nên được phép viết `state.todos.push(item)` mà vẫn immutable thật sự.

## Detailed Answer (EN)
A reducer is a pure function that takes `(state, action)` and returns a new state — it must never mutate state directly; it must return a new copy. Correct example: `case 'ADD_TODO': return [...state, action.payload]` instead of `state.push(action.payload)`. Being a pure function means no side effects, no API calls, no randomness — the same input always produces the same output, which is what enables Redux DevTools time-travel. Always include `default: return state` to avoid returning `undefined` when no action matches. With Redux Toolkit, Immer is used internally, so you can write `state.todos.push(item)` and it remains truly immutable.
