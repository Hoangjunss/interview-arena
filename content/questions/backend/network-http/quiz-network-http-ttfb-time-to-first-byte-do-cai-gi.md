---
id: quiz-network-http-ttfb-time-to-first-byte-do-cai-gi
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TTFB (time to first byte) đo cái gì?

## Đáp án trắc nghiệm
- [ ] Thời gian trình duyệt hiển thị nội dung đầu tiên
- [ ] Thời gian tải xong toàn bộ trang
- [x] Thời gian tới byte đầu tiên của phản hồi
- [ ] Thời gian phân giải tên miền thành địa chỉ IP

## Giải thích (VI)
Thời gian từ lúc gửi yêu cầu tới khi nhận byte đầu tiên của phản hồi. Nó gộp nhiều phần: phân giải DNS, bắt tay TCP và TLS, đường truyền, và thời gian máy chủ xử lý — nên TTFB cao chưa nói được lỗi nằm ở đâu.

### Giải thích các phương án:
- **Thời gian trình duyệt hiển thị nội dung đầu tiên** (Sai): Đó là first contentful paint, xảy ra sau TTFB.
- **Thời gian tải xong toàn bộ trang** (Sai): Đó là các chỉ số như load hoặc largest contentful paint.
- **Thời gian tới byte đầu tiên của phản hồi** (Đúng): Gồm cả thời gian mạng lẫn thời gian máy chủ xử lý.
- **Thời gian phân giải tên miền thành địa chỉ IP** (Sai): Đó là một phần nhỏ nằm trước TTFB.
