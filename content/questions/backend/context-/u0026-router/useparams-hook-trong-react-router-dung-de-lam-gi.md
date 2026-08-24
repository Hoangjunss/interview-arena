---
id: useparams-hook-trong-react-router-dung-de-lam-gi
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useParams hook trong React Router dùng để làm gì?

## Question (EN)
What is the useParams hook in React Router used for?

## Đáp án chi tiết (VI)
useParams trả về object chứa các dynamic segment của URL route đang active. Ví dụ route `/users/:id` khi truy cập `/users/42` thì `const { id } = useParams()` trả về `id = '42'`. Lưu ý giá trị luôn là string, cần tự convert nếu cần number: `Number(id)`. Với TypeScript dùng `useParams\u003c{ id: string }\u003e()` để type-safe. Nếu dùng ngoài Router context sẽ trả về object rỗng.

## Detailed Answer (EN)
useParams returns an object containing the dynamic segments of the currently active URL route. For example, with route `/users/:id` when visiting `/users/42`, `const { id } = useParams()` returns `id = '42'`. Note that values are always strings — convert manually if you need a number: `Number(id)`. With TypeScript use `useParams\u003c{ id: string }\u003e()` for type safety. If called outside a Router context it returns an empty object.
