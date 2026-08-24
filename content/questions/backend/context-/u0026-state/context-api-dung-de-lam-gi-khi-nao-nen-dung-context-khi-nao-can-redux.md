---
id: context-api-dung-de-lam-gi-khi-nao-nen-dung-context-khi-nao-can-redux
position: backend
technology: context-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context API dùng để làm gì? Khi nào nên dùng Context, khi nào cần Redux?

## Question (EN)
What is the Context API for? When should you use Context vs Redux?

## Đáp án chi tiết (VI)
**Context** truyền dữ liệu xuyên cây component mà không phải chuyền prop qua từng tầng (**prop drilling**): `createContext` → `\u003cProvider value\u003e` → `useContext`.\
\
Lưu ý quan trọng: Context **không phải** state manager. Mọi consumer sẽ **re-render khi `value` đổi** (dù chỉ dùng một phần nhỏ) → nó hợp với dữ liệu **ít thay đổi**: theme, locale, user/auth, cấu hình app.\
\
Khi nào cần **Redux/Zustand**: state đổi thường xuyên/phức tạp, cần **selector** để tránh re-render thừa, middleware, devtools, cache. Riêng **server state** (dữ liệu từ API) → dùng React Query thay vì đưa server state vào Context. Mẹo giảm re-render: chia nhỏ context hoặc memo hóa `value`.

## Detailed Answer (EN)
**Context** passes data through the component tree without threading props at every level (**prop drilling**): `createContext` → `\u003cProvider value\u003e` → `useContext`.\
\
A key caveat: Context is **not** a state manager. Every consumer **re-renders when `value` changes** (even if it only reads a small part) → it fits data that **changes rarely**: theme, locale, user/auth, app config.\
\
When you need **Redux/Zustand**: frequently or complexly changing state, **selectors** to avoid wasted re-renders, middleware, devtools, caching. For **server state** (API data), use React Query instead of putting server state into Context. To reduce re-renders: split contexts or memoize the `value`.
