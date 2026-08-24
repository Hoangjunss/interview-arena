---
id: quiz-ruby-on-rails-model-qua-lon-voi-hang-nghin-dong-nen-duoc-xu-ly-the-nao
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Model quá lớn với hàng nghìn dòng nên được xử lý thế nào?

## Đáp án trắc nghiệm
- [x] Tách logic nghiệp vụ ra lớp riêng
- [ ] Chuyển bớt logic sang controller tương ứng
- [ ] Chia model thành nhiều bảng nhỏ hơn
- [ ] Đưa toàn bộ vào các module trộn vào model

## Giải thích (VI)
Tách các luồng nghiệp vụ thành lớp riêng có trách nhiệm rõ ràng , ví dụ một lớp lo việc đăng ký, một lớp lo việc huỷ đơn. Trộn module vào model chỉ chia nhỏ tệp chứ không giảm trách nhiệm của đối tượng.

### Giải thích các phương án:
- **Tách logic nghiệp vụ ra lớp riêng** (Đúng): Mỗi luồng nghiệp vụ thành một lớp riêng nên đọc và kiểm thử dễ hơn hẳn.
- **Chuyển bớt logic sang controller tương ứng** (Sai): Chỉ dời vấn đề sang chỗ khác và làm bộ điều khiển phình to.
- **Chia model thành nhiều bảng nhỏ hơn** (Sai): Đổi lược đồ vì lý do tổ chức mã là quyết định sai hướng.
- **Đưa toàn bộ vào các module trộn vào model** (Sai): Mã vẫn nằm trong cùng một đối tượng, chỉ là nằm ở tệp khác.
