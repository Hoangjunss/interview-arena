---
id: quiz-security-cach-chac-chan-nhat-de-chan-sql-injection-la-gi
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách chắc chắn nhất để chặn SQL injection là gì?

## Đáp án trắc nghiệm
- [x] Prepared statement có tham số, không ghép chuỗi
- [ ] Chỉ cho phép ký tự chữ và số trong mọi trường nhập của form
- [ ] Escape dấu nháy đơn trước khi ghép vào câu lệnh
- [ ] Lọc bỏ các từ khoá SQL nguy hiểm trong đầu vào

## Giải thích (VI)
Prepared statement / tham số hoá : WHERE email = $1 rồi truyền giá trị riêng. DB coi tham số là dữ liệu thuần, không bao giờ phân tích nó thành câu lệnh — nên không có cách nào chèn SQL vào.

### Giải thích các phương án:
- **Prepared statement có tham số, không ghép chuỗi** (Đúng): DB phân biệt rõ câu lệnh và dữ liệu nên dữ liệu không bao giờ thành câu lệnh.
- **Chỉ cho phép ký tự chữ và số trong mọi trường nhập của form** (Sai): Chặn được nhiều thứ nhưng phá dữ liệu hợp lệ như tên có dấu.
- **Escape dấu nháy đơn trước khi ghép vào câu lệnh** (Sai): Escape bằng tay dễ sai, nhất là với số và tên bảng.
- **Lọc bỏ các từ khoá SQL nguy hiểm trong đầu vào** (Sai): Danh sách đen luôn thiếu và có nhiều cách viết vòng để lách qua.
