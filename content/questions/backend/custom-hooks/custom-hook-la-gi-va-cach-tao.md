---
id: custom-hook-la-gi-va-cach-tao
position: backend
technology: custom-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom hook là gì và cách tạo?

## Question (EN)
What is a custom hook and how do you create one?

## Đáp án chi tiết (VI)
Custom hook là JavaScript function bắt đầu bằng 'use' có thể gọi các hooks khác. Dùng để tái sử dụng stateful logic giữa components. Mỗi component sử dụng custom hook có state instance riêng biệt, không chia sẻ.\
\
```js\
function useLocalStorage(key, initial) {\
  const [value, setValue] = useState(initial)\
  // ...sync với localStorage\
  return [value, setValue]\
}\
```

## Detailed Answer (EN)
A custom hook is a JavaScript function whose name starts with 'use' and which can call other hooks. It is used to share stateful logic between components. Each component that uses the hook gets its own isolated state instance — state is not shared.\
\
```js\
function useLocalStorage(key, initial) {\
  const [value, setValue] = useState(initial)\
  // ...sync with localStorage\
  return [value, setValue]\
}\
```
