---
id: quiz-python-cau-lenh-with-obj-as-x-goi-nhng-phuong-thuc-nao-cua-obj-va-bao-dam-dieu-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Câu lệnh with obj as x: gọi những phương thức nào của obj, và bảo đảm điều gì?

## Đáp án trắc nghiệm
- [ ] Gọi __init__() khi vào và __del__() khi ra
- [x] Gọi __enter__() khi vào khối và __exit__() khi rời khối, kể cả khi có exception
- [ ] Chỉ gọi __enter__(); việc dọn dẹp phải viết tay sau khối
- [ ] __exit__() chỉ chạy khi khối kết thúc bình thường, không chạy nếu có exception

## Giải thích (VI)
with gọi __enter__() khi vào khối (giá trị trả về gán cho tên sau as) và __exit__(exc_type, exc, tb) khi rời khối. __exit__ được bảo đảm chạy kể cả khi có exception — như một finally ngầm — nên dùng để đóng file, nhả lock, đóng kết nối một cách an toàn. Nếu __exit__ trả về giá trị truthy, exception bị chặn lại.

### Giải thích các phương án:
- **Gọi __init__() khi vào và __del__() khi ra** (Sai): __init__ chạy lúc tạo object (trước with), __del__ chạy khi bị GC — không phải giao thức của with.
- **Gọi __enter__() khi vào khối và __exit__() khi rời khối, kể cả khi có exception** (Đúng): Đây đúng là giao thức context manager: __enter__/__exit__, và __exit__ luôn chạy (như một finally) để giải phóng tài nguyên an toàn. Giá trị __enter__() trả về được gán cho x; __exit__() chạy như một finally nên tài nguyên luôn được giải phóng.
- **Chỉ gọi __enter__(); việc dọn dẹp phải viết tay sau khối** (Sai): Mục đích chính của with là tự gọi __exit__ để dọn dẹp, không cần code thủ công.
- **__exit__() chỉ chạy khi khối kết thúc bình thường, không chạy nếu có exception** (Sai): Ngược lại: __exit__ chạy CẢ khi có exception, nhận thông tin exception và có thể "nuốt" nó nếu trả về giá trị truthy.
