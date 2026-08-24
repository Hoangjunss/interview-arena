---
id: quiz-flutter-themeofcontext-hoat-dong-nho-co-che-nao
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Theme.of(context) hoạt động nhờ cơ chế nào?

## Đáp án trắc nghiệm
- [ ] Một singleton toàn cục do MaterialApp khởi tạo lúc chạy
- [ ] Một EventBus phát sự kiện xuống toàn bộ widget con
- [x] InheritedWidget cho phép tra ngược lên và đăng ký phụ thuộc
- [ ] Phản chiếu kiểu để tìm widget cha có kiểu tương ứng

## Giải thích (VI)
Theme.of(context) là một InheritedWidget . Lời gọi vừa tìm widget tổ tiên gần nhất theo kiểu vừa đăng ký phụ thuộc , nên khi theme đổi thì đúng những widget đã đọc nó được rebuild, không phải cả cây.

### Giải thích các phương án:
- **Một singleton toàn cục do MaterialApp khởi tạo lúc chạy** (Sai): Nếu là singleton thì không thể có theme khác nhau ở hai nhánh của cây.
- **Một EventBus phát sự kiện xuống toàn bộ widget con** (Sai): Không có cơ chế phát sự kiện nào, quan hệ được đăng ký theo từng widget cụ thể.
- **InheritedWidget cho phép tra ngược lên và đăng ký phụ thuộc** (Đúng): Việc tra cứu vừa lấy dữ liệu vừa ghi nhận widget này cần rebuild khi dữ liệu đổi.
- **Phản chiếu kiểu để tìm widget cha có kiểu tương ứng** (Sai): Dart trên thiết bị không dùng phản chiếu cho việc này, tra cứu dựa vào bảng trong element.
