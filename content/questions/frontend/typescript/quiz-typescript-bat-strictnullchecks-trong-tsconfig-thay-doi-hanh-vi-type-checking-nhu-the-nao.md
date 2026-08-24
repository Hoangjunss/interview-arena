---
id: quiz-typescript-bat-strictnullchecks-trong-tsconfig-thay-doi-hanh-vi-type-checking-nhu-the-nao
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bật strictNullChecks trong tsconfig thay đổi hành vi type checking như thế nào?

## Đáp án trắc nghiệm
- [ ] Chỉ ảnh hưởng các biến khai báo kiểu any
- [ ] Mọi biến tự động trở thành non-null, không cần kiểm tra null nữa
- [ ] Compiler tự chèn kiểm tra null vào code JavaScript sinh ra
- [x] null và undefined không còn gán được vào các kiểu khác

## Giải thích (VI)
Khi bật strictNullChecks, null và undefined trở thành kiểu riêng, không gán được vào kiểu khác. Muốn giá trị có thể null phải khai báo union (string | null) và narrow trước khi dùng — compiler báo lỗi ngay tại chỗ có khả năng null thay vì để lỗi "cannot read property of undefined" xảy ra ở runtime.

### Giải thích các phương án:
- **Chỉ ảnh hưởng các biến khai báo kiểu any** (Sai): any vẫn nằm ngoài kiểm tra; flag ảnh hưởng mọi kiểu thường (string, number, object...).
- **Mọi biến tự động trở thành non-null, không cần kiểm tra null nữa** (Sai): Ngược lại: flag buộc kiểm tra nhiều hơn — biến có thể null phải được narrow (if check, optional chaining) trước khi dùng.
- **Compiler tự chèn kiểm tra null vào code JavaScript sinh ra** (Sai): TypeScript không chèn code kiểm tra runtime — mọi kiểm tra chỉ diễn ra lúc compile.
- **null và undefined không còn gán được vào các kiểu khác** (Đúng): Muốn cho phép phải khai báo tường minh (string | null) và narrow trước khi dùng. Khi tắt flag, null/undefined gán vào mọi kiểu; khi bật, chúng thành kiểu riêng biệt và compiler bắt xử lý mọi nhánh có thể null.
