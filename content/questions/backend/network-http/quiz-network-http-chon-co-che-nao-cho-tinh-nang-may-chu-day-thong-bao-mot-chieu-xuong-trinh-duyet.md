---
id: quiz-network-http-chon-co-che-nao-cho-tinh-nang-may-chu-day-thong-bao-mot-chieu-xuong-trinh-duyet
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chọn cơ chế nào cho tính năng máy chủ đẩy thông báo một chiều xuống trình duyệt?

## Đáp án trắc nghiệm
- [ ] WebSocket
- [x] Server-Sent Events
- [ ] Hỏi lại máy chủ mỗi giây (polling)
- [ ] Tải lại trang định kỳ

## Giải thích (VI)
Server-Sent Events — luồng một chiều từ máy chủ xuống trình duyệt, chạy trên HTTP thường, tự động kết nối lại, và đơn giản hơn WebSocket. Dùng WebSocket khi cần hai chiều thật sự (chat, cộng tác thời gian thực, game).

### Giải thích các phương án:
- **WebSocket** (Sai): Dùng được nhưng thừa vì hai chiều, phức tạp hơn khi chỉ cần một chiều.
- **Server-Sent Events** (Đúng): Một chiều từ máy chủ xuống, chạy trên HTTP thường và tự kết nối lại.
- **Hỏi lại máy chủ mỗi giây (polling)** (Sai): Tốn tài nguyên và vẫn trễ hơn cơ chế đẩy.
- **Tải lại trang định kỳ** (Sai): Trải nghiệm kém và tốn băng thông nhất.
