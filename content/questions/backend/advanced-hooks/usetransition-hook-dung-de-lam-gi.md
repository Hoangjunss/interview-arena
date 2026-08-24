---
id: usetransition-hook-dung-de-lam-gi
position: backend
technology: advanced-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useTransition hook dùng để làm gì?

## Question (EN)
What is the useTransition hook used for?

## Đáp án chi tiết (VI)
useTransition (React 18) cho phép đánh dấu state update là non-urgent, React có thể interrupt và ưu tiên urgent updates trước. Trả về `[isPending, startTransition]`. Dùng khi filtering danh sách lớn, heavy re-renders mà không muốn block UI.\
```tsx\
const SearchPage = () =\u003e {\
  const [query, setQuery] = useState('')\
  const [results, setResults] = useState\u003cstring[]\u003e([])\
  const [isPending, startTransition] = useTransition()\
\
  const handleChange = (e: React.ChangeEvent\u003cHTMLInputElement\u003e) =\u003e {\
    // urgent: cập nhật input ngay lập tức\
    setQuery(e.target.value)\
\
    // non-urgent: React có thể defer để giữ UI responsive\
    startTransition(() =\u003e {\
      setResults(heavyFilter(e.target.value))\
    })\
  }\
\
  return (\
    \u003c\u003e\
      \u003cinput value={query} onChange={handleChange} placeholder=\\"Search...\\" /\u003e\
      {isPending \u0026\u0026 \u003cspan\u003eFiltering...\u003c/span\u003e}\
      \u003cul\u003e{results.map(r =\u003e \u003cli key={r}\u003e{r}\u003c/li\u003e)}\u003c/ul\u003e\
    \u003c/\u003e\
  )\
}\
```

## Detailed Answer (EN)
useTransition (React 18) lets you mark a state update as non-urgent, allowing React to interrupt it and prioritize more urgent updates first. It returns `[isPending, startTransition]`. Use it for filtering large lists or heavy re-renders where you do not want to block UI.\
```tsx\
const SearchPage = () =\u003e {\
  const [query, setQuery] = useState('')\
  const [results, setResults] = useState\u003cstring[]\u003e([])\
  const [isPending, startTransition] = useTransition()\
\
  const handleChange = (e: React.ChangeEvent\u003cHTMLInputElement\u003e) =\u003e {\
    // urgent: update input immediately\
    setQuery(e.target.value)\
\
    // non-urgent: React can defer this to keep UI responsive\
    startTransition(() =\u003e {\
      setResults(heavyFilter(e.target.value))\
    })\
  }\
\
  return (\
    \u003c\u003e\
      \u003cinput value={query} onChange={handleChange} placeholder=\\"Search...\\" /\u003e\
      {isPending \u0026\u0026 \u003cspan\u003eFiltering...\u003c/span\u003e}\
      \u003cul\u003e{results.map(r =\u003e \u003cli key={r}\u003e{r}\u003c/li\u003e)}\u003c/ul\u003e\
    \u003c/\u003e\
  )\
}\
```
