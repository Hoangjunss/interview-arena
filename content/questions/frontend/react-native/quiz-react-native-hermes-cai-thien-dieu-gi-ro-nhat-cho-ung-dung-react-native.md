---
id: quiz-react-native-hermes-cai-thien-dieu-gi-ro-nhat-cho-ung-dung-react-native
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hermes cải thiện điều gì rõ nhất cho ứng dụng React Native?

## Đáp án trắc nghiệm
- [ ] Tốc độ mạng nhờ nén dữ liệu tự động
- [ ] Chất lượng hoạt ảnh nhờ đồng bộ theo khung hình
- [x] Thời gian khởi động nhờ mã byte biên dịch sẵn
- [ ] Tốc độ vẽ giao diện trên thread dựng hình

## Giải thích (VI)
Hermes biên dịch JavaScript thành mã byte lúc build , nên khi mở ứng dụng không phải phân tích và biên dịch mã nữa. Kết quả rõ nhất là thời gian tới màn hình đầu giảm, kèm mức dùng bộ nhớ thấp hơn và dung lượng ứng dụng nhỏ hơn.

### Giải thích các phương án:
- **Tốc độ mạng nhờ nén dữ liệu tự động** (Sai): Bộ máy JavaScript không can thiệp vào tầng mạng.
- **Chất lượng hoạt ảnh nhờ đồng bộ theo khung hình** (Sai): Hoạt ảnh mượt phụ thuộc trình điều khiển native và cách viết hoạt ảnh.
- **Thời gian khởi động nhờ mã byte biên dịch sẵn** (Đúng): Không phải phân tích và biên dịch JavaScript lúc chạy nên khung hình đầu tới sớm hơn.
- **Tốc độ vẽ giao diện trên thread dựng hình** (Sai): Việc vẽ do tầng native đảm nhiệm, không phụ thuộc bộ máy JavaScript.
