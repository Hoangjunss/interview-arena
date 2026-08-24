---
id: quiz-android-kotlin-kotlin-phan-biet-kieu-co-the-null-va-khong-the-null-nham-muc-dich-gi
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kotlin phân biệt kiểu có thể null và không thể null nhằm mục đích gì?

## Đáp án trắc nghiệm
- [x] Đưa lỗi null từ lúc chạy về lúc biên dịch
- [ ] Cho phép biến nhận nhiều kiểu dữ liệu khác nhau
- [ ] Giảm bộ nhớ mà đối tượng chiếm giữ
- [ ] Tăng tốc độ khởi tạo đối tượng lúc chạy

## Giải thích (VI)
Kotlin đưa lỗi null từ lúc chạy về lúc biên dịch . String không nhận null, còn String? thì có, và trình biên dịch bắt buộc xử lý trường hợp null trước khi gọi thành viên. Đây là lý do chính khiến Android chuyển từ Java sang Kotlin.

### Giải thích các phương án:
- **Đưa lỗi null từ lúc chạy về lúc biên dịch** (Đúng): Trình biên dịch chặn việc gọi thành viên trên giá trị có thể null nên lỗi lộ ra khi viết mã.
- **Cho phép biến nhận nhiều kiểu dữ liệu khác nhau** (Sai): Đây là chuyện của kiểu tổng quát và kiểu liên hợp.
- **Giảm bộ nhớ mà đối tượng chiếm giữ** (Sai): Kiểu khai báo không đổi kích thước đối tượng lúc chạy.
- **Tăng tốc độ khởi tạo đối tượng lúc chạy** (Sai): Không có ảnh hưởng nào tới tốc độ khởi tạo.
