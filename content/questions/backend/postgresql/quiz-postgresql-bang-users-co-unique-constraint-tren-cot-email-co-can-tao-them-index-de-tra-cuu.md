---
id: quiz-postgresql-bang-users-co-unique-constraint-tren-cot-email-co-can-tao-them-index-de-tra-cuu
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bảng users có UNIQUE constraint trên cột email. Có cần tạo thêm index để tra cứu nhanh theo email không?

## Đáp án trắc nghiệm
- [ ] Có — nhưng chỉ khi bảng vượt quá một triệu dòng
- [ ] Có — constraint chỉ kiểm tra trùng lặp, muốn tra nhanh phải tạo index riêng
- [ ] Tuỳ — chỉ cần thêm nếu truy vấn dùng dấu = thay vì IN
- [x] Không — UNIQUE constraint tự tạo unique index, dùng được cho tra cứu

## Giải thích (VI)
Không cần. PostgreSQL thi hành UNIQUE constraint bằng cách tự tạo một B-tree unique index trên cột đó — và index này phục vụ tra cứu WHERE email = ... như mọi index thường. Tạo thêm index trên cùng cột chỉ tốn gấp đôi chi phí ghi và đĩa mà không nhanh thêm chút nào.

### Giải thích các phương án:
- **Có — nhưng chỉ khi bảng vượt quá một triệu dòng** (Sai): Kích thước bảng không thay đổi thực tế là index đã tồn tại sẵn.
- **Có — constraint chỉ kiểm tra trùng lặp, muốn tra nhanh phải tạo index riêng** (Sai): Chính unique index sinh ra từ constraint là thứ phục vụ luôn việc tra cứu.
- **Tuỳ — chỉ cần thêm nếu truy vấn dùng dấu = thay vì IN** (Sai): Cả = lẫn IN đều dùng được unique index sẵn có, không cần phân biệt.
- **Không — UNIQUE constraint tự tạo unique index, dùng được cho tra cứu** (Đúng): PostgreSQL thi hành constraint bằng chính một B-tree unique index.
