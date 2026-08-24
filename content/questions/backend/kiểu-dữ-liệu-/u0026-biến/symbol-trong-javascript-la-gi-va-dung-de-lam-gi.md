---
id: symbol-trong-javascript-la-gi-va-dung-de-lam-gi
position: backend
technology: kiểu-dữ-liệu-\u0026-biến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Symbol trong JavaScript là gì và dùng để làm gì?

## Question (EN)
What is Symbol in JavaScript and what is it used for?

## Đáp án chi tiết (VI)
`Symbol` là kiểu dữ liệu nguyên thủy tạo ra một giá trị duy nhất (unique). Mỗi lần gọi `Symbol()` sẽ tạo ra một giá trị hoàn toàn khác biệt, ngay cả khi có cùng mô tả (description).\
\
```javascript\
const sym1 = Symbol(\\"foo\\");\
const sym2 = Symbol(\\"foo\\");\
console.log(sym1 === sym2); // false\
```\
\
**Ứng dụng chính:**\
- **Tránh xung đột tên thuộc tính:** Thường dùng làm key cho object property để đảm bảo không bị ghi đè bởi các thư viện khác.\
- **Well-known symbols:** Tùy biến hành vi mặc định của JS. Ví dụ: `Symbol.iterator` (định nghĩa object có thể lặp), `Symbol.toPrimitive` (tùy biến ép kiểu), `Symbol.hasInstance`.\
\
*Lưu ý:* `Symbol.for(key)` tạo ra một global shared symbol. Khi đó `Symbol.for(\\"foo\\") === Symbol.for(\\"foo\\")` sẽ trả về `true`.

## Detailed Answer (EN)
Symbol is a primitive data type that creates a unique value. Each Symbol() call produces a value that never equals another, even with the same description. Commonly used as object property keys to avoid name collisions. \
\
Important well-known symbols: `Symbol.iterator` (defines iterability), `Symbol.toPrimitive` (customizes type coercion), `Symbol.hasInstance` (customizes instanceof). `Symbol.for(key)` creates a globally shared symbol — `Symbol.for('foo') === Symbol.for('foo')` is true, unlike `Symbol('foo') !== Symbol('foo')`.
