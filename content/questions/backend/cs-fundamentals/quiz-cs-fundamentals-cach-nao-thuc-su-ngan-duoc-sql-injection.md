---
id: quiz-cs-fundamentals-cach-nao-thuc-su-ngan-duoc-sql-injection
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách nào thực sự ngăn được SQL injection?

## Đáp án trắc nghiệm
- [ ] Chạy ứng dụng với tài khoản cơ sở dữ liệu chỉ có quyền đọc
- [ ] Giới hạn độ dài trường nhập để câu lệnh chèn thêm không đủ chỗ
- [x] Dùng prepared statement với tham số ràng buộc cho mọi giá trị
- [ ] Loại bỏ dấu nháy đơn và từ khoá SQL khỏi dữ liệu đầu vào

## Giải thích (VI)
Prepared statement với tham số ràng buộc. Cơ sở dữ liệu phân tích cấu trúc câu lệnh trước, rồi nhận tham số như dữ liệu thuần — chuỗi độc hại không còn cơ hội được hiểu là cú pháp. Lọc ký tự hay danh sách chặn từ khoá đều là biện pháp bổ trợ có kẽ hở, không thay thế được tham số hoá.

### Giải thích các phương án:
- **Chạy ứng dụng với tài khoản cơ sở dữ liệu chỉ có quyền đọc** (Sai): Giới hạn quyền làm giảm thiệt hại nhưng không ngăn được injection; kẻ tấn công vẫn đọc trộm được toàn bộ dữ liệu qua truy vấn bị chèn.
- **Giới hạn độ dài trường nhập để câu lệnh chèn thêm không đủ chỗ** (Sai): Payload injection có thể rất ngắn — 1 OR 1=1 đã đủ để phá điều kiện WHERE — nên giới hạn độ dài không phải biện pháp phòng vệ.
- **Dùng prepared statement với tham số ràng buộc cho mọi giá trị** (Đúng): Server phân tích câu lệnh trước rồi mới nhận tham số như giá trị thuần; chuỗi độc hại nằm nguyên trong giá trị nên không đổi được cấu trúc truy vấn.
- **Loại bỏ dấu nháy đơn và từ khoá SQL khỏi dữ liệu đầu vào** (Sai): Danh sách chặn luôn có kẽ hở: mã hoá khác nhau, chú thích, hàm chuyển kiểu và toán tử vẫn tấn công được mà không cần nháy đơn hay từ khoá bị chặn.
