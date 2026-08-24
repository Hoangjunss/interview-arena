---
id: vi-sao-0-1-0-2-0-3-trong-he-thong-co-tien-te-ban-xu-ly-the-nao
position: backend
technology: number
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `0.1 + 0.2 !== 0.3`? Trong hệ thống có tiền tệ bạn xử lý thế nào?

## Question (EN)
Why is `0.1 + 0.2 !== 0.3`? How do you handle money in a real system?

## Đáp án chi tiết (VI)
Số trong JavaScript là **IEEE-754 double** (nhị phân 64-bit). Các phân số như `0.1`, `0.2` không biểu diễn chính xác được ở hệ nhị phân nên bị làm tròn, cộng vào ra `0.30000000000000004`.\
\
```js\
0.1 + 0.2;              // 0.30000000000000004\
0.1 + 0.2 === 0.3;      // false\
Math.abs(0.1 + 0.2 - 0.3) \u003c Number.EPSILON; // true — cách so sánh đúng\
```\
\
**Với tiền tệ, không dùng float.** Ba cách phổ biến:\
- **Lưu số nguyên đơn vị nhỏ nhất**: VND lưu thẳng đồng, USD lưu cents. Mọi phép cộng/trừ chạy trên `Number` nguyên, chỉ chia/định dạng ở tầng hiển thị.\
- **`BigInt`** khi giá trị vượt `Number.MAX_SAFE_INTEGER` (9.007.199.254.740.991).\
- **Thư viện decimal** (`decimal.js`, `dinero.js`) khi cần nhân/chia tỉ lệ, thuế, lãi suất.\
\
Ở tầng DB thì dùng `NUMERIC/DECIMAL`, không dùng `FLOAT`. Định dạng hiển thị bằng `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })` thay vì tự nối chuỗi.

## Detailed Answer (EN)
JavaScript numbers are **IEEE-754 doubles** (64-bit binary). Fractions like `0.1` and `0.2` have no exact binary representation, so they are rounded and the sum comes out as `0.30000000000000004`.\
\
```js\
0.1 + 0.2;              // 0.30000000000000004\
0.1 + 0.2 === 0.3;      // false\
Math.abs(0.1 + 0.2 - 0.3) \u003c Number.EPSILON; // true — the correct comparison\
```\
\
**For money, do not use floats.** Three common approaches:\
- **Store integers in the smallest unit**: VND as plain dong, USD as cents. All addition/subtraction runs on integer `Number`s; division and formatting happen only in the presentation layer.\
- **`BigInt`** when values exceed `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991).\
- **A decimal library** (`decimal.js`, `dinero.js`) when you need proportional multiplication, tax, or interest.\
\
At the database layer use `NUMERIC/DECIMAL`, never `FLOAT`. Format output with `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })` instead of hand-built strings.
