---
id: quiz-ruby-on-rails-tac-vu-nen-trong-rails-can-duoc-viet-theo-nguyen-tac-nao
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tác vụ nền trong Rails cần được viết theo nguyên tắc nào?

## Đáp án trắc nghiệm
- [x] Chạy lại nhiều lần vẫn cho kết quả đúng
- [ ] Luôn hoàn tất trong vòng vài giây
- [ ] Chỉ nhận tham số là đối tượng đầy đủ
- [ ] Không được truy cập cơ sở dữ liệu

## Giải thích (VI)
Tác vụ phải chạy lại nhiều lần vẫn cho kết quả đúng , vì queue bảo đảm giao ít nhất một lần. Một tác vụ trừ tiền không idempotent có thể trừ hai lần khi hệ thống thử lại sau lỗi mạng.

### Giải thích các phương án:
- **Chạy lại nhiều lần vẫn cho kết quả đúng** (Đúng): Hàng đợi bảo đảm giao ít nhất một lần nên một tác vụ có thể chạy hai lần.
- **Luôn hoàn tất trong vòng vài giây** (Sai): Tác vụ dài vẫn hợp lệ nếu được thiết kế đúng.
- **Chỉ nhận tham số là đối tượng đầy đủ** (Sai): Ngược lại, nên truyền định danh thay vì cả đối tượng.
- **Không được truy cập cơ sở dữ liệu** (Sai): Truy cập cơ sở dữ liệu là việc bình thường của tác vụ nền.
