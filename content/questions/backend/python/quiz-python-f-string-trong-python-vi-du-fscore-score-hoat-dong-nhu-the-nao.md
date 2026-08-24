---
id: quiz-python-f-string-trong-python-vi-du-fscore-score-hoat-dong-nhu-the-nao
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
f-string trong Python (ví dụ f"Score: {score}") hoạt động như thế nào?

## Đáp án trắc nghiệm
- [ ] Chuỗi có {} nào cũng tự nội suy biến, không cần tiền tố f
- [ ] f-string được đánh giá lại mỗi lần chuỗi được in, nên giá trị luôn mới nhất
- [ ] {} trong f-string chỉ nhận tên biến, không nhận biểu thức hay gọi hàm
- [x] Tiền tố f cho phép nhúng biểu thức trong {}

## Giải thích (VI)
f-string (Python 3.6+) là chuỗi có tiền tố f, cho phép nhúng biểu thức trong {}: f"Score: {score}, 2+3={2+3}" đánh giá biểu thức ngay tại dòng đó và chèn kết quả vào chuỗi. Hỗ trợ format spec sau dấu hai chấm: f"{price:.2f}" (2 chữ số thập phân). Thiếu tiền tố f thì {score} in ra nguyên văn. Đây là cách format chuỗi được khuyến nghị thay cho % và .format().

### Giải thích các phương án:
- **Chuỗi có {} nào cũng tự nội suy biến, không cần tiền tố f** (Sai): Thiếu tiền tố f thì "Score: {score}" in ra nguyên văn {score}; chỉ f-string (hoặc .format() gọi tường minh) mới thay giá trị.
- **f-string được đánh giá lại mỗi lần chuỗi được in, nên giá trị luôn mới nhất** (Sai): f-string đánh giá MỘT lần tại dòng tạo chuỗi; kết quả là chuỗi tĩnh, biến đổi sau đó không cập nhật vào chuỗi đã tạo.
- **{} trong f-string chỉ nhận tên biến, không nhận biểu thức hay gọi hàm** (Sai): f-string nhận biểu thức bất kỳ: f"{2+3}", f"{name.upper()}", f"{len(items)}" đều hợp lệ.
- **Tiền tố f cho phép nhúng biểu thức trong {}** (Đúng): Biểu thức được đánh giá tại thời điểm tạo chuỗi và chèn kết quả vào. Đúng: f"2+3={2+3}" cho "2+3=5" — nội dung trong {} là biểu thức Python thật, được đánh giá ngay khi dòng đó chạy.
