---
id: stale-closure-la-gi-va-cach-phong-tranh
position: backend
technology: hoisting-\u0026-closure
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Stale closure là gì và cách phòng tránh?

## Question (EN)
What is a stale closure and how do you prevent it?

## Đáp án chi tiết (VI)
Stale closure xảy ra khi closure nắm giữ giá trị cũ của biến thay vì giá trị mới nhất. Thường gặp trong React hooks khi useEffect capture state cũ:\
\
```javascript\
// Bug: stale closure\
const [count, setCount] = useState(0);\
useEffect(() =\u003e {\
  const id = setInterval(() =\u003e {\
    setCount(count + 1); // \\"count\\" luôn là 0 (stale)\
  }, 1000);\
  return () =\u003e clearInterval(id);\
}, []); // [] → chạy 1 lần, capture count=0 mãi mãi\
\
// Fix 1: functional update (không cần capture count)\
setCount(c =\u003e c + 1);\
\
// Fix 2: thêm dependency\
}, [count]);\
\
// Fix 3: useRef để giữ latest value\
const countRef = useRef(count);\
countRef.current = count; // luôn cập nhật\
```

## Detailed Answer (EN)
A stale closure captures an old value of a variable instead of the latest one. Commonly seen in React hooks when useEffect captures stale state:\
\
```javascript\
// Bug: stale closure\
const [count, setCount] = useState(0);\
useEffect(() =\u003e {\
  const id = setInterval(() =\u003e {\
    setCount(count + 1); // \\"count\\" always 0 (stale)\
  }, 1000);\
  return () =\u003e clearInterval(id);\
}, []); // runs once, captures count=0 forever\
\
// Fix 1: functional update (no closure over count needed)\
setCount(c =\u003e c + 1);\
\
// Fix 2: add dependency\
}, [count]);\
\
// Fix 3: useRef to hold latest value\
const countRef = useRef(count);\
countRef.current = count; // always current\
```
