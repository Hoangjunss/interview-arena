---
id: usecallback-hook-dung-de-lam-gi-khac-gi-usememo
position: backend
technology: advanced-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useCallback hook dùng để làm gì? Khác gì useMemo?

## Question (EN)
What is the useCallback hook for? How does it differ from useMemo?

## Đáp án chi tiết (VI)
useCallback memoize function để giữ stable reference giữa renders. Dùng khi truyền callback xuống child component được wrap bởi React.memo, hoặc khi function là dependency của useEffect.\
```tsx\
const Parent = () =\u003e {\
  const [count, setCount] = useState(0)\
\
  // không dùng useCallback: handleClick mới mỗi render → Child luôn re-render\
  // dùng useCallback: reference ổn định → Child skip re-render nếu props khác không đổi\
  const handleClick = useCallback(() =\u003e {\
    console.log('clicked')\
  }, []) // deps rỗng vì không dùng state/props trong fn\
\
  return (\
    \u003c\u003e\
      \u003cbutton onClick={() =\u003e setCount(c =\u003e c + 1)}\u003eParent count: {count}\u003c/button\u003e\
      \u003cMemoChild onClick={handleClick} /\u003e\
    \u003c/\u003e\
  )\
}\
\
const MemoChild = React.memo(({ onClick }: { onClick: () =\u003e void }) =\u003e {\
  console.log('Child render')\
  return \u003cbutton onClick={onClick}\u003eChild\u003c/button\u003e\
})\
```

## Detailed Answer (EN)
useCallback memoizes a function to maintain a stable reference between renders. Use it when passing a callback to a child component wrapped with React.memo, or when a function is a dependency of useEffect.\
```tsx\
const Parent = () =\u003e {\
  const [count, setCount] = useState(0)\
\
  // without useCallback: handleClick is new every render → Child always re-renders\
  // with useCallback: stable reference → Child skips re-render if other props unchanged\
  const handleClick = useCallback(() =\u003e {\
    console.log('clicked')\
  }, []) // empty deps because fn doesn't use any state/props\
\
  return (\
    \u003c\u003e\
      \u003cbutton onClick={() =\u003e setCount(c =\u003e c + 1)}\u003eParent count: {count}\u003c/button\u003e\
      \u003cMemoChild onClick={handleClick} /\u003e\
    \u003c/\u003e\
  )\
}\
\
const MemoChild = React.memo(({ onClick }: { onClick: () =\u003e void }) =\u003e {\
  console.log('Child render')\
  return \u003cbutton onClick={onClick}\u003eChild\u003c/button\u003e\
})\
```
