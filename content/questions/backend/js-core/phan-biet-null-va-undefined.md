---
id: phan-biet-null-va-undefined
position: backend
technology: js-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `null` và `undefined`?

## Question (EN)
What is the difference between `null` and `undefined`?

## Đáp án chi tiết (VI)
Cả hai đều biểu thị \\"không có giá trị\\" nhưng khác nhau về ý nghĩa và nguồn gốc:\
\
- **`undefined`**: biến đã khai báo nhưng **chưa gán**, tham số hàm thiếu, property không tồn tại, hàm không `return` — do **engine tự đặt**. Đây là \\"chưa có gì\\".\
- **`null`**: **lập trình viên chủ động gán** để nói \\"cố ý rỗng, chưa có object\\". Đây là \\"cố tình không có gì\\".\
\
Khác biệt hay bị hỏi:\
- `typeof undefined` → `'undefined'`, còn `typeof null` → `'object'` (một lỗi lịch sử của JS, vẫn giữ để tương thích).\
- `null == undefined` → `true` (loose), nhưng `null === undefined` → `false` (strict).\
- Cả hai đều **falsy**.\
\
Thực hành: dùng `undefined` cho \\"chưa khởi tạo\\" (để engine lo), dùng `null` khi muốn **cố ý** đánh dấu một biến/field là rỗng.

## Detailed Answer (EN)
Both represent \\"no value\\" but differ in meaning and origin:\
\
- **`undefined`**: a declared-but-**unassigned** variable, a missing function argument, a non-existent property, or a function with no `return` — set **by the engine**. It means \\"nothing yet\\".\
- **`null`**: **explicitly assigned by the programmer** to say \\"intentionally empty, no object yet\\". It means \\"deliberately nothing\\".\
\
Commonly-asked distinctions:\
- `typeof undefined` → `'undefined'`, but `typeof null` → `'object'` (a historical JS bug, kept for compatibility).\
- `null == undefined` → `true` (loose), but `null === undefined` → `false` (strict).\
- Both are **falsy**.\
\
In practice: use `undefined` for \\"not initialized\\" (let the engine set it), and `null` when you want to **intentionally** mark a variable/field as empty.
