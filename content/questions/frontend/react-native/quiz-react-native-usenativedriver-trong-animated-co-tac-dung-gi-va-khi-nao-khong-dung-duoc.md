---
id: quiz-react-native-usenativedriver-trong-animated-co-tac-dung-gi-va-khi-nao-khong-dung-duoc
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useNativeDriver trong Animated có tác dụng gì và khi nào không dùng được?

## Đáp án trắc nghiệm
- [x] Đẩy hoạt ảnh xuống native, trừ thuộc tính bố cục
- [ ] Cho phép hoạt ảnh tiếp tục khi ứng dụng vào nền
- [ ] Tăng tần số khung hình lên mức cao nhất thiết bị hỗ trợ
- [ ] Chạy hoạt ảnh trong một JS thread riêng

## Giải thích (VI)
useNativeDriver gửi mô tả hoạt ảnh xuống tầng native để chạy độc lập với JS thread, nên hoạt ảnh không giật khi JavaScript bận. Nó chỉ áp dụng cho biến đổi hình học và độ mờ, không dùng được cho các thuộc tính bố cục như chiều rộng hay khoảng cách.

### Giải thích các phương án:
- **Đẩy hoạt ảnh xuống native, trừ thuộc tính bố cục** (Đúng): Chỉ các thuộc tính không cần đo lại bố cục mới chạy được ở luồng native.
- **Cho phép hoạt ảnh tiếp tục khi ứng dụng vào nền** (Sai): Hoạt ảnh dừng khi ứng dụng không hiển thị.
- **Tăng tần số khung hình lên mức cao nhất thiết bị hỗ trợ** (Sai): Tần số khung hình do màn hình quyết định.
- **Chạy hoạt ảnh trong một JS thread riêng** (Sai): JavaScript vẫn chạy trên một luồng duy nhất.
