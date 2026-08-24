---
id: quiz-terraform-iac-dua-mot-tai-nguyen-tao-tay-truoc-do-vao-quan-ly-cua-terraform-lam-the-nao
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đưa một tài nguyên tạo tay trước đó vào quản lý của Terraform làm thế nào?

## Đáp án trắc nghiệm
- [x] Viết khai báo tương ứng rồi nhập nó vào trạng thái
- [ ] Chạy lệnh áp dụng và Terraform tự nhận tài nguyên có sẵn
- [ ] Xoá tài nguyên cũ rồi để Terraform tạo lại
- [ ] Sửa trực tiếp tệp trạng thái bằng tay

## Giải thích (VI)
Viết khai báo tương ứng trong mã, rồi nhập tài nguyên vào trạng thái bằng định danh thật của nó. Sau đó chạy lập kế hoạch và chỉnh khai báo cho tới khi kế hoạch không còn đề xuất thay đổi nào.

### Giải thích các phương án:
- **Viết khai báo tương ứng rồi nhập nó vào trạng thái** (Đúng): Bước nhập chỉ ghi ánh xạ vào trạng thái, phần khai báo vẫn phải tự viết cho khớp.
- **Chạy lệnh áp dụng và Terraform tự nhận tài nguyên có sẵn** (Sai): Nó sẽ cố tạo mới và thường thất bại vì trùng tên.
- **Xoá tài nguyên cũ rồi để Terraform tạo lại** (Sai): Không chấp nhận được với tài nguyên đang phục vụ.
- **Sửa trực tiếp tệp trạng thái bằng tay** (Sai): Sửa tay tệp trạng thái rất dễ làm hỏng và không được khuyến nghị.
