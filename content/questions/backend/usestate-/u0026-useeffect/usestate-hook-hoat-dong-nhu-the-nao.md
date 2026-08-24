---
id: usestate-hook-hoat-dong-nhu-the-nao
position: backend
technology: usestate-\u0026-useeffect
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useState hook hoạt động như thế nào?

## Question (EN)
How does the useState hook work?

## Đáp án chi tiết (VI)
useState nhận giá trị khởi tạo và trả về mảng gồm state hiện tại và setter function. Khi gọi setter, React schedule re-render với giá trị mới. Setter có thể nhận giá trị mới trực tiếp hoặc updater function để tránh stale closure.\
```tsx\
const Counter = () =\u003e {\
  const [count, setCount] = useState(0)\
\
  return (\
    \u003cdiv\u003e\
      \u003cp\u003eCount: {count}\u003c/p\u003e\
      \u003cbutton onClick={() =\u003e setCount(count + 1)}\u003e+1 trực tiếp\u003c/button\u003e\
      \u003cbutton onClick={() =\u003e setCount(prev =\u003e prev + 1)}\u003e+1 updater\u003c/button\u003e\
    \u003c/div\u003e\
  )\
}\
```

## Detailed Answer (EN)
useState accepts an initial value and returns an array containing the current state and a setter function. Calling the setter schedules a re-render with the new value. The setter can receive the new value directly or an updater function to avoid stale closure issues.\
```tsx\
const Counter = () =\u003e {\
  const [count, setCount] = useState(0)\
\
  return (\
    \u003cdiv\u003e\
      \u003cp\u003eCount: {count}\u003c/p\u003e\
      \u003cbutton onClick={() =\u003e setCount(count + 1)}\u003edirect\u003c/button\u003e\
      \u003cbutton onClick={() =\u003e setCount(prev =\u003e prev + 1)}\u003eupdater fn\u003c/button\u003e\
    \u003c/div\u003e\
  )\
}\
```
