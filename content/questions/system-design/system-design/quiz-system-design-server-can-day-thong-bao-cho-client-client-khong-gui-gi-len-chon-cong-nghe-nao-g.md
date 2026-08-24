---
id: quiz-system-design-server-can-day-thong-bao-cho-client-client-khong-gui-gi-len-chon-cong-nghe-nao-g
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server cần đẩy thông báo cho client, client không gửi gì lên. Chọn công nghệ nào gọn nhất?

## Đáp án trắc nghiệm
- [ ] Long polling giữ request mở tới khi có dữ liệu
- [ ] WebSocket cho kết nối hai chiều đầy đủ
- [ ] Polling mỗi 2 giây để lấy thông báo mới nhất
- [x] Server-Sent Events (SSE) trên HTTP thường

## Giải thích (VI)
SSE : một chiều server→client trên HTTP thường, browser tự reconnect và tự gửi Last-Event-ID để tiếp tục từ chỗ đứt. Đơn giản hơn WebSocket, đi qua proxy và CDN dễ hơn.

### Giải thích các phương án:
- **Long polling giữ request mở tới khi có dữ liệu** (Sai): Chấp nhận được nhưng phức tạp hơn SSE mà không lợi thế gì thêm.
- **WebSocket cho kết nối hai chiều đầy đủ** (Sai): Chạy được nhưng dư thừa khi luồng dữ liệu chỉ đi một chiều.
- **Polling mỗi 2 giây để lấy thông báo mới nhất** (Sai): Tốn request vô ích và vẫn trễ tới 2 giây.
- **Server-Sent Events (SSE) trên HTTP thường** (Đúng): Một chiều server→client, tự động reconnect, không cần giao thức riêng.
