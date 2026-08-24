---
id: app-tsx-va-document-tsx-trong-pages-router-lam-gi-va-app-router-thay-the-chung-b
position: backend
technology: pages-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`_app.tsx` và `_document.tsx` trong Pages Router làm gì, và App Router thay thế chúng bằng gì?

## Question (EN)
What do `_app.tsx` and `_document.tsx` do in the Pages Router, and what replaces them in the App Router?

## Đáp án chi tiết (VI)
Trong **Pages Router** đây là 2 file đặc biệt:\
\
- **`_app.tsx`** — wrap mọi page, là nơi đặt **layout chung, global CSS, provider** (theme, store) và giữ state qua các lần điều hướng. Chạy cả server lẫn client.\
```tsx\
export default function App({ Component, pageProps }) {\
  return \u003cProvider\u003e\u003cComponent {...pageProps} /\u003e\u003c/Provider\u003e\
}\
```\
- **`_document.tsx`** — tùy biến cấu trúc HTML ngoài cùng (`\u003chtml\u003e`, `\u003cbody\u003e`, thẻ `\u003clang\u003e`, preconnect). Chỉ render **một lần trên server**, không có event/`window` → đừng đặt logic client ở đây.\
\
**App Router thay bằng:**\
- `_app` → **`app/layout.tsx`** (root layout, nested layouts), provider bọc trong Client Component.\
- `_document` → cũng là **root layout** (`\u003chtml\u003e`/`\u003cbody\u003e` viết thẳng trong đó) + API `metadata` cho `\u003chead\u003e`.\
\
**Lưu ý:** không trộn hai cơ chế — nếu page đã sang `app/`, đừng còn `_app`/`_document` chi phối nó; chúng chỉ áp dụng cho route trong `pages/`.

## Detailed Answer (EN)
In the **Pages Router** these are two special files:\
\
- **`_app.tsx`** — wraps every page; the place for **shared layout, global CSS, providers** (theme, store) and persisting state across navigations. Runs on both server and client.\
```tsx\
export default function App({ Component, pageProps }) {\
  return \u003cProvider\u003e\u003cComponent {...pageProps} /\u003e\u003c/Provider\u003e\
}\
```\
- **`_document.tsx`** — customizes the outermost HTML structure (`\u003chtml\u003e`, `\u003cbody\u003e`, `lang`, preconnect). Renders **once on the server only**, has no events/`window` → don't put client logic here.\
\
**App Router replaces them with:**\
- `_app` → **`app/layout.tsx`** (root + nested layouts), providers wrapped in a Client Component.\
- `_document` → also the **root layout** (`\u003chtml\u003e`/`\u003cbody\u003e` written directly there) + the `metadata` API for `\u003chead\u003e`.\
\
**Note:** don't mix the two systems — if a page has moved to `app/`, `_app`/`_document` no longer govern it; they apply only to routes under `pages/`.
