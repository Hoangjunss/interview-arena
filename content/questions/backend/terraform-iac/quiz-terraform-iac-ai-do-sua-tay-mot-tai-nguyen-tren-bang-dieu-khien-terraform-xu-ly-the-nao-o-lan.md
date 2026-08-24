---
id: quiz-terraform-iac-ai-do-sua-tay-mot-tai-nguyen-tren-bang-dieu-khien-terraform-xu-ly-the-nao-o-lan
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ai đó sửa tay một tài nguyên trên bảng điều khiển. Terraform xử lý thế nào ở lần chạy sau?

## Đáp án trắc nghiệm
- [ ] Báo lỗi và từ chối chạy cho tới khi được sửa tay lại
- [ ] Bỏ qua vì thay đổi không do Terraform thực hiện
- [x] Phát hiện lệch và đề xuất đưa về đúng như trong mã
- [ ] Cập nhật mã cho khớp với thay đổi vừa làm tay

## Giải thích (VI)
Terraform phát hiện lệch và đề xuất đưa tài nguyên về đúng như mã mô tả . Mã là nguồn sự thật, nên thay đổi làm tay sẽ bị ghi đè ở lần áp dụng kế tiếp nếu không được đưa vào mã.

### Giải thích các phương án:
- **Báo lỗi và từ chối chạy cho tới khi được sửa tay lại** (Sai): Nó đề xuất thay đổi chứ không từ chối chạy.
- **Bỏ qua vì thay đổi không do Terraform thực hiện** (Sai): Nó vẫn quản lý tài nguyên đó nên chênh lệch được phát hiện.
- **Phát hiện lệch và đề xuất đưa về đúng như trong mã** (Đúng): Bước làm mới trạng thái đọc lại thực tế nên chênh lệch với cấu hình hiện ra trong kế hoạch.
- **Cập nhật mã cho khớp với thay đổi vừa làm tay** (Sai): Terraform không bao giờ tự sửa mã của người dùng.
