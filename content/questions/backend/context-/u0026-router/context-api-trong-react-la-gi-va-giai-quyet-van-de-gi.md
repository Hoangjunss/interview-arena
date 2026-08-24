---
id: context-api-trong-react-la-gi-va-giai-quyet-van-de-gi
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context API trong React là gì và giải quyết vấn đề gì?

## Question (EN)
What is the Context API in React and what problem does it solve?

## Đáp án chi tiết (VI)
Context API cho phép chia sẻ dữ liệu (theme, language, auth, user) qua component tree mà không cần pass props qua từng cấp trung gian (props drilling). Gồm ba phần: createContext, Provider, useContext.\
```tsx\
// auth-context.tsx\
interface AuthCtx { user: User | null; logout: () =\u003e void }\
const AuthContext = createContext\u003cAuthCtx | null\u003e(null)\
\
export const AuthProvider = ({ children }: { children: React.ReactNode }) =\u003e {\
  const [user, setUser] = useState\u003cUser | null\u003e(null)\
  const logout = () =\u003e setUser(null)\
  return (\
    \u003cAuthContext.Provider value={{ user, logout }}\u003e\
      {children}\
    \u003c/AuthContext.Provider\u003e\
  )\
}\
\
// Hook để dùng an toàn\
export const useAuth = () =\u003e {\
  const ctx = useContext(AuthContext)\
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')\
  return ctx\
}\
\
// Dùng trong component\
const Header = () =\u003e {\
  const { user, logout } = useAuth()\
  return \u003cbutton onClick={logout}\u003eLogout {user?.name}\u003c/button\u003e\
}\
```

## Detailed Answer (EN)
The Context API lets you share data (theme, language, auth, user info) across the component tree without passing props through every intermediate level (prop drilling). It has three parts: createContext, Provider, and useContext.\
```tsx\
// auth-context.tsx\
interface AuthCtx { user: User | null; logout: () =\u003e void }\
const AuthContext = createContext\u003cAuthCtx | null\u003e(null)\
\
export const AuthProvider = ({ children }: { children: React.ReactNode }) =\u003e {\
  const [user, setUser] = useState\u003cUser | null\u003e(null)\
  const logout = () =\u003e setUser(null)\
  return (\
    \u003cAuthContext.Provider value={{ user, logout }}\u003e\
      {children}\
    \u003c/AuthContext.Provider\u003e\
  )\
}\
\
// Safe hook with guard\
export const useAuth = () =\u003e {\
  const ctx = useContext(AuthContext)\
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')\
  return ctx\
}\
\
// Usage in any descendant\
const Header = () =\u003e {\
  const { user, logout } = useAuth()\
  return \u003cbutton onClick={logout}\u003eLogout {user?.name}\u003c/button\u003e\
}\
```
