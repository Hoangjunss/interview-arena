---
id: quiz-cpp-xoa-mot-doi-tuong-lop-con-qua-con-tro-lop-cha-khong-co-ham-huy-ao-dan-toi-dieu-g
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xoá một đối tượng lớp con qua con trỏ lớp cha không có hàm huỷ ảo dẫn tới điều gì?

## Đáp án trắc nghiệm
- [x] Hành vi không xác định, lớp con không được huỷ
- [ ] Đối tượng được huỷ đầy đủ nhưng chậm hơn
- [ ] Trình biên dịch báo lỗi ngay khi biên dịch
- [ ] Chương trình dừng ngay với thông điệp rõ ràng

## Giải thích (VI)
Đây là hành vi không xác định , và biểu hiện thường gặp là hàm huỷ của lớp con không chạy nên tài nguyên nó quản lý bị rò rỉ. Lớp cha dùng làm cơ sở cho đa hình phải có hàm huỷ ảo.

### Giải thích các phương án:
- **Hành vi không xác định, lớp con không được huỷ** (Đúng): Chỉ hàm huỷ của lớp cha được gọi nên tài nguyên do lớp con quản lý bị rò rỉ.
- **Đối tượng được huỷ đầy đủ nhưng chậm hơn** (Sai): Phần lớp con không được huỷ.
- **Trình biên dịch báo lỗi ngay khi biên dịch** (Sai): Mã biên dịch bình thường, lỗi chỉ xuất hiện lúc chạy.
- **Chương trình dừng ngay với thông điệp rõ ràng** (Sai): Thường không có thông điệp nào, chỉ rò rỉ âm thầm.
