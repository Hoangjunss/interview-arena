---
id: quiz-terraform-iac-provider-trong-terraform-dam-nhiem-viec-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Provider trong Terraform đảm nhiệm việc gì?

## Đáp án trắc nghiệm
- [x] Dịch khai báo thành lời gọi API dịch vụ
- [ ] Lưu trữ tệp trạng thái ở nơi tập trung
- [ ] Quản lý thông tin đăng nhập của người dùng
- [ ] Tính toán chi phí của hạ tầng trước khi tạo

## Giải thích (VI)
Provider dịch khai báo tài nguyên thành lời gọi API của dịch vụ tương ứng. Nhờ vậy cùng một cú pháp dùng được cho nhiều nền tảng, và mỗi provider có phiên bản riêng cần được ghim.

### Giải thích các phương án:
- **Dịch khai báo thành lời gọi API dịch vụ** (Đúng): Nhờ có provider mà cùng một cú pháp khai báo dùng được cho nhiều nền tảng khác nhau.
- **Lưu trữ tệp trạng thái ở nơi tập trung** (Sai): Lưu trạng thái là vai trò của phần cấu hình kho lưu trữ.
- **Quản lý thông tin đăng nhập của người dùng** (Sai): Nó dùng thông tin đăng nhập chứ không quản lý chúng.
- **Tính toán chi phí của hạ tầng trước khi tạo** (Sai): Ước tính chi phí là công cụ riêng.
