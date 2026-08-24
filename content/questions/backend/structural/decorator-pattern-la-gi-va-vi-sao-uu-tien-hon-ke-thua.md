---
id: decorator-pattern-la-gi-va-vi-sao-uu-tien-hon-ke-thua
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Decorator pattern là gì và vì sao ưu tiên hơn kế thừa?

## Question (EN)
What is the Decorator pattern and why prefer it over inheritance?

## Đáp án chi tiết (VI)
Decorator **bọc** một đối tượng bằng một đối tượng khác cùng interface để **thêm hành vi lúc chạy** mà không sửa lớp gốc. Vì cùng interface, có thể **lồng nhiều lớp bọc** để cộng dồn tính năng.\
\
Ví dụ: một `DataSource` được bọc bởi `EncryptionDecorator` rồi `CompressionDecorator`; hay `Coffee` được bọc `Milk`, `Sugar` để cộng giá. Mỗi decorator làm phần việc của mình rồi ủy quyền tiếp cho đối tượng bên trong.\
\
Vì sao ưu tiên hơn kế thừa:\
- Kế thừa để tổ hợp tính năng gây **bùng nổ số lớp con** (mọi kết hợp cần một lớp); decorator ghép **linh hoạt lúc chạy** bằng cách chồng lớp bọc.\
- Tuân **Open/Closed** (thêm tính năng bằng lớp mới, không sửa lớp cũ) và ưu tiên **composition over inheritance**.\
\
Ứng dụng: middleware HTTP, stream I/O (Java `BufferedInputStream`), UI wrappers.

## Detailed Answer (EN)
Decorator **wraps** an object in another object of the same interface to **add behavior at runtime** without modifying the original class. Because they share the interface, you can **nest multiple wrappers** to stack features.\
\
Example: a `DataSource` wrapped by an `EncryptionDecorator` then a `CompressionDecorator`; or a `Coffee` wrapped with `Milk`, `Sugar` to add price. Each decorator does its part then delegates to the inner object.\
\
Why prefer it over inheritance:\
- Using inheritance to combine features causes a **subclass explosion** (every combination needs a class); decorators compose **flexibly at runtime** by stacking wrappers.\
- Honors **Open/Closed** (add features via new classes, not by editing old ones) and favors **composition over inheritance**.\
\
Uses: HTTP middleware, stream I/O (Java `BufferedInputStream`), UI wrappers.
