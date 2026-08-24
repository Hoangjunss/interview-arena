---
id: primary-constructor-trong-c-12-la-gi-va-no-giai-quyet-van-de-gi
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Primary constructor trong C# 12 là gì và nó giải quyết vấn đề gì?

## Question (EN)
What are primary constructors in C# 12 and what problems do they solve?

## Đáp án chi tiết (VI)
Primary constructor cho phép khai báo tham số constructor trực tiếp trên class/struct: `public class Person(string name, int age) {}`. Các tham số này có phạm vi dùng được trong toàn bộ class body. Giúp loại bỏ boilerplate khởi tạo field lặp đi lặp lại, code gọn hơn cho data class. Không chỉ dành cho record — từ C# 12 áp dụng cho mọi class/struct. \
\
**Lưu ý:** compiler không tự tạo backing field trong non-record class, cần tự gán tham số vào field khi cần lưu trữ.

## Detailed Answer (EN)
Primary constructors allow declaring constructor parameters directly on class/struct declarations: `public class Person(string name, int age) {}`. Parameters are in scope throughout the class body, eliminating repetitive field initialization boilerplate and improving readability for data classes. Not limited to records — available on all classes/structs since C# 12. \
\
**Note:** compiler does not auto-generate backing fields in non-record classes; assign parameters to fields manually when storage is needed.
