---
id: react-memo-la-gi-va-cach-hoat-dong
position: backend
technology: performance-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React.memo là gì và cách hoạt động?

## Question (EN)
What is React.memo and how does it work?

## Đáp án chi tiết (VI)
React.memo là HOC memoize function component, skip re-render nếu props không thay đổi (shallow comparison). Nên dùng khi component render expensive và props ít thay đổi. Cần kết hợp với useCallback cho function props để có hiệu quả.\
```tsx\
// Row chỉ re-render khi data hoặc onDelete thực sự thay đổi\
const Row = React.memo(({ data, onDelete }: RowProps) =\u003e {\
  console.log('Row render:', data.id)\
  return (\
    \u003ctr\u003e\
      \u003ctd\u003e{data.name}\u003c/td\u003e\
      \u003ctd\u003e\u003cbutton onClick={() =\u003e onDelete(data.id)}\u003eDelete\u003c/button\u003e\u003c/td\u003e\
    \u003c/tr\u003e\
  )\
})\
\
const Table = ({ items }: { items: Item[] }) =\u003e {\
  // useCallback để giữ stable reference, tránh Row re-render mỗi khi Table render\
  const handleDelete = useCallback((id: number) =\u003e {\
    setItems(prev =\u003e prev.filter(i =\u003e i.id !== id))\
  }, [])\
\
  return (\
    \u003ctable\u003e\
      {items.map(item =\u003e \u003cRow key={item.id} data={item} onDelete={handleDelete} /\u003e)}\
    \u003c/table\u003e\
  )\
}\
```

## Detailed Answer (EN)
React.memo is a Higher-Order Component that memoizes a function component, skipping re-renders when props have not changed (shallow comparison). Use it when the component is expensive to render and props change infrequently. Combine with useCallback for function props to make the comparison effective.\
```tsx\
// Row only re-renders when data or onDelete actually changes\
const Row = React.memo(({ data, onDelete }: RowProps) =\u003e {\
  console.log('Row render:', data.id)\
  return (\
    \u003ctr\u003e\
      \u003ctd\u003e{data.name}\u003c/td\u003e\
      \u003ctd\u003e\u003cbutton onClick={() =\u003e onDelete(data.id)}\u003eDelete\u003c/button\u003e\u003c/td\u003e\
    \u003c/tr\u003e\
  )\
})\
\
const Table = ({ items }: { items: Item[] }) =\u003e {\
  // useCallback keeps a stable reference, preventing Row re-renders on every Table render\
  const handleDelete = useCallback((id: number) =\u003e {\
    setItems(prev =\u003e prev.filter(i =\u003e i.id !== id))\
  }, [])\
\
  return (\
    \u003ctable\u003e\
      {items.map(item =\u003e \u003cRow key={item.id} data={item} onDelete={handleDelete} /\u003e)}\
    \u003c/table\u003e\
  )\
}\
```
