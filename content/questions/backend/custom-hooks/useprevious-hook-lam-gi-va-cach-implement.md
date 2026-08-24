---
id: useprevious-hook-lam-gi-va-cach-implement
position: backend
technology: custom-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
usePrevious hook làm gì và cách implement?

## Question (EN)
What does the usePrevious hook do and how do you implement it?

## Đáp án chi tiết (VI)
usePrevious lưu giá trị trước đó của một value sử dụng useRef. Sau mỗi render, ref được cập nhật với value hiện tại nhưng function trả về ref.current (value từ render trước).\
```tsx\
function usePrevious\u003cT\u003e(value: T): T | undefined {\
  const ref = useRef\u003cT | undefined\u003e(undefined)\
\
  // useEffect không có deps chạy sau MỖI render\
  // → ghi ref SAU khi render hiện tại đã xong\
  // → lần render tiếp theo, ref.current là giá trị CŨ\
  useEffect(() =\u003e {\
    ref.current = value\
  })\
\
  return ref.current\
}\
\
// Ví dụ sử dụng\
const Counter = () =\u003e {\
  const [count, setCount] = useState(0)\
  const prevCount = usePrevious(count)\
\
  return (\
    \u003cp\u003e\
      Current: {count}, Previous: {prevCount ?? 'none'}\
    \u003c/p\u003e\
  )\
}\
```

## Detailed Answer (EN)
usePrevious stores the previous value of a variable using useRef. After each render the ref is updated with the current value, but the function returns ref.current — the value from the previous render.\
```tsx\
function usePrevious\u003cT\u003e(value: T): T | undefined {\
  const ref = useRef\u003cT | undefined\u003e(undefined)\
\
  // useEffect with no deps runs after EVERY render\
  // → writes to ref AFTER the current render completes\
  // → on the next render, ref.current holds the OLD value\
  useEffect(() =\u003e {\
    ref.current = value\
  })\
\
  return ref.current\
}\
\
// Usage example\
const Counter = () =\u003e {\
  const [count, setCount] = useState(0)\
  const prevCount = usePrevious(count)\
\
  return (\
    \u003cp\u003e\
      Current: {count}, Previous: {prevCount ?? 'none'}\
    \u003c/p\u003e\
  )\
}\
```
