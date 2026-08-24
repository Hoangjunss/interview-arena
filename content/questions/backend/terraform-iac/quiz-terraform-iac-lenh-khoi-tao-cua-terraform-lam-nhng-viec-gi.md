---
id: quiz-terraform-iac-lenh-khoi-tao-cua-terraform-lam-nhng-viec-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lệnh khởi tạo của Terraform làm những việc gì?

## Đáp án trắc nghiệm
- [ ] Sinh tài liệu mô tả các tài nguyên trong cấu hình
- [ ] Kiểm tra quyền truy cập vào nhà cung cấp đám mây
- [ ] Tạo tệp trạng thái rỗng cho hạ tầng mới
- [x] Tải nhà cung cấp, module và store trạng thái

## Giải thích (VI)
Nó tải nhà cung cấp và module về thư mục làm việc, rồi cấu hình nơi lưu trạng thái . Phải chạy lại mỗi khi thêm nhà cung cấp mới, thêm module, hoặc đổi cấu hình kho lưu trạng thái.

### Giải thích các phương án:
- **Sinh tài liệu mô tả các tài nguyên trong cấu hình** (Sai): Sinh tài liệu là công cụ riêng bên ngoài.
- **Kiểm tra quyền truy cập vào nhà cung cấp đám mây** (Sai): Quyền được kiểm tra khi thực sự gọi API.
- **Tạo tệp trạng thái rỗng cho hạ tầng mới** (Sai): Trạng thái được tạo khi áp dụng lần đầu chứ không phải lúc khởi tạo.
- **Tải nhà cung cấp, module và store trạng thái** (Đúng): Đây là bước chuẩn bị bắt buộc trước khi lập kế hoạch hay áp dụng thay đổi.
