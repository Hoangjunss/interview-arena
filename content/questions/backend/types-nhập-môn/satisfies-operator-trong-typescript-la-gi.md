---
id: satisfies-operator-trong-typescript-la-gi
position: backend
technology: types-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
satisfies operator trong TypeScript là gì?

## Question (EN)
What is the satisfies operator in TypeScript?

## Đáp án chi tiết (VI)
satisfies (TS 4.9) kiểm tra type mà không mở rộng type declaration. Khác as: satisfies vẫn infer type cụ thể nhất có thể và báo lỗi nếu không match. \
\
**Ví dụ:** const config = {...} satisfies Config - TS check config đúng Config nhưng giữ literal types của values.

## Detailed Answer (EN)
satisfies (TS 4.9) validates a type without widening the type declaration. Unlike as: satisfies still infers the most specific type possible and reports an error if it does not match. \
\
**Example:** `const config = {...} satisfies Config` — TS checks config is a valid Config but preserves the literal types of values.
