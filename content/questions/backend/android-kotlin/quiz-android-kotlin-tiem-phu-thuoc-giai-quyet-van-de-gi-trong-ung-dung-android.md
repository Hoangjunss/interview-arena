---
id: quiz-android-kotlin-tiem-phu-thuoc-giai-quyet-van-de-gi-trong-ung-dung-android
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tiêm phụ thuộc giải quyết vấn đề gì trong ứng dụng Android?

## Đáp án trắc nghiệm
- [x] Tách việc tạo đối tượng khỏi nơi sử dụng
- [ ] Tăng tốc độ khởi động của ứng dụng
- [ ] Tự động quản lý vòng đời của mọi đối tượng
- [ ] Giảm số lượng lớp cần viết trong dự án

## Giải thích (VI)
Nó tách việc tạo đối tượng khỏi nơi dùng , nên phụ thuộc thay được khi kiểm thử và vòng đời của đối tượng được khai báo ở một chỗ. Không có nó, lớp tự tạo phụ thuộc và kiểm thử buộc phải gọi mạng hay cơ sở dữ liệu thật.

### Giải thích các phương án:
- **Tách việc tạo đối tượng khỏi nơi sử dụng** (Đúng): Phụ thuộc được truyền vào nên kiểm thử thay bằng bản giả lập mà không sửa mã sản phẩm.
- **Tăng tốc độ khởi động của ứng dụng** (Sai): Khởi tạo bộ khung tiêm phụ thuộc còn tốn thêm thời gian.
- **Tự động quản lý vòng đời của mọi đối tượng** (Sai): Vòng đời vẫn phải khai báo qua phạm vi.
- **Giảm số lượng lớp cần viết trong dự án** (Sai): Thường còn thêm lớp cấu hình.
