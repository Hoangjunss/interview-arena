---
id: custom-hooks-la-gi-viet-custom-hook-usefetch-don-gian
position: backend
technology: hooks-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom hooks là gì? Viết custom hook useFetch đơn giản?

## Question (EN)
What are custom hooks? Write a simple useFetch custom hook.

## Đáp án chi tiết (VI)
Custom hooks là functions bắt đầu bằng `use`, tái sử dụng logic stateful giữa components.\
\
```js\
function useFetch(url) {\
  const [data, setData] = useState(null);\
  const [loading, setLoading] = useState(true);\
  const [error, setError] = useState(null);\
  useEffect(() =\u003e {\
    fetch(url)\
      .then(r =\u003e r.json())\
      .then(setData)\
      .catch(setError)\
      .finally(() =\u003e setLoading(false));\
  }, [url]);\
  return { data, loading, error };\
}\
```

## Detailed Answer (EN)
Custom hooks are functions starting with `use` that extract reusable stateful logic shared across components.\
\
```js\
function useFetch(url) {\
  const [data, setData] = useState(null);\
  const [loading, setLoading] = useState(true);\
  const [error, setError] = useState(null);\
  useEffect(() =\u003e {\
    fetch(url)\
      .then(r =\u003e r.json())\
      .then(setData)\
      .catch(setError)\
      .finally(() =\u003e setLoading(false));\
  }, [url]);\
  return { data, loading, error };\
}\
```
