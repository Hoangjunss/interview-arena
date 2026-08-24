---
id: vi-sao-0-1-0-2-0-3-nan-la-gi-va-kiem-tra-the-nao
position: backend
technology: js-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `0.1 + 0.2 !== 0.3`? `NaN` là gì và kiểm tra thế nào?

## Question (EN)
Why is `0.1 + 0.2 !== 0.3`? What is `NaN` and how do you check for it?

## Đáp án chi tiết (VI)
**`0.1 + 0.2` → `0.30000000000000004`**: JS chỉ có một kiểu số — **IEEE 754 double (64-bit floating point)**. Các phân số như `0.1`, `0.2` **không biểu diễn chính xác** ở hệ nhị phân (giống `1/3` không hết ở hệ thập phân), nên phép cộng tích lũy sai số nhỏ. Đây là đặc tính của **mọi** ngôn ngữ dùng float, không riêng JS.\
\
Cách so sánh số thực an toàn: kiểm tra sai lệch nhỏ hơn một ngưỡng (epsilon):\
\
```js\
Math.abs(0.1 + 0.2 - 0.3) \u003c Number.EPSILON // true\
```\
\
Với tiền tệ: **tính bằng đơn vị nhỏ nhất** (cent/đồng, số nguyên) hoặc dùng thư viện decimal.\
\
**`NaN`** (Not-a-Number): kết quả của phép toán số không hợp lệ (`0/0`, `parseInt('abc')`, `Math.sqrt(-1)`). Đặc điểm lạ: **`NaN` không bằng chính nó** — `NaN === NaN` → `false`. Vì vậy:\
- Kiểm tra bằng **`Number.isNaN(x)`** (chuẩn, không ép kiểu) — đừng dùng global `isNaN()` cũ vì nó ép kiểu trước (`isNaN('abc')` → `true` gây hiểu nhầm).\
- Hoặc mẹo `x !== x` chỉ đúng khi `x` là `NaN`.

## Detailed Answer (EN)
**`0.1 + 0.2` → `0.30000000000000004`**: JS has a single number type — **IEEE 754 double (64-bit floating point)**. Fractions like `0.1` and `0.2` **cannot be represented exactly** in binary (much like `1/3` never terminates in decimal), so the addition accumulates a tiny rounding error. This affects **every** language using floats, not just JS.\
\
To compare floats safely, check the difference against a small threshold (epsilon):\
\
```js\
Math.abs(0.1 + 0.2 - 0.3) \u003c Number.EPSILON // true\
```\
\
For money: **compute in the smallest unit** (cents, as integers) or use a decimal library.\
\
**`NaN`** (Not-a-Number): the result of an invalid numeric operation (`0/0`, `parseInt('abc')`, `Math.sqrt(-1)`). Its oddity: **`NaN` does not equal itself** — `NaN === NaN` → `false`. So:\
- Check with **`Number.isNaN(x)`** (standard, no coercion) — avoid the old global `isNaN()`, which coerces first (`isNaN('abc')` → `true`, misleading).\
- Or the trick `x !== x`, true only when `x` is `NaN`.
