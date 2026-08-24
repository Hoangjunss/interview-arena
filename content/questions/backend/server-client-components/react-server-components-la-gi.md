---
id: react-server-components-la-gi
position: backend
technology: server-client-components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Server Components là gì?

## Question (EN)
What are React Server Components?

## Đáp án chi tiết (VI)
React Server Components (RSC) là các component chỉ chạy và render trên server.\
\
**Đặc điểm chính:**\
- **Zero Bundle Size:** Không gửi JavaScript code của chúng xuống client.\
- **Truy cập trực tiếp Backend:** Có thể gọi database, file system trực tiếp.\
- **Bất đồng bộ (Async):** Thường được viết dưới dạng `async function` để `await` dữ liệu.\
- **Hạn chế:** Không hỗ trợ state (`useState`), side-effects (`useEffect`), event handlers (`onClick`), hay Browser APIs.\
\
Mặc định, mọi component trong Next.js App Router (`app/`) đều là Server Component.\
\
```tsx\
// app/products/page.tsx — Server Component (mặc định)\
// Có thể dùng async/await trực tiếp, access DB, không cần useEffect\
async function ProductsPage() {\
  // Chạy trên server, không ship JS xuống client\
  const products = await db.products.findMany()\
\
  return (\
    \u003cul\u003e\
      {products.map(p =\u003e (\
        \u003cli key={p.id}\u003e{p.name} — {p.price} VND\u003c/li\u003e\
      ))}\
    \u003c/ul\u003e\
  )\
}\
\
export default ProductsPage\
```

## Detailed Answer (EN)
React Server Components (RSC) are components that only run and render on the server.\
\
**Key Characteristics:**\
- **Zero Bundle Size:** Their JavaScript code is not shipped to the client.\
- **Direct Backend Access:** They can directly access databases or the file system.\
- **Asynchronous:** Often written as `async function`s to `await` data.\
- **Limitations:** They do not support state (`useState`), side-effects (`useEffect`), event handlers (`onClick`), or Browser APIs.\
\
By default, every component in the Next.js App Router (`app/`) is a Server Component.\
\
```tsx\
// app/products/page.tsx — Server Component (default)\
// Can use async/await directly, access DB, no need for useEffect\
async function ProductsPage() {\
  // Runs on server only, no JS shipped to client\
  const products = await db.products.findMany()\
\
  return (\
    \u003cul\u003e\
      {products.map(p =\u003e (\
        \u003cli key={p.id}\u003e{p.name} — {p.price} USD\u003c/li\u003e\
      ))}\
    \u003c/ul\u003e\
  )\
}\
\
export default ProductsPage\
```
