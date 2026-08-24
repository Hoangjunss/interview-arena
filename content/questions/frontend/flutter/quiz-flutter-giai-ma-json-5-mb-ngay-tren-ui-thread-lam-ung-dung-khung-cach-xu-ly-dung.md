---
id: quiz-flutter-giai-ma-json-5-mb-ngay-tren-ui-thread-lam-ung-dung-khung-cach-xu-ly-dung
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải mã JSON 5 MB ngay trên UI thread làm ứng dụng khựng. Cách xử lý đúng?

## Đáp án trắc nghiệm
- [x] Chuyển việc giải mã sang isolate bằng compute
- [ ] Đánh dấu hàm giải mã là async rồi await kết quả
- [ ] Chia dữ liệu thành nhiều lần setState nhỏ hơn
- [ ] Bọc phần hiển thị trong RepaintBoundary để giảm vẽ lại

## Giải thích (VI)
Đưa phép tính nặng sang isolate , đơn giản nhất là compute(jsonDecode, raw). Isolate có bộ nhớ và event loop riêng nên UI thread rảnh để giữ 60 khung hình. async không giúp gì vì nó không tạo thread mới.

### Giải thích các phương án:
- **Chuyển việc giải mã sang isolate bằng compute** (Đúng): Isolate có luồng riêng nên vòng lặp sự kiện của giao diện không bị chiếm.
- **Đánh dấu hàm giải mã là async rồi await kết quả** (Sai): async không tạo luồng mới, phép tính nặng vẫn chiếm luồng UI như cũ.
- **Chia dữ liệu thành nhiều lần setState nhỏ hơn** (Sai): Chi phí giải mã không giảm, chỉ chia nhỏ chỗ hiển thị.
- **Bọc phần hiển thị trong RepaintBoundary để giảm vẽ lại** (Sai): Vấn đề nằm ở tính toán chứ không phải ở việc vẽ.
