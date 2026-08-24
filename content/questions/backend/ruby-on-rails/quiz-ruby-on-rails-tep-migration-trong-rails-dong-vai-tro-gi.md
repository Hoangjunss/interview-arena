---
id: quiz-ruby-on-rails-tep-migration-trong-rails-dong-vai-tro-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tệp migration trong Rails đóng vai trò gì?

## Đáp án trắc nghiệm
- [ ] Sao lưu dữ liệu trước khi đổi cấu trúc bảng
- [x] Mô tả thay đổi lược đồ theo từng bước có thứ tự
- [ ] Sinh model tương ứng với mỗi bảng trong cơ sở dữ liệu
- [ ] Chuyển dữ liệu giữa hai cơ sở dữ liệu khác nhau

## Giải thích (VI)
Migration mô tả thay đổi lược đồ theo từng bước có thứ tự , được ghi lại là đã chạy hay chưa. Nhờ đó mọi môi trường áp dụng cùng một chuỗi thay đổi và lược đồ ở máy cá nhân khớp với server.

### Giải thích các phương án:
- **Sao lưu dữ liệu trước khi đổi cấu trúc bảng** (Sai): Sao lưu là việc riêng và không tự động đi kèm.
- **Mô tả thay đổi lược đồ theo từng bước có thứ tự** (Đúng): Nhờ vậy mọi môi trường áp dụng cùng một chuỗi thay đổi và lược đồ luôn khớp nhau.
- **Sinh model tương ứng với mỗi bảng trong cơ sở dữ liệu** (Sai): Sinh mô hình là lệnh sinh mã riêng.
- **Chuyển dữ liệu giữa hai cơ sở dữ liệu khác nhau** (Sai): Đây là công việc di chuyển dữ liệu, khác với di trú lược đồ.
