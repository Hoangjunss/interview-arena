---
id: quiz-elasticsearch-bi-danh-chi-muc-dung-de-lam-gi
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bí danh chỉ mục dùng để làm gì?

## Đáp án trắc nghiệm
- [x] Trỏ tên cố định tới chỉ mục thật
- [ ] Giới hạn quyền truy cập theo từng người dùng
- [ ] Sao lưu chỉ mục sang một cụm khác
- [ ] Nén chỉ mục lại để tiết kiệm dung lượng đĩa

## Giải thích (VI)
Bí danh là một tên cố định trỏ tới chỉ mục thật . Ứng dụng luôn gọi theo bí danh, nên khi cần đổi mapping thì tạo chỉ mục mới, nạp lại dữ liệu rồi chuyển bí danh sang, không có thời gian ngừng dịch vụ.

### Giải thích các phương án:
- **Trỏ tên cố định tới chỉ mục thật** (Đúng): Nhờ đó nạp lại dữ liệu sang chỉ mục mới rồi chuyển bí danh mà ứng dụng không phải sửa gì.
- **Giới hạn quyền truy cập theo từng người dùng** (Sai): Phân quyền là tính năng khác, dù bí danh có thể tham gia.
- **Sao lưu chỉ mục sang một cụm khác** (Sai): Sao lưu là cơ chế chụp ảnh riêng biệt.
- **Nén chỉ mục lại để tiết kiệm dung lượng đĩa** (Sai): Bí danh không liên quan tới lưu trữ.
