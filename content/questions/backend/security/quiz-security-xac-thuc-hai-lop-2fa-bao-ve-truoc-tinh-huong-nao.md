---
id: quiz-security-xac-thuc-hai-lop-2fa-bao-ve-truoc-tinh-huong-nao
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xác thực hai lớp (2FA) bảo vệ trước tình huống nào?

## Đáp án trắc nghiệm
- [ ] Dữ liệu bị đọc khi truyền qua mạng không an toàn
- [ ] Session cookie bị đánh cắp qua lỗ hổng XSS
- [ ] Nhân viên nội bộ truy cập dữ liệu không thuộc phận sự của mình
- [x] Mật khẩu bị lộ nhưng thiếu yếu tố thứ hai

## Giải thích (VI)
Khi mật khẩu đã bị lộ — rò rỉ từ site khác, bị dò, hay bị lừa qua phishing đơn giản. Kẻ tấn công có mật khẩu vẫn thiếu yếu tố thứ hai. Đây là biện pháp hiệu quả nhất so với công sức bỏ ra cho việc bảo vệ tài khoản.

### Giải thích các phương án:
- **Dữ liệu bị đọc khi truyền qua mạng không an toàn** (Sai): Đó là việc của TLS.
- **Session cookie bị đánh cắp qua lỗ hổng XSS** (Sai): 2FA không giúp gì khi kẻ tấn công đã có phiên đang hoạt động.
- **Nhân viên nội bộ truy cập dữ liệu không thuộc phận sự của mình** (Sai): Đó là vấn đề phân quyền và audit, không phải xác thực.
- **Mật khẩu bị lộ nhưng thiếu yếu tố thứ hai** (Đúng): Nhờ đó rò rỉ mật khẩu ở nơi khác không đủ để vào tài khoản của bạn.
