---
id: quiz-sql-voi-composite-index-duoi-day-nhng-phat-bieu-nao-dung-chon-nhieu-dap-an
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với composite index dưới đây, những phát biểu nào đúng? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [ ] Index (customer id, created at) đã bao gồm cả index trên riêng created at, nên không bao giờ cần tạo thêm index cho cột này
- [ ] Truy vấn WHERE created at >= '2026-01-01' (không lọc customer id) cũng dùng index này hiệu quả vì created at có mặt trong index
- [x] Truy vấn WHERE customer id = 42 dùng index này hiệu quả — điều kiện khớp cột đứng đầu (leftmost prefix)

## Giải thích (VI)
Index (customer id, created at) sắp theo customer id trước, trong mỗi customer sắp tiếp theo created at. Nó phục vụ tốt: lọc theo customer id; lọc customer id kết hợp khoảng created at; và ORDER BY created at trong phạm vi một customer (khỏi sort). Nó không giúp truy vấn chỉ lọc created at — giá trị nằm rải rác khắp cây (quy tắc leftmost prefix), và không thay được index riêng trên created at.

### Giải thích các phương án:
- **Index (customer id, created at) đã bao gồm cả index trên riêng created at, nên không bao giờ cần tạo thêm index cho cột này** (Sai): Sai — composite index chỉ thay thế được index trên các prefix bên trái (ở đây là riêng customer id); truy vấn thường xuyên lọc chỉ theo created at cần index riêng cho nó.
- **Truy vấn WHERE created at >= '2026-01-01' (không lọc customer id) cũng dùng index này hiệu quả vì created at có mặt trong index** (Sai): Sai — index sắp theo customer id trước; các giá trị created at nằm rải rác khắp cây theo từng customer, không có vùng liền mạch để quét — vi phạm quy tắc leftmost prefix.
- **Truy vấn WHERE customer id = 42 dùng index này hiệu quả — điều kiện khớp cột đứng đầu (leftmost prefix)** (Đúng): Đúng — index sắp theo customer id trước nên mọi dòng của một customer nằm liền kề nhau trong cây; lọc theo cột đầu là trường hợp lý tưởng.
