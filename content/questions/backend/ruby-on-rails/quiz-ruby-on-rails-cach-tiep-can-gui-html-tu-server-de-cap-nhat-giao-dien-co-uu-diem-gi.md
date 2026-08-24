---
id: quiz-ruby-on-rails-cach-tiep-can-gui-html-tu-server-de-cap-nhat-giao-dien-co-uu-diem-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tiếp cận gửi HTML từ server để cập nhật giao diện có ưu điểm gì?

## Đáp án trắc nghiệm
- [ ] Trang tải nhanh hơn trong mọi trường hợp
- [ ] Không cần JavaScript trên trình duyệt nữa
- [x] Giữ logic hiển thị ở một nơi duy nhất
- [ ] Hoạt động được cả khi mất kết nối mạng

## Giải thích (VI)
Logic hiển thị nằm ở một nơi duy nhất là server , nên không phải viết lại phần dựng giao diện bằng JavaScript song song. Đội nhỏ nhờ vậy làm được nhiều tính năng hơn mà không phải duy trì hai tầng hiển thị.

### Giải thích các phương án:
- **Trang tải nhanh hơn trong mọi trường hợp** (Sai): Tốc độ phụ thuộc kích thước nội dung và độ trễ mạng.
- **Không cần JavaScript trên trình duyệt nữa** (Sai): Vẫn cần một lớp JavaScript nhỏ để nhận và thay thế nội dung.
- **Giữ logic hiển thị ở một nơi duy nhất** (Đúng): Không phải viết lại phần dựng giao diện bằng JavaScript song song với phần máy chủ.
- **Hoạt động được cả khi mất kết nối mạng** (Sai): Vẫn cần kết nối để lấy nội dung từ máy chủ.
