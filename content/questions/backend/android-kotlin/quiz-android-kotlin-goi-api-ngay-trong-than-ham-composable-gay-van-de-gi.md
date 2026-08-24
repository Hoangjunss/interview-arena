---
id: quiz-android-kotlin-goi-api-ngay-trong-than-ham-composable-gay-van-de-gi
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi API ngay trong thân hàm Composable gây vấn đề gì?

## Đáp án trắc nghiệm
- [x] API bị gọi lại mỗi lần hàm chạy lại
- [ ] Kết quả API không thể lưu vào state
- [ ] Lời gọi API bị chặn cho tới khi giao diện vẽ xong
- [ ] Trình biên dịch từ chối biên dịch đoạn mã đó

## Giải thích (VI)
Hàm Composable chạy lại nhiều lần và không đoán trước được, nên lời gọi API sẽ lặp lại theo. Tác dụng phụ phải nằm trong các hàm hiệu ứng chuyên dụng, nơi có khoá phụ thuộc để kiểm soát thời điểm chạy.

### Giải thích các phương án:
- **API bị gọi lại mỗi lần hàm chạy lại** (Đúng): Hàm Composable chạy lại nhiều lần và không đoán trước được, nên tác dụng phụ phải nằm ngoài thân hàm.
- **Kết quả API không thể lưu vào state** (Sai): Lưu được, vấn đề nằm ở thời điểm gọi.
- **Lời gọi API bị chặn cho tới khi giao diện vẽ xong** (Sai): Không có cơ chế chặn nào như vậy.
- **Trình biên dịch từ chối biên dịch đoạn mã đó** (Sai): Mã vẫn biên dịch được, đây là lỗi lúc chạy.
