---
id: su-khac-biet-giua-var-let-va-const-la-gi
position: backend
technology: kiểu-dữ-liệu-\u0026-biến
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa var, let và const là gì?

## Question (EN)
What is the difference between var, let, and const?

## Đáp án chi tiết (VI)
Hiểu nhanh:\
- `var`: function scope, có thể khai báo lại, dùng trước khi khai báo sẽ ra `undefined`.\
- `let`: block scope (`if`, `for`, `{}`), cho phép gán lại.\
- `const`: block scope, không cho gán lại biến.\
\
Ví dụ:\
```javascript\
const user = { name: \\"An\\" };\
user.name = \\"Binh\\"; // Hợp lệ\
```\
Bạn vẫn sửa được `user.name` vì bạn đang thay đổi thuộc tính bên trong object, không phải gán lại biến `user` bằng một object khác.\
\
Khác biệt scope thấy rõ ở vòng lặp: `for (var i = 0; i \u003c 3; i++) {}` — sau vòng lặp `i` vẫn tồn tại (giá trị 3, vì function scope); với `let j` thì `j` không tồn tại bên ngoài block.\
\
**Lời khuyên:** Mặc định dùng `const`, khi cần đổi giá trị thì dùng `let`, hạn chế tối đa sử dụng `var`.

## Detailed Answer (EN)
Quick summary:\
- `var`: function-scoped, can be re-declared, and reading before declaration gives `undefined`.\
- `let`: block-scoped (`if`, `for`, `{}`), can be reassigned.\
- `const`: block-scoped, cannot be reassigned.\
\
Example:\
`const user = { name: \\"An\\" }` can still do `user.name = \\"Binh\\"` because you are changing a property, not reassigning `user`.\
\
The scope difference shows clearly in loops: after `for (var i = 0; i \u003c 3; i++) {}`, `i` still exists (value 3, function scope); with `let j`, `j` does not exist outside the block.\
\
For beginners: default to `const`, use `let` only when value must change, avoid `var`.
