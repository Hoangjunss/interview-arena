---
id: quiz-flutter-gan-gia-tri-moi-cho-bien-state-nhung-khong-goi-setstate-thi-dieu-gi-xay-ra
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gán giá trị mới cho biến state nhưng không gọi setState thì điều gì xảy ra?

## Đáp án trắc nghiệm
- [ ] Giao diện vẫn cập nhật nhưng chậm hơn một khung hình
- [x] Biến đổi giá trị nhưng giao diện không vẽ lại
- [ ] Giá trị bị hoàn về mặc định ở lần build kế tiếp
- [ ] Flutter báo lỗi ngay tại dòng gán giá trị

## Giải thích (VI)
Giá trị đổi thật nhưng màn hình không vẽ lại . setState không gán dữ liệu, nó chỉ đánh dấu element là bẩn để Flutter xếp lịch rebuild ở khung hình sau. Đó cũng là lý do màn hình vẫn đúng khi có widget khác vô tình kích hoạt rebuild.

### Giải thích các phương án:
- **Giao diện vẫn cập nhật nhưng chậm hơn một khung hình** (Sai): Không có lịch rebuild nào được đặt nên giao diện đứng yên vô hạn.
- **Biến đổi giá trị nhưng giao diện không vẽ lại** (Đúng): setState là tín hiệu đánh dấu element cần rebuild; không có nó thì Flutter không biết phải vẽ lại.
- **Giá trị bị hoàn về mặc định ở lần build kế tiếp** (Sai): Đối tượng State vẫn giữ nguyên giá trị mới, chỉ là chưa vẽ lại.
- **Flutter báo lỗi ngay tại dòng gán giá trị** (Sai): Đây là phép gán Dart bình thường, không có cơ chế nào chặn nó.
