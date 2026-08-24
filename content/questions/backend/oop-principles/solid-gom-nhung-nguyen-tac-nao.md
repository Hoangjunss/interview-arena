---
id: solid-gom-nhung-nguyen-tac-nao
position: backend
technology: oop-principles
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SOLID gồm những nguyên tắc nào?

## Question (EN)
What are the SOLID principles?

## Đáp án chi tiết (VI)
Năm nguyên tắc thiết kế hướng đối tượng giúp code **dễ bảo trì, mở rộng, ít coupling** (Robert C. Martin tổng hợp):\
\
- **S – Single Responsibility**: mỗi lớp chỉ có **một lý do để thay đổi** (một trách nhiệm).\
- **O – Open/Closed**: **mở để mở rộng, đóng để sửa đổi** — thêm tính năng bằng code mới, không sửa code đã chạy ổn (thường qua abstraction/polymorphism).\
- **L – Liskov Substitution**: đối tượng lớp con phải **thay thế được** lớp cha mà không phá vỡ hành vi mong đợi.\
- **I – Interface Segregation**: nhiều interface **nhỏ, chuyên biệt** tốt hơn một interface to; client không bị buộc phụ thuộc phương thức nó không dùng.\
- **D – Dependency Inversion**: module cấp cao phụ thuộc vào **abstraction**, không vào chi tiết cụ thể (nền tảng của dependency injection).\
\
Mục tiêu chung: giảm coupling, tăng cohesion, dễ test và thay đổi. Là công cụ tư duy, không phải luật cứng — cân bằng với YAGNI/KISS.

## Detailed Answer (EN)
Five object-oriented design principles for **maintainable, extensible, low-coupling** code (compiled by Robert C. Martin):\
\
- **S – Single Responsibility**: a class should have **one reason to change** (one responsibility).\
- **O – Open/Closed**: **open for extension, closed for modification** — add features with new code, not by editing working code (usually via abstraction/polymorphism).\
- **L – Liskov Substitution**: subclass objects must be **substitutable** for their base class without breaking expected behavior.\
- **I – Interface Segregation**: many **small, focused** interfaces beat one large one; clients should not depend on methods they do not use.\
- **D – Dependency Inversion**: high-level modules depend on **abstractions**, not concrete details (the basis of dependency injection).\
\
Overall goal: reduce coupling, increase cohesion, ease testing and change. They are thinking tools, not hard laws — balance against YAGNI/KISS.
