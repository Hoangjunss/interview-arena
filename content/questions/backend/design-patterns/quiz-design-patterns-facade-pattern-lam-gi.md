---
id: quiz-design-patterns-facade-pattern-lam-gi
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Facade pattern làm gì?

## Đáp án trắc nghiệm
- [x] Cho một interface đơn giản trước hệ thống phức tạp
- [ ] Thêm hành vi mới cho đối tượng mà không phải sửa lớp đó
- [ ] Kiểm soát quyền truy cập tới một đối tượng
- [ ] Chuyển đổi interface của một lớp sang interface khác

## Giải thích (VI)
Cung cấp một interface đơn giản cho một hệ thống nhiều bước: checkout(cart) bên trong gọi kiểm tồn kho, tính phí, tạo đơn, gửi mail. Nơi gọi không phải biết thứ tự hay chi tiết từng bước.

### Giải thích các phương án:
- **Cho một interface đơn giản trước hệ thống phức tạp** (Đúng): Nơi gọi không phải biết thứ tự và chi tiết của nhiều thành phần bên dưới.
- **Thêm hành vi mới cho đối tượng mà không phải sửa lớp đó** (Sai): Đó là decorator.
- **Kiểm soát quyền truy cập tới một đối tượng** (Sai): Đó là proxy.
- **Chuyển đổi interface của một lớp sang interface khác** (Sai): Đó là adapter.
