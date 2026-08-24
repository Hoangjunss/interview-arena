---
id: viet-custom-hook-usedebounce-nhu-the-nao
position: backend
technology: custom-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết custom hook useDebounce như thế nào?

## Question (EN)
How do you implement a useDebounce custom hook?

## Đáp án chi tiết (VI)
useDebounce delay việc cập nhật value cho đến khi user ngừng thay đổi trong khoảng thời gian nhất định:\
```tsx\
function useDebounce\u003cT\u003e(value: T, delay: number): T {\
  const [debounced, setDebounced] = useState(value)\
  useEffect(() =\u003e {\
    const timer = setTimeout(() =\u003e setDebounced(value), delay)\
    return () =\u003e clearTimeout(timer)\
  }, [value, delay])\
  return debounced\
}\
```

## Detailed Answer (EN)
useDebounce delays updating the value until the user stops changing it for a specified duration:\
```tsx\
function useDebounce\u003cT\u003e(value: T, delay: number): T {\
  const [debounced, setDebounced] = useState(value)\
  useEffect(() =\u003e {\
    const timer = setTimeout(() =\u003e setDebounced(value), delay)\
    return () =\u003e clearTimeout(timer)\
  }, [value, delay])\
  return debounced\
}\
```
