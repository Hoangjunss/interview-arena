---
id: quiz-security-cookie-phien-dang-nhap-nen-dat-nhng-thuoc-tinh-nao
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cookie phiên đăng nhập nên đặt những thuộc tính nào?

## Đáp án trắc nghiệm
- [ ] Secure và Domain mở rộng cho mọi subdomain
- [ ] httpOnly là đủ vì nó đã chặn JavaScript đọc cookie
- [ ] Chỉ cần đặt thời hạn thật ngắn là đã đủ an toàn
- [x] httpOnly, Secure, SameSite, thời hạn hợp lý

## Giải thích (VI)
Ba thuộc tính bắt buộc: httpOnly (JavaScript không đọc được, nên XSS không lấy được phiên), Secure (chỉ gửi qua HTTPS), SameSite=Lax (chống CSRF). Cộng thời hạn hợp lý và đường dẫn hẹp nhất có thể.

### Giải thích các phương án:
- **Secure và Domain mở rộng cho mọi subdomain** (Sai): Mở rộng domain làm mọi subdomain nhận được cookie phiên, tăng rủi ro.
- **httpOnly là đủ vì nó đã chặn JavaScript đọc cookie** (Sai): Thiếu Secure thì cookie vẫn có thể đi qua HTTP và bị chặn giữa đường.
- **Chỉ cần đặt thời hạn thật ngắn là đã đủ an toàn** (Sai): Thời hạn ngắn giảm rủi ro nhưng không chặn được việc đọc hay gửi sai kênh.
- **httpOnly, Secure, SameSite, thời hạn hợp lý** (Đúng): httpOnly chặn JavaScript đọc, Secure chỉ gửi qua HTTPS, SameSite chống CSRF.
