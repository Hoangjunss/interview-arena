---
id: quiz-elasticsearch-can-doi-kieu-cua-mot-truong-trong-chi-muc-dang-chay-cach-xu-ly-dung
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần đổi kiểu của một trường trong chỉ mục đang chạy. Cách xử lý đúng?

## Đáp án trắc nghiệm
- [ ] Ghi đè toàn bộ tài liệu với giá trị kiểu mới
- [ ] Gọi API cập nhật mapping với kiểu mới
- [ ] Xoá trường đó rồi thêm lại với kiểu mong muốn
- [x] Tạo chỉ mục mới, nạp lại dữ liệu rồi chuyển bí danh

## Giải thích (VI)
Phải tạo chỉ mục mới với mapping đúng, nạp lại dữ liệu, rồi chuyển bí danh . Kiểu của trường đã tồn tại không sửa tại chỗ được vì dữ liệu trong chỉ mục đã được ghi và mã hoá theo kiểu cũ.

### Giải thích các phương án:
- **Ghi đè toàn bộ tài liệu với giá trị kiểu mới** (Sai): Mapping vẫn giữ kiểu cũ nên việc ghi sẽ lỗi hoặc bị ép kiểu.
- **Gọi API cập nhật mapping với kiểu mới** (Sai): API này chỉ thêm được trường mới chứ không đổi kiểu trường đã có.
- **Xoá trường đó rồi thêm lại với kiểu mong muốn** (Sai): Không có thao tác xoá trường khỏi mapping.
- **Tạo chỉ mục mới, nạp lại dữ liệu rồi chuyển bí danh** (Đúng): Kiểu của trường đã có không sửa được tại chỗ vì dữ liệu trong chỉ mục đã được ghi theo kiểu cũ.
