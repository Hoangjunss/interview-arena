---
id: quiz-python-mutable-default-argument-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutable default argument — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] [1] [2]
- [x] [1] [1, 2]
- [ ] [1, 2] [1, 2]
- [ ] Lỗi runtime

## Giải thích (VI)
In ra [1] rồi [1, 2]. Giá trị mặc định của tham số được đánh giá MỘT lần lúc def, không phải mỗi lần gọi. acc là cùng một list khả biến (mutable) được chia sẻ, nên lần gọi thứ hai vẫn thấy phần tử của lần đầu — bẫy "mutable default argument" kinh điển.

### Giải thích các phương án:
- **[1] [2]** (Sai): Sai — default arg không được tạo mới mỗi lần gọi.
- **[1] [1, 2]** (Đúng): Default list được tạo MỘT lần khi định nghĩa hàm và dùng lại giữa các lần gọi.
- **[1, 2] [1, 2]** (Sai): Sai — lần gọi đầu acc mới có 1 phần tử.
- **Lỗi runtime** (Sai): Không có lỗi; code chạy bình thường.
