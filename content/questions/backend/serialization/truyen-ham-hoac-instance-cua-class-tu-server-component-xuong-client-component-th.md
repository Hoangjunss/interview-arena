---
id: truyen-ham-hoac-instance-cua-class-tu-server-component-xuong-client-component-th
position: backend
technology: serialization
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truyền hàm hoặc instance của class từ Server Component xuống Client Component thì lỗi gì? Cách xử lý?

## Question (EN)
What error do you get when passing a function or class instance from a Server Component to a Client Component, and how do you fix it?

## Đáp án chi tiết (VI)
Sẽ gặp lỗi kiểu `Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with \\"use server\\"`.\
\
Lý do: props qua ranh giới server → client phải **serialize** được để nhúng vào payload RSC. React hỗ trợ primitive, plain object/array, `Date`, `Map`, `Set`, `Promise`, JSX, và **Server Function** (`'use server'`). Không hỗ trợ: hàm thường, class instance (bao gồm object ORM có prototype/method), `Symbol` không đăng ký.\
\
**Cách xử lý:**\
- Cần callback chạy trên server → khai báo Server Function bằng `'use server'` rồi truyền xuống.\
- Cần handler chạy trên client → định nghĩa ngay trong client component, đừng truyền từ server.\
- Với dữ liệu ORM → map sang plain object trước khi truyền.\
\
```tsx\
const rows = await prisma.order.findMany()\
const plain = rows.map(r =\u003e ({ id: r.id, total: r.total.toString() }))\
return \u003cOrderTable rows={plain} /\u003e\
```\
\
Lỗi hay gặp trong thực tế: `Decimal` của Prisma và `ObjectId` của Mongoose đều là class instance, phải chuyển sang chuỗi/số.

## Detailed Answer (EN)
$89
