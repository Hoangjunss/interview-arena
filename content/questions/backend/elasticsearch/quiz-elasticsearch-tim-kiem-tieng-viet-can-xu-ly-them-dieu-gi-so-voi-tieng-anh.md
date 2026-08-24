---
id: quiz-elasticsearch-tim-kiem-tieng-viet-can-xu-ly-them-dieu-gi-so-voi-tieng-anh
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tìm kiếm tiếng Việt cần xử lý thêm điều gì so với tiếng Anh?

## Đáp án trắc nghiệm
- [ ] Tách từ theo âm tiết là đủ cho mọi trường hợp
- [x] Chuẩn hoá dấu và cho phép tìm không dấu ra có dấu
- [ ] Không cần xử lý gì thêm vì bộ phân tích chuẩn đã đủ
- [ ] Phải dùng bộ phân tích riêng cho từng vùng miền

## Giải thích (VI)
Hai việc: chuẩn hoá dấu vì cùng một chữ có thể được mã hoá bằng ký tự có sẵn dấu hoặc ký tự gốc cộng dấu rời; và cho phép gõ không dấu tìm ra kết quả có dấu , vì đó là thói quen phổ biến của người dùng.

### Giải thích các phương án:
- **Tách từ theo âm tiết là đủ cho mọi trường hợp** (Sai): Tách theo khoảng trắng cho ra âm tiết, còn từ ghép nhiều âm tiết cần xử lý riêng.
- **Chuẩn hoá dấu và cho phép tìm không dấu ra có dấu** (Đúng): Người dùng thường gõ không dấu, và cùng một chữ có thể được mã hoá bằng hai cách khác nhau.
- **Không cần xử lý gì thêm vì bộ phân tích chuẩn đã đủ** (Sai): Bộ phân tích chuẩn không xử lý phần dấu theo cách người dùng mong đợi.
- **Phải dùng bộ phân tích riêng cho từng vùng miền** (Sai): Không có nhu cầu tách theo vùng miền như vậy.
