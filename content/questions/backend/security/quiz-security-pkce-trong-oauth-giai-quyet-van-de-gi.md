---
id: quiz-security-pkce-trong-oauth-giai-quyet-van-de-gi
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PKCE trong OAuth giải quyết vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Refresh token bị dùng lại sau khi đã hết hạn
- [ ] Người dùng bị chuyển hướng tới trang đăng nhập giả
- [ ] Access token bị lộ khi lưu ở phía client
- [x] Authorization code bị chặn rồi dùng bởi ứng dụng khác

## Giải thích (VI)
Chặn đánh cắp authorization code : client sinh một code_verifier bí mật, gửi bản băm của nó khi bắt đầu, rồi gửi bản gốc khi đổi code lấy token. Ai lấy được code mà không có verifier thì không đổi được gì.

### Giải thích các phương án:
- **Refresh token bị dùng lại sau khi đã hết hạn** (Sai): Đó là việc của rotation và kiểm tra thời hạn.
- **Người dùng bị chuyển hướng tới trang đăng nhập giả** (Sai): Chống phishing dựa vào việc người dùng kiểm domain, không phải PKCE.
- **Access token bị lộ khi lưu ở phía client** (Sai): Việc lưu token an toàn là vấn đề khác, PKCE không xử lý.
- **Authorization code bị chặn rồi dùng bởi ứng dụng khác** (Đúng): Chỉ client biết code verifier gốc nên code bị lấy cũng không đổi được thành token.
