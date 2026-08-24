---
id: quiz-android-kotlin-vi-sao-chuoi-hien-thi-nen-dat-trong-tep-tai-nguyen-thay-vi-viet-thang-trong-ma
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao chuỗi hiển thị nên đặt trong tệp tài nguyên thay vì viết thẳng trong mã?

## Đáp án trắc nghiệm
- [ ] Để giảm dung lượng gói cài đặt
- [ ] Để tăng tốc độ hiển thị văn bản
- [ ] Để chuỗi không bị đọc được khi dịch ngược
- [x] Để dịch được và sửa ở một chỗ

## Giải thích (VI)
Tài nguyên cho phép dịch theo ngôn ngữ thiết bị mà không cần điều kiện trong mã, và cho phép sửa nội dung ở một chỗ. Hệ thống tự chọn tệp phù hợp theo ngôn ngữ, vùng, mật độ màn hình và chế độ tối.

### Giải thích các phương án:
- **Để giảm dung lượng gói cài đặt** (Sai): Khác biệt dung lượng là không đáng kể.
- **Để tăng tốc độ hiển thị văn bản** (Sai): Không có ảnh hưởng nào tới tốc độ vẽ.
- **Để chuỗi không bị đọc được khi dịch ngược** (Sai): Chuỗi trong tài nguyên vẫn đọc được dễ dàng.
- **Để dịch được và sửa ở một chỗ** (Đúng): Hệ thống tự chọn tệp theo ngôn ngữ thiết bị nên không phải viết điều kiện trong mã.
