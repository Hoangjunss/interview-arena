---
id: quiz-android-kotlin-bien-dem-khai-bao-bang-var-thuong-trong-composable-khong-lam-giao-dien-cap-nhat
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Biến đếm khai báo bằng var thường trong Composable không làm giao diện cập nhật. Vì sao?

## Đáp án trắc nghiệm
- [x] Biến thường không được theo dõi nên không vẽ lại
- [ ] Biến bị đặt lại vì hàm Composable chạy trên thread khác
- [ ] Cần khai báo biến ở cấp lớp thay vì trong hàm
- [ ] Kotlin không cho phép thay đổi biến trong hàm Composable

## Giải thích (VI)
Giao diện chỉ vẽ lại khi giá trị được theo dõi thay đổi. Biến thường không nằm trong hệ thống theo dõi nên không có gì báo cho Compose biết cần chạy lại, và giá trị cũng bị đặt lại ở lần chạy sau.

### Giải thích các phương án:
- **Biến thường không được theo dõi nên không vẽ lại** (Đúng): Chỉ giá trị thuộc kiểu state mới được ghi nhận là phụ thuộc và làm hàm chạy lại khi đổi.
- **Biến bị đặt lại vì hàm Composable chạy trên thread khác** (Sai): Không có luồng khác nào tham gia ở đây.
- **Cần khai báo biến ở cấp lớp thay vì trong hàm** (Sai): Vị trí khai báo không giải quyết việc thiếu theo dõi.
- **Kotlin không cho phép thay đổi biến trong hàm Composable** (Sai): Về mặt ngôn ngữ thì vẫn thay đổi được.
