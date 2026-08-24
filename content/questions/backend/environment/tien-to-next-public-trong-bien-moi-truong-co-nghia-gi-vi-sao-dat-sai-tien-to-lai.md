---
id: tien-to-next-public-trong-bien-moi-truong-co-nghia-gi-vi-sao-dat-sai-tien-to-lai
position: backend
technology: environment
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tiền tố `NEXT_PUBLIC_` trong biến môi trường có nghĩa gì? Vì sao đặt sai tiền tố lại làm lộ secret?

## Question (EN)
What does the `NEXT_PUBLIC_` prefix mean for environment variables? Why does misusing it leak secrets?

## Đáp án chi tiết (VI)
Next.js chia biến môi trường làm hai nhóm rất rõ:\
\
- **Không có tiền tố** (`DATABASE_URL`, `STRIPE_SECRET_KEY`): chỉ tồn tại ở phía server — Server Component, Route Handler, Server Action. Đọc ở client sẽ ra `undefined`.\
- **Có `NEXT_PUBLIC_`** (`NEXT_PUBLIC_GA_ID`): được **thay thế thẳng vào mã nguồn lúc build** và đi vào bundle JavaScript gửi cho trình duyệt.\
\
```ts\
// Server Component - fine\
const db = process.env.DATABASE_URL\
\
// Client Component - inlined into the JS bundle at build time\
const gaId = process.env.NEXT_PUBLIC_GA_ID\
```\
\
**Rủi ro:** ai đó thấy client đọc `undefined` rồi \\"sửa\\" bằng cách đổi tên thành `NEXT_PUBLIC_STRIPE_SECRET_KEY`. Lúc đó khoá bí mật nằm nguyên trong file JS công khai, mở DevTools là đọc được.\
\
Hai điểm hay bị hỏi thêm: giá trị `NEXT_PUBLIC_` bị **đóng băng lúc build**, đổi biến trên dashboard mà không build lại thì không có tác dụng; và vì nó nằm trong bundle nên đây là nơi chỉ để những giá trị vốn đã công khai (ID analytics, publishable key, base URL).

## Detailed Answer (EN)
$88
