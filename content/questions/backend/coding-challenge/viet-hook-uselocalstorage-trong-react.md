---
id: viet-hook-uselocalstorage-trong-react
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết hook useLocalStorage trong React?

## Question (EN)
Write a useLocalStorage hook in React.

## Đáp án chi tiết (VI)
useLocalStorage persists state vào localStorage, tự đồng bộ khi value thay đổi.\
\
```js\
function useLocalStorage(key, initial) {\
  const [value, setValue] = useState(() =\u003e {\
    try {\
      const item = localStorage.getItem(key);\
      return item ? JSON.parse(item) : initial;\
    } catch { return initial; }\
  });\
  useEffect(() =\u003e {\
    localStorage.setItem(key, JSON.stringify(value));\
  }, [key, value]);\
  return [value, setValue];\
}\
```\
\
Test khả năng viết custom hooks với side effects.

## Detailed Answer (EN)
`function useLocalStorage(key, initial) { const [value, setValue] = useState(() =\u003e { try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : initial; } catch { return initial; } }); useEffect(() =\u003e { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]); return [value, setValue]; }` Tests the ability to write custom hooks with side effects.
