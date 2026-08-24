---
id: quiz-security-csrf-la-gi-va-cach-chan-pho-bien-nhat-hien-nay
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSRF là gì và cách chặn phổ biến nhất hiện nay?

## Đáp án trắc nghiệm
- [ ] Chèn script vào trang; chặn bằng Content-Security-Policy
- [ ] Kẻ tấn công đọc cookie của bạn; chặn bằng cờ httpOnly
- [x] Site khác gửi request kèm cookie của bạn; chặn bằng SameSite
- [ ] Chặn giữa đường rồi sửa request; chặn bằng cách bật HTTPS toàn site

## Giải thích (VI)
Site của kẻ tấn công khiến trình duyệt bạn gửi request tới site thật, và cookie được gửi kèm tự động nên request trông như hợp lệ. Chặn bằng SameSite=Lax hoặc Strict trên cookie phiên, cộng CSRF token cho các thao tác ghi.

### Giải thích các phương án:
- **Chèn script vào trang; chặn bằng Content-Security-Policy** (Sai): Đó là XSS, một loại lỗ hổng khác.
- **Kẻ tấn công đọc cookie của bạn; chặn bằng cờ httpOnly** (Sai): Đó là chống đọc cookie bằng JavaScript, không phải CSRF.
- **Site khác gửi request kèm cookie của bạn; chặn bằng SameSite** (Đúng): Trình duyệt tự gửi cookie theo domain nên request từ site lạ vẫn được xác thực.
- **Chặn giữa đường rồi sửa request; chặn bằng cách bật HTTPS toàn site** (Sai): Đó là tấn công người ở giữa, không phải CSRF.
