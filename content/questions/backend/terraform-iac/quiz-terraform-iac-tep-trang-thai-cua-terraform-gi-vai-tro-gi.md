---
id: quiz-terraform-iac-tep-trang-thai-cua-terraform-gi-vai-tro-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tệp trạng thái của Terraform giữ vai trò gì?

## Đáp án trắc nghiệm
- [ ] Lưu lịch sử mọi lần thay đổi hạ tầng
- [ ] Lưu bản sao lưu của hạ tầng để khôi phục
- [ ] Chứa thông tin đăng nhập vào nhà cung cấp đám mây
- [x] Ánh xạ tài nguyên trong mã tới tài nguyên thật

## Giải thích (VI)
Tệp trạng thái ánh xạ tài nguyên khai báo trong mã tới tài nguyên thật trên nhà cung cấp. Không có nó, Terraform không biết thứ gì đã được tạo và sẽ tạo trùng thay vì cập nhật.

### Giải thích các phương án:
- **Lưu lịch sử mọi lần thay đổi hạ tầng** (Sai): Lịch sử nằm ở hệ thống quản lý mã, tệp trạng thái chỉ giữ trạng thái hiện tại.
- **Lưu bản sao lưu của hạ tầng để khôi phục** (Sai): Nó không chứa dữ liệu để khôi phục dịch vụ, chỉ chứa thông tin ánh xạ.
- **Chứa thông tin đăng nhập vào nhà cung cấp đám mây** (Sai): Thông tin đăng nhập được cấu hình riêng, không nằm trong tệp này.
- **Ánh xạ tài nguyên trong mã tới tài nguyên thật** (Đúng): Không có ánh xạ này thì Terraform không biết tài nguyên nào đã tạo và sẽ tạo trùng.
