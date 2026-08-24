---
id: cleanup-function-trong-useeffect-la-gi-va-khi-nao-can-dung
position: backend
technology: usestate-\u0026-useeffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cleanup function trong useEffect là gì và khi nào cần dùng?

## Question (EN)
What is the cleanup function in useEffect and when do you need it?

## Đáp án chi tiết (VI)
Cleanup function là function được return từ useEffect, chạy trước khi effect chạy lại hoặc component unmount. Dùng để hủy subscriptions, clearTimeout, cancel fetch requests tránh memory leaks và stale updates.\
```tsx\
useEffect(() =\u003e {\
  const timer = setInterval(() =\u003e {\
    setCount(c =\u003e c + 1)\
  }, 1000)\
\
  const subscription = eventSource.subscribe(handler)\
\
  // cleanup: chạy khi unmount hoặc trước khi effect chạy lại\
  return () =\u003e {\
    clearInterval(timer)\
    subscription.unsubscribe()\
  }\
}, [])\
```

## Detailed Answer (EN)
The cleanup function is the function returned from useEffect. It runs before the effect re-runs or before the component unmounts. Use it to cancel subscriptions, clear timeouts, or abort fetch requests to prevent memory leaks and stale updates.\
```tsx\
useEffect(() =\u003e {\
  const timer = setInterval(() =\u003e {\
    setCount(c =\u003e c + 1)\
  }, 1000)\
\
  const subscription = eventSource.subscribe(handler)\
\
  // cleanup: runs on unmount or before re-running the effect\
  return () =\u003e {\
    clearInterval(timer)\
    subscription.unsubscribe()\
  }\
}, [])\
```
