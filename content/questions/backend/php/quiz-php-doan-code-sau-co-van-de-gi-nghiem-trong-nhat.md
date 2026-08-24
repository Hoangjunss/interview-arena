---
id: quiz-php-doan-code-sau-co-van-de-gi-nghiem-trong-nhat
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau có vấn đề gì nghiêm trọng nhất?

## Đáp án trắc nghiệm
- [ ] Sai cú pháp vì query() không nhận chuỗi nối
- [ ] Chỉ nguy hiểm khi id là chuỗi; id kiểu số thì an toàn
- [x] SQL injection — input được nối thẳng vào câu SQL
- [ ] Thiếu escape HTML nên dễ bị XSS khi hiển thị kết quả

## Giải thích (VI)
SQL injection. $_GET['id'] được nối thẳng vào SQL nên attacker gửi ?id=1 OR 1=1 là đọc được toàn bộ bảng. Sửa bằng prepared statement: $pdo->prepare('SELECT * FROM users WHERE id = ?') rồi execute([$id]) — cấu trúc câu lệnh và dữ liệu được tách rời.

### Giải thích các phương án:
- **Sai cú pháp vì query() không nhận chuỗi nối** (Sai): Code chạy bình thường về mặt cú pháp — đó chính là điều nguy hiểm.
- **Chỉ nguy hiểm khi id là chuỗi; id kiểu số thì an toàn** (Sai): $ GET luôn là chuỗi; không có gì bảo đảm giá trị gửi lên là số.
- **SQL injection — input được nối thẳng vào câu SQL** (Đúng): Kẻ tấn công truyền 1 OR 1=1 hoặc 1; DROP TABLE để đổi cấu trúc câu lệnh.
- **Thiếu escape HTML nên dễ bị XSS khi hiển thị kết quả** (Sai): XSS là chuyện lúc render output, không phải vấn đề của câu query này.
