---
id: quiz-react-native-cach-viet-doan-ma-chi-chay-tren-ios-trong-react-native-la-gi
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách viết đoạn mã chỉ chạy trên iOS trong React Native là gì?

## Đáp án trắc nghiệm
- [ ] Khai báo trong tệp cấu hình của dự án
- [x] Kiểm tra Platform.OS hoặc tách tệp theo hậu tố
- [ ] Đặt mã trong khối chỉ thị biên dịch có điều kiện
- [ ] Dùng biến môi trường đặt lúc chạy ứng dụng

## Giải thích (VI)
Hai cách: kiểm tra Platform.OS trong mã, hoặc tách tệp thành Component.ios.tsx và Component.android.tsx để bộ đóng gói tự chọn khi build. Ngoài ra Platform.select cho phép chọn giá trị theo nền tảng ngay trong đối tượng kiểu.

### Giải thích các phương án:
- **Khai báo trong tệp cấu hình của dự án** (Sai): Tệp cấu hình không quyết định nhánh mã nào chạy.
- **Kiểm tra Platform.OS hoặc tách tệp theo hậu tố** (Đúng): Cả hai cách đều được hỗ trợ sẵn, tệp có hậu tố được bộ đóng gói chọn tự động khi build.
- **Đặt mã trong khối chỉ thị biên dịch có điều kiện** (Sai): JavaScript không có chỉ thị tiền xử lý như vậy.
- **Dùng biến môi trường đặt lúc chạy ứng dụng** (Sai): Không có biến môi trường theo nghĩa đó trên thiết bị.
