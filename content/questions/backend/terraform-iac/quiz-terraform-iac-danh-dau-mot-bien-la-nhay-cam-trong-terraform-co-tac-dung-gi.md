---
id: quiz-terraform-iac-danh-dau-mot-bien-la-nhay-cam-trong-terraform-co-tac-dung-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh dấu một biến là nhạy cảm trong Terraform có tác dụng gì?

## Đáp án trắc nghiệm
- [ ] Yêu cầu xác thực thêm khi áp dụng thay đổi
- [ ] Ngăn không cho giá trị được lưu vào trạng thái
- [ ] Mã hoá giá trị đó trong tệp trạng thái
- [x] Che giá trị hiển thị, không mã hoá trạng thái

## Giải thích (VI)
Nó chỉ che giá trị trong kết quả hiển thị và nhật ký , không mã hoá gì. Giá trị vẫn nằm nguyên trong tệp trạng thái, nên bảo vệ thật sự phải đến từ việc mã hoá và giới hạn quyền truy cập nơi lưu trạng thái.

### Giải thích các phương án:
- **Yêu cầu xác thực thêm khi áp dụng thay đổi** (Sai): Không có bước xác thực bổ sung nào.
- **Ngăn không cho giá trị được lưu vào trạng thái** (Sai): Giá trị vẫn được lưu như mọi thuộc tính khác.
- **Mã hoá giá trị đó trong tệp trạng thái** (Sai): Không có mã hoá riêng cho từng giá trị.
- **Che giá trị hiển thị, không mã hoá trạng thái** (Đúng): Giá trị vẫn nằm nguyên trong tệp trạng thái nên bảo vệ thật phải nằm ở nơi lưu trạng thái.
