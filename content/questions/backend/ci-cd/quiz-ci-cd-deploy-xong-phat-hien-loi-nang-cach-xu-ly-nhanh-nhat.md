---
id: quiz-ci-cd-deploy-xong-phat-hien-loi-nang-cach-xu-ly-nhanh-nhat
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deploy xong phát hiện lỗi nặng. Cách xử lý nhanh nhất?

## Đáp án trắc nghiệm
- [ ] Sửa lỗi rồi deploy bản mới ngay lập tức
- [x] Rollback về bản trước, sửa lỗi sau khi ổn định
- [ ] Tắt tính năng đang lỗi bằng cách sửa cấu hình
- [ ] Chờ xem lỗi có ảnh hưởng nhiều người dùng hay không

## Giải thích (VI)
Rollback về bản trước rồi mới điều tra. Điều kiện để làm được điều đó nhanh: image được tag bất biến, migration tương thích hai chiều, và rollback là một lệnh đã từng được diễn tập.

### Giải thích các phương án:
- **Sửa lỗi rồi deploy bản mới ngay lập tức** (Sai): Sửa gấp dưới áp lực thường tạo thêm lỗi và mất nhiều thời gian hơn rollback.
- **Rollback về bản trước, sửa lỗi sau khi ổn định** (Đúng): Khôi phục dịch vụ trước, điều tra sau — sửa gấp trên production dễ gây lỗi thêm.
- **Tắt tính năng đang lỗi bằng cách sửa cấu hình** (Sai): Là lựa chọn tốt nếu có feature flag sẵn, nhưng không phải luôn có.
- **Chờ xem lỗi có ảnh hưởng nhiều người dùng hay không** (Sai): Chờ đợi kéo dài thiệt hại trong khi đã có cách khôi phục.
