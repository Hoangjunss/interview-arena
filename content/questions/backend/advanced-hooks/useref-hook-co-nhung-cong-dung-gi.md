---
id: useref-hook-co-nhung-cong-dung-gi
position: backend
technology: advanced-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useRef hook có những công dụng gì?

## Question (EN)
What are the main uses of the useRef hook?

## Đáp án chi tiết (VI)
useRef trả về mutable ref object với `.current` property không trigger re-render khi thay đổi. Hai công dụng chính: (1) truy cập DOM element trực tiếp để focus/measure; (2) lưu giá trị mutable giữa renders mà không cần re-render.\
```tsx\
const FormExample = () =\u003e {\
  // (1) DOM ref: focus input khi mount\
  const inputRef = useRef\u003cHTMLInputElement\u003e(null)\
  useEffect(() =\u003e { inputRef.current?.focus() }, [])\
\
  // (2) mutable value: lưu timerId mà không trigger re-render\
  const timerRef = useRef\u003cReturnType\u003ctypeof setInterval\u003e | null\u003e(null)\
  const start = () =\u003e { timerRef.current = setInterval(tick, 1000) }\
  const stop  = () =\u003e { if (timerRef.current) clearInterval(timerRef.current) }\
\
  return \u003cinput ref={inputRef} placeholder=\\"auto-focused\\" /\u003e\
}\
```

## Detailed Answer (EN)
useRef returns a mutable ref object whose `.current` property does not trigger a re-render when changed. Two primary uses: (1) directly accessing a DOM element to focus or measure it; (2) storing a mutable value that persists across renders without causing a re-render.\
```tsx\
const FormExample = () =\u003e {\
  // (1) DOM ref: focus input on mount\
  const inputRef = useRef\u003cHTMLInputElement\u003e(null)\
  useEffect(() =\u003e { inputRef.current?.focus() }, [])\
\
  // (2) mutable value: store timerId without triggering re-render\
  const timerRef = useRef\u003cReturnType\u003ctypeof setInterval\u003e | null\u003e(null)\
  const start = () =\u003e { timerRef.current = setInterval(tick, 1000) }\
  const stop  = () =\u003e { if (timerRef.current) clearInterval(timerRef.current) }\
\
  return \u003cinput ref={inputRef} placeholder=\\"auto-focused\\" /\u003e\
}\
```
