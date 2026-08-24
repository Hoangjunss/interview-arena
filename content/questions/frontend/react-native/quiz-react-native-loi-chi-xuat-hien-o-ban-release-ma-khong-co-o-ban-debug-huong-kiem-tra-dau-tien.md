---
id: quiz-react-native-loi-chi-xuat-hien-o-ban-release-ma-khong-co-o-ban-debug-huong-kiem-tra-dau-tien
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lỗi chỉ xuất hiện ở bản release mà không có ở bản debug. Hướng kiểm tra đầu tiên?

## Đáp án trắc nghiệm
- [ ] Cache của bộ đóng gói chưa được xoá
- [ ] Thiết bị thật có phiên bản hệ điều hành khác
- [x] Mã bị loại bỏ khi tối ưu, cấu hình khác nhau
- [ ] Server phát triển không chạy khi thử bản release

## Giải thích (VI)
Bản release rút gọn mã, tắt kiểm tra phát triển và dùng cấu hình khác. Các nguyên nhân phổ biến: mã dựa vào tên lớp hoặc tên hàm bị đổi khi rút gọn, luật giữ mã của trình rút gọn thiếu, biến môi trường trỏ sai, và tài nguyên chỉ có trong bản gỡ lỗi.

### Giải thích các phương án:
- **Cache của bộ đóng gói chưa được xoá** (Sai): Bản release luôn được đóng gói lại từ đầu.
- **Thiết bị thật có phiên bản hệ điều hành khác** (Sai): Có thể xảy ra nhưng không giải thích được sự khác biệt giữa hai chế độ build.
- **Mã bị loại bỏ khi tối ưu, cấu hình khác nhau** (Đúng): Bản release rút gọn mã, tắt cảnh báo và dùng cấu hình khác nên các giả định ngầm dễ vỡ.
- **Server phát triển không chạy khi thử bản release** (Sai): Bản release vốn không cần máy chủ phát triển.
