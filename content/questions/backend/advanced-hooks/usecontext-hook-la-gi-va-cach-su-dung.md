---
id: usecontext-hook-la-gi-va-cach-su-dung
position: backend
technology: advanced-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useContext hook là gì và cách sử dụng?

## Question (EN)
What is the useContext hook and how do you use it?

## Đáp án chi tiết (VI)
useContext nhận Context object và trả về value hiện tại từ Provider gần nhất bên trên. Khi value của Provider thay đổi, mọi component gọi useContext đó đều re-render. Lưu ý: nếu không có Provider bên trên, trả về giá trị default từ createContext.\
```tsx\
// 1. Tạo context\
const ThemeContext = createContext\u003c'light' | 'dark'\u003e('light')\
\
// 2. Provider bọc cây component\
const App = () =\u003e (\
  \u003cThemeContext.Provider value=\\"dark\\"\u003e\
    \u003cToolbar /\u003e\
  \u003c/ThemeContext.Provider\u003e\
)\
\
// 3. Consume ở bất kỳ component con nào\
const Toolbar = () =\u003e {\
  const theme = useContext(ThemeContext)\
  return \u003cdiv className={theme}\u003eCurrent theme: {theme}\u003c/div\u003e\
}\
```

## Detailed Answer (EN)
useContext accepts a Context object and returns the current value from the nearest Provider above in the tree. When the Provider's value changes, every component calling that useContext will re-render. Pitfall: if there is no Provider above, it returns the default value from createContext.\
```tsx\
// 1. Create context\
const ThemeContext = createContext\u003c'light' | 'dark'\u003e('light')\
\
// 2. Provider wraps the component tree\
const App = () =\u003e (\
  \u003cThemeContext.Provider value=\\"dark\\"\u003e\
    \u003cToolbar /\u003e\
  \u003c/ThemeContext.Provider\u003e\
)\
\
// 3. Consume in any descendant component\
const Toolbar = () =\u003e {\
  const theme = useContext(ThemeContext)\
  return \u003cdiv className={theme}\u003eCurrent theme: {theme}\u003c/div\u003e\
}\
```
