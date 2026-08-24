---
id: quiz-testing-mot-test-luc-pass-luc-fail-cach-xu-ly-dung-la-gi
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một test lúc pass lúc fail. Cách xử lý đúng là gì?

## Đáp án trắc nghiệm
- [ ] Bật retry cho riêng test đó để CI không còn đỏ nữa
- [x] Tìm nguyên nhân: chờ theo thời gian hoặc trạng thái dùng chung
- [ ] Tăng timeout lên cho tới khi test luôn pass ở mọi lần chạy
- [ ] Xoá test đó vì nó không đáng tin cậy

## Giải thích (VI)
Điều tra nguyên nhân. Bốn nguồn phổ biến: chờ theo thời gian cố định (sleep 100), trạng thái dùng chung giữa các test, thứ tự chạy (test này phụ thuộc test kia), và thời gian/múi giờ . Retry chỉ nên là biện pháp tạm trong lúc đang sửa.

### Giải thích các phương án:
- **Bật retry cho riêng test đó để CI không còn đỏ nữa** (Sai): Che triệu chứng và bỏ qua một lỗi có thể là thật trong code.
- **Tìm nguyên nhân: chờ theo thời gian hoặc trạng thái dùng chung** (Đúng): Bật retry để che đi sẽ làm mất niềm tin vào toàn bộ bộ test.
- **Tăng timeout lên cho tới khi test luôn pass ở mọi lần chạy** (Sai): Đôi khi đúng, nhưng thường chỉ làm test chậm mà vẫn còn flaky.
- **Xoá test đó vì nó không đáng tin cậy** (Sai): Mất luôn phần bảo vệ mà test đó đang cung cấp.
