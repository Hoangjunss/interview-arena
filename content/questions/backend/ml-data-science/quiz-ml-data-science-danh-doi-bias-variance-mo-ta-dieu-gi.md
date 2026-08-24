---
id: quiz-ml-data-science-danh-doi-bias-variance-mo-ta-dieu-gi
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh đổi bias-variance mô tả điều gì?

## Đáp án trắc nghiệm
- [ ] Chỉ số huấn luyện luôn tương quan với chỉ số thực tế
- [ ] Dữ liệu càng nhiều thì lỗi càng giảm đều
- [x] Quá đơn giản thì thiên lệch, quá phức tạp thì dao động
- [ ] Mô hình phức tạp luôn tốt hơn mô hình đơn giản

## Giải thích (VI)
Lỗi của mô hình có hai nguồn kéo ngược nhau: bias (mô hình quá đơn giản, bỏ sót quy luật thật) và variance (mô hình quá nhạy với dữ liệu huấn luyện cụ thể). Giảm cái này thường làm tăng cái kia, nên phải tìm điểm cân bằng.

### Giải thích các phương án:
- **Chỉ số huấn luyện luôn tương quan với chỉ số thực tế** (Sai): Điểm huấn luyện cao có thể đi cùng hiệu năng thực tế kém.
- **Dữ liệu càng nhiều thì lỗi càng giảm đều** (Sai): Là quan sát khác, không phải nội dung của đánh đổi này.
- **Quá đơn giản thì thiên lệch, quá phức tạp thì dao động** (Đúng): Hai nguồn lỗi kéo ngược chiều nhau theo độ phức tạp mô hình.
- **Mô hình phức tạp luôn tốt hơn mô hình đơn giản** (Sai): Phức tạp quá mức làm tăng lỗi trên dữ liệu mới.
