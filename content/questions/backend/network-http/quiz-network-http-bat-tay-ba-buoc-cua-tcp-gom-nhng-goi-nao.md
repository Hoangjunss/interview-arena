---
id: quiz-network-http-bat-tay-ba-buoc-cua-tcp-gom-nhng-goi-nao
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bắt tay ba bước của TCP gồm những gói nào?

## Đáp án trắc nghiệm
- [ ] SYN, ACK, FIN
- [ ] GET, 200 OK, ACK
- [ ] HELLO, ACCEPT, CONFIRM
- [x] SYN, SYN-ACK, ACK

## Giải thích (VI)
SYN (client xin mở) → SYN-ACK (server chấp nhận và mở chiều ngược lại) → ACK (client xác nhận). Sau ba bước này hai bên đã đồng bộ số thứ tự và kết nối sẵn sàng truyền dữ liệu.

### Giải thích các phương án:
- **SYN, ACK, FIN** (Sai): FIN thuộc quá trình đóng kết nối.
- **GET, 200 OK, ACK** (Sai): Đây là tầng ứng dụng, không phải tầng vận chuyển.
- **HELLO, ACCEPT, CONFIRM** (Sai): Không phải tên gói của giao thức TCP.
- **SYN, SYN-ACK, ACK** (Đúng): Client mở, server chấp nhận và mở chiều ngược lại, client xác nhận.
