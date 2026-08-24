---
id: quiz-docker-chay-container-voi-network-host-khac-gi-so-voi-bridge-mac-dinh
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chạy container với --network host khác gì so với bridge mặc định?

## Đáp án trắc nghiệm
- [ ] host mode bật một firewall riêng cho container nên an toàn hơn bridge
- [ ] Container được router trong mạng LAN cấp một địa chỉ IP riêng
- [ ] Chỉ khác về hiệu năng, còn vẫn phải publish port bằng -p như bridge mặc định
- [x] Dùng chung network namespace với host: không cần -p, mất cách ly mạng

## Giải thích (VI)
--network host bỏ network namespace riêng: container dùng luôn stack mạng của host. Port mở trong container là port mở trên host, không cần và không dùng -p. Đổi lại mất cách ly, dễ đụng port với tiến trình khác. Đầy đủ tính năng trên Linux.

### Giải thích các phương án:
- **host mode bật một firewall riêng cho container nên an toàn hơn bridge** (Sai): Ngược lại — host mode làm giảm mức cách ly so với bridge.
- **Container được router trong mạng LAN cấp một địa chỉ IP riêng** (Sai): Đó là mô hình của macvlan, không phải host mode.
- **Chỉ khác về hiệu năng, còn vẫn phải publish port bằng -p như bridge mặc định** (Sai): Ở host mode, -p không còn ý nghĩa vì không có ánh xạ port nào cả.
- **Dùng chung network namespace với host: không cần -p, mất cách ly mạng** (Đúng): Đúng bản chất host mode — bỏ lớp NAT nên port bind thẳng lên host, đổi lại mất cách ly mạng và dễ đụng port. Hỗ trợ đầy đủ trên Linux.
