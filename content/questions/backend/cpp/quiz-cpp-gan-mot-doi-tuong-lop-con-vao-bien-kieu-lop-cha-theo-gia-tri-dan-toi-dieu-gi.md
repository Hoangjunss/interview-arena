---
id: quiz-cpp-gan-mot-doi-tuong-lop-con-vao-bien-kieu-lop-cha-theo-gia-tri-dan-toi-dieu-gi
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gán một đối tượng lớp con vào biến kiểu lớp cha theo giá trị dẫn tới điều gì?

## Đáp án trắc nghiệm
- [x] Phần dữ liệu riêng của lớp con bị cắt bỏ
- [ ] Trình biên dịch từ chối phép gán này
- [ ] Chương trình dừng ngay lập tức khi chạy tới dòng đó
- [ ] Đối tượng vẫn giữ hành vi đa hình của lớp con

## Giải thích (VI)
Phần dữ liệu và hành vi riêng của lớp con bị cắt bỏ : biến chỉ đủ chỗ cho phần lớp cha. Mã biên dịch trót lọt và không có lỗi lúc chạy, nên đây là loại lỗi âm thầm và khó phát hiện.

### Giải thích các phương án:
- **Phần dữ liệu riêng của lớp con bị cắt bỏ** (Đúng): Biến chỉ đủ chỗ cho phần lớp cha nên các trường thêm của lớp con không được sao chép.
- **Trình biên dịch từ chối phép gán này** (Sai): Phép gán hợp lệ và biên dịch bình thường.
- **Chương trình dừng ngay lập tức khi chạy tới dòng đó** (Sai): Không có lỗi lúc chạy, đó chính là điều nguy hiểm.
- **Đối tượng vẫn giữ hành vi đa hình của lớp con** (Sai): Sau khi bị cắt, lời gọi hàm ảo dùng cài đặt của lớp cha.
