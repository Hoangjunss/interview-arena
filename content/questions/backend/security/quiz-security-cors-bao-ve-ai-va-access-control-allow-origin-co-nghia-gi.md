---
id: quiz-security-cors-bao-ve-ai-va-access-control-allow-origin-co-nghia-gi
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS bảo vệ ai, và Access-Control-Allow-Origin: * có nghĩa gì?

## Đáp án trắc nghiệm
- [ ] Chặn tấn công CSRF từ các trang web khác
- [ ] Bảo vệ server khỏi request từ các domain không mong muốn
- [ ] Mã hoá dữ liệu trao đổi giữa hai domain khác nhau khi gọi API
- [x] Bảo vệ người dùng khỏi site lạ đọc dữ liệu; * mở cho mọi origin

## Giải thích (VI)
CORS bảo vệ người dùng : nó ngăn JavaScript ở origin A đọc response từ origin B. * nghĩa là cho mọi origin đọc. Nó không bảo vệ server — curl hay một service khác vẫn gọi API bình thường.

### Giải thích các phương án:
- **Chặn tấn công CSRF từ các trang web khác** (Sai): CSRF cần biện pháp riêng như SameSite và token.
- **Bảo vệ server khỏi request từ các domain không mong muốn** (Sai): CORS không chặn request tới server; nó chỉ chặn trình duyệt đọc response.
- **Mã hoá dữ liệu trao đổi giữa hai domain khác nhau khi gọi API** (Sai): Mã hoá đường truyền là việc của TLS.
- **Bảo vệ người dùng khỏi site lạ đọc dữ liệu; * mở cho mọi origin** (Đúng): CORS là quy tắc của trình duyệt, không chặn được request từ server hay curl.
