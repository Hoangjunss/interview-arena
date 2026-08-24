---
id: quiz-terraform-iac-khi-nao-can-khai-bao-phu-thuoc-tuong-minh-gia-hai-tai-nguyen
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào cần khai báo phụ thuộc tường minh giữa hai tài nguyên?

## Đáp án trắc nghiệm
- [ ] Khi muốn hai tài nguyên được tạo song song
- [ ] Khi tài nguyên được tạo bằng vòng lặp
- [x] Khi có phụ thuộc thật nhưng không tham chiếu
- [ ] Khi hai tài nguyên thuộc cùng một module

## Giải thích (VI)
Khi có phụ thuộc thật nhưng không thể hiện qua tham chiếu thuộc tính , ví dụ một chính sách quyền phải tồn tại trước khi dịch vụ khởi động dù mã không tham chiếu tới nó. Có tham chiếu thì Terraform tự suy ra thứ tự.

### Giải thích các phương án:
- **Khi muốn hai tài nguyên được tạo song song** (Sai): Song song là mặc định khi không có phụ thuộc.
- **Khi tài nguyên được tạo bằng vòng lặp** (Sai): Vòng lặp không liên quan tới thứ tự giữa các tài nguyên khác nhau.
- **Khi có phụ thuộc thật nhưng không tham chiếu** (Đúng): Terraform suy ra thứ tự từ tham chiếu, nên phụ thuộc ngầm ở phía dịch vụ phải nói rõ.
- **Khi hai tài nguyên thuộc cùng một module** (Sai): Cùng mô đun không tạo ra phụ thuộc nào.
