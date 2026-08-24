---
id: quiz-react-native-metro-dong-vai-tro-gi-trong-ung-dung-react-native
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Metro đóng vai trò gì trong ứng dụng React Native?

## Đáp án trắc nghiệm
- [ ] Biên dịch mã native cho Android và iOS
- [ ] Quản lý các gói phụ thuộc trong dự án
- [x] Gộp mã JavaScript thành gói cho ứng dụng nạp
- [ ] Chạy mã JavaScript trên thiết bị

## Giải thích (VI)
Metro là bộ đóng gói JavaScript của React Native: gộp mã và tài nguyên thành gói cho ứng dụng nạp, đồng thời chạy server phát triển để cập nhật nhanh khi sửa mã. Phần native vẫn do Gradle và Xcode biên dịch.

### Giải thích các phương án:
- **Biên dịch mã native cho Android và iOS** (Sai): Phần native do Gradle và Xcode xử lý.
- **Quản lý các gói phụ thuộc trong dự án** (Sai): Đó là việc của npm, yarn hoặc pnpm.
- **Gộp mã JavaScript thành gói cho ứng dụng nạp** (Đúng): Nó cũng chạy máy chủ phát triển để nạp lại nhanh khi mã thay đổi.
- **Chạy mã JavaScript trên thiết bị** (Sai): Việc chạy mã do bộ máy JavaScript như Hermes đảm nhiệm.
