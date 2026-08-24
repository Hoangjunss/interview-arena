---
id: quiz-react-native-danh-sach-anh-lam-ung-dung-bi-dong-vi-thieu-bo-nho-nguyen-nhan-thuong-gap-nhat
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Danh sách ảnh làm ứng dụng bị đóng vì thiếu bộ nhớ. Nguyên nhân thường gặp nhất?

## Đáp án trắc nghiệm
- [ ] Thiếu khoá ổn định cho từng phần tử danh sách
- [ ] Danh sách giữ quá nhiều dòng trong bộ nhớ
- [x] Ảnh giải mã ở kích thước gốc dù hiển thị nhỏ
- [ ] Ảnh được tải lại nhiều lần từ server

## Giải thích (VI)
Ảnh chiếm bộ nhớ theo kích thước điểm ảnh thật sau khi giải mã , không theo kích thước hiển thị. Một ảnh bốn nghìn điểm ảnh hiển thị trong ô một trăm điểm vẫn tốn như ảnh gốc, nên phải yêu cầu server trả ảnh đúng cỡ hoặc thu nhỏ trước khi hiển thị.

### Giải thích các phương án:
- **Thiếu khoá ổn định cho từng phần tử danh sách** (Sai): Thiếu khoá gây lỗi hiển thị chứ không phải áp lực bộ nhớ.
- **Danh sách giữ quá nhiều dòng trong bộ nhớ** (Sai): Danh sách có dựng lười đã giới hạn số dòng sống.
- **Ảnh giải mã ở kích thước gốc dù hiển thị nhỏ** (Đúng): Bộ nhớ chiếm theo kích thước điểm ảnh thật, nên ảnh lớn hiển thị nhỏ vẫn tốn như ảnh lớn.
- **Ảnh được tải lại nhiều lần từ server** (Sai): Tải lại tốn băng thông nhưng không giữ bộ nhớ lâu.
