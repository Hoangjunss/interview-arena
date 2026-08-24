---
id: hoisting-la-gi-khac-biet-giua-var-let-const-va-scope
position: backend
technology: javascript-cốt-lõi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hoisting là gì? Khác biệt giữa `var`, `let`, `const` và scope?

## Question (EN)
What is hoisting? How do `var`, `let`, and `const` differ in scope?

## Đáp án chi tiết (VI)
**Hoisting**: khai báo được \\"nâng\\" lên đầu scope lúc biên dịch. Nhưng cách khởi tạo khác nhau:\
\
| | `var` | `let` / `const` |\
|---|---|---|\
| Scope | function | **block** `{}` |\
| Hoist | có, khởi tạo `undefined` | có, nhưng **TDZ** |\
| Truy cập trước khai báo | `undefined` | **ReferenceError** |\
| Gán lại | được | `let` được, `const` **không** |\
| Redeclare cùng scope | được | không |\
\
- **TDZ (Temporal Dead Zone)**: vùng từ đầu block tới dòng khai báo `let/const` — truy cập ở đây ném `ReferenceError`.\
- **`const`** khóa việc **gán lại binding**, không \\"đóng băng\\" object — vẫn sửa được property (muốn bất biến thật thì `Object.freeze`).\
- **Function declaration** được hoist cả thân hàm; **function expression** thì không.\
\
Thực hành: mặc định dùng `const`, cần gán lại thì `let`, tránh `var`.

## Detailed Answer (EN)
**Hoisting**: declarations are moved to the top of their scope at compile time — but initialization differs:\
\
| | `var` | `let` / `const` |\
|---|---|---|\
| Scope | function | **block** `{}` |\
| Hoisted | yes, initialized to `undefined` | yes, but **TDZ** |\
| Access before declaration | `undefined` | **ReferenceError** |\
| Reassign | allowed | `let` yes, `const` **no** |\
| Redeclare in same scope | allowed | not allowed |\
\
- **TDZ (Temporal Dead Zone)**: the span from the block start to the `let/const` declaration — accessing there throws.\
- **`const`** locks the **binding reassignment**, it does not freeze the object — you can still mutate properties (use `Object.freeze` for real immutability).\
- **Function declarations** are hoisted with their body; **function expressions** are not.\
\
Rule of thumb: default to `const`, use `let` when reassigning, avoid `var`.
