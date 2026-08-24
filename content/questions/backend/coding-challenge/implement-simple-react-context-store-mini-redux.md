---
id: implement-simple-react-context-store-mini-redux
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement simple React context store (mini Redux)?

## Question (EN)
Implement a simple React context store (mini Redux).

## Đáp án chi tiết (VI)
Mini Redux dùng Context + useReducer: store dùng chung cho toàn app mà không cần thư viện ngoài.\
\
```jsx\
const StoreContext = createContext();\
function StoreProvider({ children }) {\
  const [state, dispatch] = useReducer(reducer, initialState);\
  return (\
    \u003cStoreContext.Provider value={{ state, dispatch }}\u003e\
      {children}\
    \u003c/StoreContext.Provider\u003e\
  );\
}\
const useStore = () =\u003e useContext(StoreContext);\
```\
\
Phỏng vấn thường hỏi để test hiểu state management internals.

## Detailed Answer (EN)
Create a context + reducer: `const StoreContext = createContext(); function StoreProvider({ children }) { const [state, dispatch] = useReducer(reducer, initialState); return \u003cStoreContext.Provider value={{ state, dispatch }}\u003e{children}\u003c/StoreContext.Provider\u003e; }` Add `const useStore = () =\u003e useContext(StoreContext)`. Interviewers ask this to test understanding of state management internals.
