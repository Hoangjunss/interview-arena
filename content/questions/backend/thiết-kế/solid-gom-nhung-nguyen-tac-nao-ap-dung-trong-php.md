---
id: solid-gom-nhung-nguyen-tac-nao-ap-dung-trong-php
position: backend
technology: thiết-kế
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SOLID gồm những nguyên tắc nào (áp dụng trong PHP)?

## Question (EN)
What principles make up SOLID (applied in PHP)?

## Đáp án chi tiết (VI)
Năm nguyên tắc thiết kế OOP do Robert C. Martin đúc kết:\
\
- **S — Single Responsibility:** mỗi class chỉ có **một lý do để thay đổi**. Tách logic gửi mail ra khỏi class `User`.\
- **O — Open/Closed:** **mở** cho mở rộng, **đóng** cho sửa. Thêm class `PayPalGateway` mới thay vì nhét thêm `case` vào một `switch` cũ.\
- **L — Liskov Substitution:** object class con phải **thay được** cho class cha mà không phá hành vi mong đợi.\
- **I — Interface Segregation:** nhiều **interface nhỏ, chuyên biệt** tốt hơn một interface cồng kềnh buộc class phải cài method không dùng.\
- **D — Dependency Inversion:** phụ thuộc vào **abstraction (interface)**, không vào class cụ thể.\
\
```php\
class ReportService {\
  public function __construct(private MailerInterface $mailer) {}\
  // inject interface, không `new SmtpMailer()` bên trong → dễ đổi/mock\
}\
```\
\
Trong Laravel, **service container** tự inject dependency qua type-hint ở constructor — đó chính là DIP áp dụng ở tầng framework.

## Detailed Answer (EN)
$82
