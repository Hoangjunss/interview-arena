---
id: quiz-terraform-iac-buoc-lap-ke-hoach-trong-terraform-lam-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bước lập kế hoạch trong Terraform làm gì?

## Đáp án trắc nghiệm
- [ ] Kiểm tra cú pháp của tệp cấu hình
- [x] So sánh mã với trạng thái thật và liệt kê thay đổi
- [ ] Tạo tài nguyên nhưng chưa kích hoạt chúng
- [ ] Tải về các thành phần mở rộng cần thiết

## Giải thích (VI)
Bước lập kế hoạch so sánh mã với trạng thái thật rồi liệt kê những gì sẽ tạo, sửa hoặc xoá . Đây là bước rà soát bắt buộc, vì nó cho thấy trước hậu quả trước khi bất kỳ thay đổi nào được thực hiện.

### Giải thích các phương án:
- **Kiểm tra cú pháp của tệp cấu hình** (Sai): Kiểm tra cú pháp là lệnh riêng và chạy nhanh hơn nhiều.
- **So sánh mã với trạng thái thật và liệt kê thay đổi** (Đúng): Nhờ đó biết trước tài nguyên nào bị tạo, sửa hay xoá trước khi thực sự áp dụng.
- **Tạo tài nguyên nhưng chưa kích hoạt chúng** (Sai): Bước này không tạo ra tài nguyên nào.
- **Tải về các thành phần mở rộng cần thiết** (Sai): Việc tải diễn ra ở bước khởi tạo.
