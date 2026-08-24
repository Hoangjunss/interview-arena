---
id: quiz-security-chong-do-mat-khau-brute-force-nen-gioi-han-theo-gi
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chống dò mật khẩu (brute force) nên giới hạn theo gì?

## Đáp án trắc nghiệm
- [x] Theo cả tài khoản và IP, cộng khoá tạm khi sai nhiều
- [ ] Theo IP nguồn của request là đủ để chặn dò mật khẩu
- [ ] Theo tài khoản, khoá vĩnh viễn sau 5 lần sai liên tiếp
- [ ] Theo phiên đăng nhập hiện tại của chính người dùng đó

## Giải thích (VI)
Kết hợp: giới hạn theo tài khoản (chặn dò mật khẩu một người) và theo IP (chặn quét nhiều tài khoản), cộng khoá tạm thời có thời gian tăng dần. Đừng khoá vĩnh viễn — nó thành công cụ để chặn người dùng thật.

### Giải thích các phương án:
- **Theo cả tài khoản và IP, cộng khoá tạm khi sai nhiều** (Đúng): Chỉ theo IP thì botnet lách được; chỉ theo tài khoản thì bị lợi dụng để khoá người khác.
- **Theo IP nguồn của request là đủ để chặn dò mật khẩu** (Sai): Kẻ tấn công phân tán qua nhiều IP để lách giới hạn.
- **Theo tài khoản, khoá vĩnh viễn sau 5 lần sai liên tiếp** (Sai): Khoá vĩnh viễn thành công cụ để người khác khoá tài khoản của bạn.
- **Theo phiên đăng nhập hiện tại của chính người dùng đó** (Sai): Người chưa đăng nhập được thì chưa có phiên nào để đếm.
