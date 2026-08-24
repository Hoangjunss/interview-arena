---
id: await-res-json-tra-ve-kieu-gi-viet-const-user-await-res-json-as-user-co-an-toan
position: backend
technology: api-typing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`await res.json()` trả về kiểu gì? Viết `const user = await res.json() as User` có an toàn không?

## Question (EN)
What type does `await res.json()` return? Is `const user = await res.json() as User` safe?

## Đáp án chi tiết (VI)
`res.json()` trả về `Promise\u003cany\u003e`, và `as User` **không kiểm tra gì ở runtime** — nó chỉ nói với compiler \\"cứ tin tôi\\". Nếu backend đổi field hoặc trả về lỗi, code vẫn biên dịch sạch rồi hỏng ở nơi khác, xa điểm gây lỗi.\
\
```ts\
const user = await res.json() as User\
console.log(user.profile.name)   // biên dịch OK, runtime có thể TypeError\
```\
\
**Ba mức xử lý, tăng dần độ chắc chắn:**\
\
1. Nhận về `unknown` thay vì `any` để compiler bắt buộc bạn kiểm tra trước khi dùng.\
2. Viết **type guard** cho các field thực sự đọc tới:\
\
```ts\
function isUser(v: unknown): v is User {\
  return typeof v === 'object' \u0026\u0026 v !== null \u0026\u0026 'id' in v\
}\
```\
\
3. Dùng schema validation (Zod, Valibot) khi payload phức tạp — parse một lần ở ranh giới mạng, phần còn lại của ứng dụng nhận kiểu đã được bảo đảm.\
\
**Điểm chốt cần nói khi phỏng vấn:** TypeScript chỉ tồn tại lúc biên dịch. Dữ liệu đi qua ranh giới hệ thống (HTTP, `localStorage`, `postMessage`) phải được **kiểm tra ở runtime**, `as` không thay thế được việc đó.

## Detailed Answer (EN)
$87
