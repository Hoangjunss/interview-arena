---
id: quiz-network-http-khac-biet-co-ban-gia-tcp-va-udp-la-gi
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cơ bản giữa TCP và UDP là gì?

## Đáp án trắc nghiệm
- [ ] TCP dùng cho web, UDP chỉ dùng cho game
- [ ] UDP mã hóa dữ liệu còn TCP thì không
- [ ] TCP nhanh hơn UDP trong mọi trường hợp
- [x] TCP bảo đảm tin cậy, UDP thì không

## Giải thích (VI)
TCP có kết nối, bảo đảm gói tới đủ và đúng thứ tự, tự gửi lại khi mất. UDP không kết nối, không bảo đảm gì — đổi lại nhẹ và độ trễ thấp hơn, phù hợp khi mất vài gói không nghiêm trọng bằng việc chậm.

### Giải thích các phương án:
- **TCP dùng cho web, UDP chỉ dùng cho game** (Sai): DNS, VoIP, QUIC đều dùng UDP; phạm vi rộng hơn nhiều.
- **UDP mã hóa dữ liệu còn TCP thì không** (Sai): Cả hai đều không mã hóa; mã hóa nằm ở tầng trên như TLS.
- **TCP nhanh hơn UDP trong mọi trường hợp** (Sai): Ngược lại, UDP nhẹ hơn nên độ trễ thấp hơn.
- **TCP bảo đảm tin cậy, UDP thì không** (Đúng): TCP có bắt tay, đánh số gói, gửi lại khi mất; UDP gửi và quên.
