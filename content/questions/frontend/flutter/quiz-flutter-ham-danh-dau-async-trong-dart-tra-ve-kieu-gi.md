---
id: quiz-flutter-ham-danh-dau-async-trong-dart-tra-ve-kieu-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm đánh dấu async trong Dart trả về kiểu gì?

## Đáp án trắc nghiệm
- [ ] Giá trị trực tiếp, Dart tự chờ giúp ở nơi gọi
- [ ] Một Stream phát ra từng giá trị theo thời gian
- [ ] Một Isolate chạy song song với main thread
- [x] Một Future hoàn tất sau khi thân hàm chạy xong

## Giải thích (VI)
Hàm async luôn trả về Future . Dart bọc giá trị trả về vào Future kể cả khi trong thân hàm không có await. Quên await ở nơi gọi là nguyên nhân số một khiến biến in ra dòng Instance of Future.

### Giải thích các phương án:
- **Giá trị trực tiếp, Dart tự chờ giúp ở nơi gọi** (Sai): Nơi gọi phải tự await, nếu không sẽ nhận đối tượng Future chứ không phải giá trị.
- **Một Stream phát ra từng giá trị theo thời gian** (Sai): Stream là kết quả của hàm async , không phải async.
- **Một Isolate chạy song song với main thread** (Sai): async không tạo luồng mới, mọi thứ vẫn chạy trên isolate hiện tại.
- **Một Future hoàn tất sau khi thân hàm chạy xong** (Đúng): Dart bọc giá trị trả về vào Future, kể cả khi thân hàm không có await nào.
