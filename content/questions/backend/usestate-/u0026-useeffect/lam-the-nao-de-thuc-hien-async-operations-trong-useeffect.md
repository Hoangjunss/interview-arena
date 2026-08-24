---
id: lam-the-nao-de-thuc-hien-async-operations-trong-useeffect
position: backend
technology: usestate-\u0026-useeffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để thực hiện async operations trong useEffect?

## Question (EN)
How do you perform async operations inside useEffect?

## Đáp án chi tiết (VI)
Không thể trực tiếp dùng async function làm effect callback vì nó trả về Promise, nhưng cleanup phải return void. Giải pháp: khai báo async function bên trong effect rồi gọi nó. Luôn xử lý cleanup để cancel request nếu component unmount.\
```tsx\
useEffect(() =\u003e {\
  const controller = new AbortController()\
\
  const fetchData = async () =\u003e {\
    try {\
      const res = await fetch('/api/data', { signal: controller.signal })\
      const json = await res.json()\
      setData(json)\
    } catch (err) {\
      if (err.name !== 'AbortError') setError(err)\
    }\
  }\
\
  fetchData()\
\
  return () =\u003e controller.abort()\
}, [url])\
```

## Detailed Answer (EN)
You cannot use an async function directly as the effect callback because it returns a Promise, but the cleanup must return void or nothing. Declare an async function inside the effect and call it immediately. Always handle cleanup to cancel the request if the component unmounts.\
```tsx\
useEffect(() =\u003e {\
  const controller = new AbortController()\
\
  const fetchData = async () =\u003e {\
    try {\
      const res = await fetch('/api/data', { signal: controller.signal })\
      const json = await res.json()\
      setData(json)\
    } catch (err) {\
      if (err.name !== 'AbortError') setError(err)\
    }\
  }\
\
  fetchData()\
\
  return () =\u003e controller.abort()\
}, [url])\
```
