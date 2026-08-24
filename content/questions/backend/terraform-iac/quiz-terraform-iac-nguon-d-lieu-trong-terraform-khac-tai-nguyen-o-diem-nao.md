---
id: quiz-terraform-iac-nguon-d-lieu-trong-terraform-khac-tai-nguyen-o-diem-nao
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguồn dữ liệu trong Terraform khác tài nguyên ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Nguồn dữ liệu tạo tài nguyên nhưng không quản lý vòng đời
- [x] Nguồn dữ liệu chỉ đọc, không tạo hay sửa gì
- [ ] Nguồn dữ liệu không được ghi vào tệp trạng thái
- [ ] Nguồn dữ liệu chỉ dùng được với nhà cung cấp đám mây lớn

## Giải thích (VI)
Nguồn dữ liệu chỉ đọc thông tin về thứ đã tồn tại , không tạo và không sửa. Nó dùng để tham chiếu tài nguyên do đội khác hoặc cấu hình khác quản lý, ví dụ mạng dùng chung hay ảnh máy ảo mới nhất.

### Giải thích các phương án:
- **Nguồn dữ liệu tạo tài nguyên nhưng không quản lý vòng đời** (Sai): Nó không tạo ra gì cả.
- **Nguồn dữ liệu chỉ đọc, không tạo hay sửa gì** (Đúng): Nó dùng để tham chiếu thứ đã tồn tại, ví dụ mạng do đội khác quản lý.
- **Nguồn dữ liệu không được ghi vào tệp trạng thái** (Sai): Kết quả đọc vẫn được lưu trong trạng thái.
- **Nguồn dữ liệu chỉ dùng được với nhà cung cấp đám mây lớn** (Sai): Hầu hết nhà cung cấp đều có nguồn dữ liệu.
