---
id: ke-thua-inheritance-trong-php-la-gi
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kế thừa (inheritance) trong PHP là gì?

## Question (EN)
What is inheritance in PHP?

## Đáp án chi tiết (VI)
Kế thừa cho phép class con kế thừa thuộc tính và phương thức từ class cha, giúp tái sử dụng code. Dùng `class Student extends User` để kế thừa. Class con có thể truy cập các thành phần public và protected của cha, override phương thức cha, và thêm chức năng mới. Gọi phương thức cha bằng `parent::methodName()`. \
\
**Ví dụ:** `class Admin extends User` nghĩa là Admin có tất cả thuộc tính của User nhưng bổ sung thêm các phương thức đặc thù của admin. Giúp giảm trùng lặp code và tạo ra cấu trúc phân cấp hợp lý.

## Detailed Answer (EN)
Inheritance allows a child class to inherit properties and methods from a parent class, promoting code reuse. Use `class Student extends User` to inherit. The child class can access public and protected members of parent, override parent methods, and add new functionality. Use parent::methodName() to call parent's version. \
\
**Example:** `class Admin extends User` means Admin gets User's properties but can have additional admin-specific methods. Reduces code duplication and creates logical hierarchies.
