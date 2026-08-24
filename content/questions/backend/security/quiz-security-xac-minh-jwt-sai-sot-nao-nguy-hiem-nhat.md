---
id: quiz-security-xac-minh-jwt-sai-sot-nao-nguy-hiem-nhat
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xác minh JWT, sai sót nào nguy hiểm nhất?

## Đáp án trắc nghiệm
- [ ] Dùng cùng một secret cho mọi môi trường triển khai của dự án
- [ ] Không kiểm tra thời điểm hết hạn của token
- [ ] Lưu token trong localStorage thay vì cookie
- [x] Tin thuật toán khai trong header token thay vì cố định

## Giải thích (VI)
Tin alg trong header của token. Kẻ tấn công đổi nó thành none (không chữ ký) hoặc chuyển RS256 sang HS256 rồi ký bằng public key. Server phải cố định thuật toán khi xác minh, không đọc từ token.

### Giải thích các phương án:
- **Dùng cùng một secret cho mọi môi trường triển khai của dự án** (Sai): Thực hành tệ nhưng chưa cho phép tự tạo token hợp lệ.
- **Không kiểm tra thời điểm hết hạn của token** (Sai): Nguy hiểm thật nhưng vẫn cần có token hợp lệ ban đầu.
- **Lưu token trong localStorage thay vì cookie** (Sai): Tăng rủi ro khi có XSS nhưng không phá vỡ việc xác minh.
- **Tin thuật toán khai trong header token thay vì cố định** (Đúng): Kẻ tấn công đổi alg thành none hoặc sang HMAC để tự ký token.
