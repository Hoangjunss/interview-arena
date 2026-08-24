---
id: redux-toolkit-createslice-hoat-dong-the-nao
position: backend
technology: redux
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redux Toolkit createSlice hoạt động thế nào?

## Question (EN)
How does Redux Toolkit's createSlice work?

## Đáp án chi tiết (VI)
createSlice kết hợp action creators + reducer trong cùng một file, dùng Immer nên có thể mutate state trực tiếp.\
\
```js\
const userSlice = createSlice({\
  name: 'user',\
  initialState,\
  reducers: {\
    setUser(state, action) { state.name = action.payload; }\
  }\
});\
export const { setUser } = userSlice.actions;\
export default userSlice.reducer;\
```

## Detailed Answer (EN)
createSlice combines action creators and a reducer in one place: `createSlice({ name: 'user', initialState, reducers: { setUser(state, action) { state.name = action.payload } } })`. It auto-generates action type strings, uses Immer under the hood so you can write mutating-style updates, and exports both action creators and the reducer.
