---
id: va-cho-ra-ket-qua-gi-giai-thich-vi-sao
position: backend
technology: coercion
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`[] + {}` và `{} + []` cho ra kết quả gì? Giải thích vì sao.

## Question (EN)
What do `[] + {}` and `{} + []` evaluate to? Explain why.

## Đáp án chi tiết (VI)
Trong **ngữ cảnh biểu thức** (gán vào biến, truyền vào hàm) cả hai đều ra `'[object Object]'`. Chỉ khi gõ trực tiếp `{} + []` ở đầu một dòng lệnh (REPL/console) mới ra `0`.\
\
```js\
const a = [] + {};   // '[object Object]'\
const b = {} + [];   // '[object Object]'\
console.log({} + []); // '[object Object]'\
// nhưng gõ thẳng vào console: {} + []  →  0\
```\
\
**Cơ chế:**\
1. Toán tử `+` khi có ít nhất một toán hạng là object sẽ ép **cả hai về primitive**. `[]` → chuỗi rỗng `''`, `{}` → `'[object Object]'`. Nối chuỗi ra `'[object Object]'`.\
2. Trường hợp `0` không liên quan tới coercion mà là **parsing**: ở vị trí bắt đầu câu lệnh, `{}` bị đọc là một **block rỗng** chứ không phải object literal. Phần còn lại `+[]` là toán tử **cộng một ngôi**, ép mảng rỗng về số → `0`.\
\
Cùng họ gotcha: `[] + []` ra `''`, `[] == false` ra `true`. Bài học thực tế: đừng dựa vào `+` để làm việc với object; muốn ghép chuỗi thì dùng template literal, muốn cộng số thì `Number()` tường minh.

## Detailed Answer (EN)
$82
