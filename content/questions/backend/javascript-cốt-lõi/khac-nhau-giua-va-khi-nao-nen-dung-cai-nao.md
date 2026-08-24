---
id: khac-nhau-giua-va-khi-nao-nen-dung-cai-nao
position: backend
technology: javascript-cốt-lõi
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác nhau giữa `==` và `===`? Khi nào nên dùng cái nào?

## Question (EN)
Difference between `==` and `===`? Which should you use?

## Đáp án chi tiết (VI)
- **`===`** (strict): so sánh **cả kiểu và giá trị**, không ép kiểu. `1 === '1'` → `false`.\
- **`==`** (loose): **ép kiểu** hai vế về cùng dạng rồi mới so sánh, dẫn tới nhiều kết quả khó đoán.\
\
Vài ca `==` gây bất ngờ:\
- `0 == ''` → `true`\
- `0 == false` → `true`\
- `null == undefined` → `true` (nhưng `null === undefined` → `false`)\
- `NaN == NaN` → `false` (dùng `Number.isNaN`)\
\
**Khuyến nghị**: luôn dùng `===` để tránh lỗi ép kiểu ngầm. Ngoại lệ tiện dụng duy nhất: `x == null` để kiểm tra \\"null hoặc undefined\\" trong một lần.\
\
Ghi chú: `Object.is` giống `===` nhưng xử lý `NaN` và `-0` chính xác hơn.

## Detailed Answer (EN)
- **`===`** (strict): compares **both type and value**, no coercion. `1 === '1'` → `false`.\
- **`==`** (loose): **coerces** the two sides to a common type before comparing, producing many surprising results.\
\
Surprising `==` cases:\
- `0 == ''` → `true`\
- `0 == false` → `true`\
- `null == undefined` → `true` (but `null === undefined` → `false`)\
- `NaN == NaN` → `false` (use `Number.isNaN`)\
\
**Recommendation**: always use `===` to avoid implicit coercion bugs. The one handy exception: `x == null` to test \\"null or undefined\\" in one check.\
\
Note: `Object.is` is like `===` but handles `NaN` and `-0` more precisely.
