---
id: quiz-terraform-iac-module-trong-terraform-giai-quyet-van-de-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module trong Terraform giải quyết vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Tách quyền truy cập giữa các đội khác nhau
- [ ] Cho phép chạy song song các phần hạ tầng
- [x] Đóng gói một nhóm tài nguyên để dùng lại nhiều nơi
- [ ] Chia trạng thái thành nhiều tệp nhỏ hơn

## Giải thích (VI)
Module đóng gói một nhóm tài nguyên kèm biến vào và giá trị ra để dùng lại. Cần lưu ý: module trong cùng một cấu hình vẫn dùng chung một trạng thái, nên nó không tách được phạm vi ảnh hưởng.

### Giải thích các phương án:
- **Tách quyền truy cập giữa các đội khác nhau** (Sai): Tách quyền cần tách cấu hình và trạng thái riêng.
- **Cho phép chạy song song các phần hạ tầng** (Sai): Song song do đồ thị phụ thuộc quyết định, không do mô đun.
- **Đóng gói một nhóm tài nguyên để dùng lại nhiều nơi** (Đúng): Nhờ đó cùng một khuôn mẫu hạ tầng được áp cho nhiều môi trường mà không chép mã.
- **Chia trạng thái thành nhiều tệp nhỏ hơn** (Sai): Mô đun trong cùng một cấu hình vẫn dùng chung một trạng thái.
