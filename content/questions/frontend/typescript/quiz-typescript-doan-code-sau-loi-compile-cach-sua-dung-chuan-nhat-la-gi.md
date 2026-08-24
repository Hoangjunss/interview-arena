---
id: quiz-typescript-doan-code-sau-loi-compile-cach-sua-dung-chuan-nhat-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau lỗi compile. Cách sửa đúng chuẩn nhất là gì?

## Đáp án trắc nghiệm
- [x] Thêm generic constraint: function getLength<T extends { length: number }>(arg: T)
- [ ] Generic không thể truy cập property — bắt buộc viết overload riêng cho từng kiểu
- [ ] Ép kiểu bên trong hàm: return (arg as string).length
- [ ] Đổi kiểu tham số thành any: function getLength(arg: any)

## Giải thích (VI)
Không có constraint, T có thể là bất kỳ kiểu nào nên compiler không cho truy cập .length. Cách sửa chuẩn là thêm constraint T extends { length: number } — mọi argument phải có length kiểu number, hàm vẫn generic và type-safe với string, array, hay object bất kỳ có length.

### Giải thích các phương án:
- **Thêm generic constraint: function getLength<T extends { length: number }>(arg: T)** (Đúng): Constraint extends bảo đảm mọi T truyền vào đều có length: number, nên truy cập .length hợp lệ mà vẫn giữ type của T.
- **Generic không thể truy cập property — bắt buộc viết overload riêng cho từng kiểu** (Sai): Không cần overload; constraint chính là cơ chế được thiết kế cho tình huống này.
- **Ép kiểu bên trong hàm: return (arg as string).length** (Sai): Assertion nói dối compiler: T có thể là kiểu không có length, lỗi bị đẩy xuống runtime thay vì bắt tại compile time.
- **Đổi kiểu tham số thành any: function getLength(arg: any)** (Sai): Compile được nhưng mất toàn bộ an toàn kiểu — caller truyền number (không có length) cũng lọt.
