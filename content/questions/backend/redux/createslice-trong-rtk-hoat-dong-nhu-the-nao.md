---
id: createslice-trong-rtk-hoat-dong-nhu-the-nao
position: backend
technology: redux
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
createSlice trong RTK hoạt động như thế nào?

## Question (EN)
How does createSlice work in RTK?

## Đáp án chi tiết (VI)
`createSlice` gộp actions, action types, và reducer vào một chỗ — Immer bên trong cho phép viết mutable syntax mà vẫn immutable thật sự. `createSlice` là API quan trọng nhất của RTK, nhận object gồm `name` (prefix cho action types), `initialState`, và `reducers` (object chứa các reducer functions). Nó tự động tạo action creators và action types — ví dụ: reducer `increment` trong slice tên 'counter' tạo ra action type `counter/increment` và action creator `counterSlice.actions.increment()`. Bên trong dùng Immer nên viết `state.value += 1` thay vì `return { ...state, value: state.value + 1 }` — code ngắn hơn 3-4 lần với nested state. Export 2 thứ: `counterSlice.actions` (dùng trong component dispatch) và `counterSlice.reducer` (dùng trong configureStore). Lưu ý thường gặp: trong reducers của createSlice, hoặc mutate state HOẶC return state mới, KHÔNG làm cả hai — Immer sẽ throw error. Ví dụ sai: `state.items.push(item); return state;`.

## Detailed Answer (EN)
`createSlice` combines actions, action types, and reducer in one place — Immer internally allows mutable write syntax while remaining truly immutable. `createSlice` is the most important API in RTK. It accepts an object with `name` (prefix for action types), `initialState`, and `reducers` (an object of reducer functions). It automatically generates action creators and action types — for example, a reducer named `increment` in a slice called 'counter' produces action type `counter/increment` and action creator `counterSlice.actions.increment()`. Immer is used internally, so you can write `state.value += 1` instead of `return { ...state, value: state.value + 1 }` — 3-4x less code for nested state. Export two things: `counterSlice.actions` (used in components to dispatch) and `counterSlice.reducer` (used in configureStore). Common pitfall: inside createSlice reducers, either mutate state OR return a new state — never both. Immer will throw an error. Wrong example: `state.items.push(item); return state;`
