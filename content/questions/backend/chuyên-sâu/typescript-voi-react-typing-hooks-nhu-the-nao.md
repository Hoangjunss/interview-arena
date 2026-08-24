---
id: typescript-voi-react-typing-hooks-nhu-the-nao
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TypeScript với React: typing hooks như thế nào?

## Question (EN)
How do you type React hooks with TypeScript?

## Đáp án chi tiết (VI)
useState: `useState\u003cType\u003e(init)` khi init không đủ thông tin. useRef: `useRef\u003cHTMLInputElement\u003e(null)` cho DOM refs, `useRef\u003cnumber\u003e(0)` cho mutable values (không trigger re-render). useReducer: type actions với discriminated unions.\
\
```typescript\
const [user, setUser] = useState\u003cUser | null\u003e(null);\
\
const inputRef = useRef\u003cHTMLInputElement\u003e(null);  // DOM ref\
const timerRef = useRef\u003cnumber\u003e(0);              // mutable value\
\
// Custom hook với explicit return type:\
function useCounter(init = 0): [number, () =\u003e void] {\
  const [count, setCount] = useState(init);\
  return [count, () =\u003e setCount(c =\u003e c + 1)];\
}\
```

## Detailed Answer (EN)
useState: use `useState\u003cType\u003e(init)` when init does not provide enough information for inference. useRef: `useRef\u003cHTMLInputElement\u003e(null)` for DOM refs, `useRef\u003cnumber\u003e(0)` for mutable values (no re-render trigger). useReducer: type actions with discriminated unions.\
\
```typescript\
const [user, setUser] = useState\u003cUser | null\u003e(null);\
\
const inputRef = useRef\u003cHTMLInputElement\u003e(null);  // DOM ref\
const timerRef = useRef\u003cnumber\u003e(0);              // mutable value\
\
// Custom hook with explicit return type:\
function useCounter(init = 0): [number, () =\u003e void] {\
  const [count, setCount] = useState(init);\
  return [count, () =\u003e setCount(c =\u003e c + 1)];\
}\
```
