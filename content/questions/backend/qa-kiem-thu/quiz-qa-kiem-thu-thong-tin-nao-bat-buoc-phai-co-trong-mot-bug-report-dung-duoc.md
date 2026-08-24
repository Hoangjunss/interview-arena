---
id: quiz-qa-kiem-thu-thong-tin-nao-bat-buoc-phai-co-trong-mot-bug-report-dung-duoc
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thông tin nào bắt buộc phải có trong một bug report dùng được?

## Đáp án trắc nghiệm
- [ ] Tên người chịu trách nhiệm gây ra lỗi
- [ ] Đánh giá thời gian cần để sửa lỗi
- [x] Bước tái hiện, kết quả mong đợi và thực tế
- [ ] Đoạn code nghi ngờ gây ra lỗi

## Giải thích (VI)
Tối thiểu: các bước tái hiện , kết quả mong đợi , kết quả thực tế , kèm môi trường (phiên bản, trình duyệt, tài khoản, dữ liệu) và bằng chứng. Thiếu bước tái hiện thì bug gần như chắc chắn bị trả lại.

### Giải thích các phương án:
- **Tên người chịu trách nhiệm gây ra lỗi** (Sai): Quy trách nhiệm cá nhân làm hỏng văn hóa chất lượng và không giúp sửa lỗi.
- **Đánh giá thời gian cần để sửa lỗi** (Sai): Ước lượng công sức sửa là việc của người sửa.
- **Bước tái hiện, kết quả mong đợi và thực tế** (Đúng): Không có ba mục này thì developer không tái hiện và không biết đâu là hành vi đúng.
- **Đoạn code nghi ngờ gây ra lỗi** (Sai): Hữu ích nếu có nhưng không bắt buộc và không phải việc của tester.
