---
id: quiz-mongodb-aggregation-pipeline-duoi-day-lam-gi
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Aggregation pipeline dưới đây làm gì?

## Đáp án trắc nghiệm
- [ ] Đếm số người dùng có đơn đã thanh toán, không tính tiền
- [ ] Lấy 10 đơn hàng có giá trị lớn nhất trong toàn bộ collection
- [x] Gộp đơn đã thanh toán theo người, lấy top 10 chi nhiều nhất
- [ ] Xóa các đơn chưa thanh toán rồi trả về 10 đơn còn lại

## Giải thích (VI)
Nó tính top 10 người dùng chi nhiều nhất: $match lọc đơn đã thanh toán, $group gộp theo userId tính tổng tiền và đếm số đơn, $sort sắp giảm dần theo tổng, $limit lấy 10. Mỗi giai đoạn nhận đầu ra của giai đoạn trước.

### Giải thích các phương án:
- **Đếm số người dùng có đơn đã thanh toán, không tính tiền** (Sai): Pipeline có $sum: "$amount" nên tổng tiền được tính.
- **Lấy 10 đơn hàng có giá trị lớn nhất trong toàn bộ collection** (Sai): $group đã gộp theo userId nên kết quả là theo người dùng, không phải đơn.
- **Gộp đơn đã thanh toán theo người, lấy top 10 chi nhiều nhất** (Đúng): Đúng trình tự bốn giai đoạn: lọc đơn đã thanh toán, gộp theo từng người dùng để tính tổng tiền và số đơn, sắp giảm dần theo tổng tiền, rồi lấy 10 người đầu.
- **Xóa các đơn chưa thanh toán rồi trả về 10 đơn còn lại** (Sai): Aggregation chỉ đọc; $match là lọc chứ không xóa gì.
