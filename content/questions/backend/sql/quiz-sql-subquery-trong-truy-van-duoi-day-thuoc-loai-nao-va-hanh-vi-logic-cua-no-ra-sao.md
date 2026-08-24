---
id: quiz-sql-subquery-trong-truy-van-duoi-day-thuoc-loai-nao-va-hanh-vi-logic-cua-no-ra-sao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Subquery trong truy vấn dưới đây thuộc loại nào và hành vi logic của nó ra sao?

## Đáp án trắc nghiệm
- [ ] Scalar subquery — nó phải trả về đúng một giá trị SELECT 1, nếu có nhiều dòng khớp sẽ gây lỗi runtime
- [ ] Subquery không tương quan — nó chạy độc lập một lần duy nhất rồi truy vấn ngoài dùng lại kết quả
- [x] Correlated subquery — nó tham chiếu cột c.id của truy vấn ngoài
- [ ] Lỗi cú pháp — subquery bên trong EXISTS không được phép tham chiếu bảng của truy vấn ngoài

## Giải thích (VI)
Đây là correlated subquery (subquery tương quan): nó tham chiếu cột c.id của truy vấn ngoài nên về logic phải đánh giá lại cho mỗi dòng customers. EXISTS trả true ngay khi tìm thấy dòng đầu tiên khớp (short-circuit), không cần đọc hết. Ngược lại, subquery không tương quan chạy độc lập một lần. Optimizer thường viết lại correlated subquery thành semi-join nên hiệu năng thực tế thường tốt.

### Giải thích các phương án:
- **Scalar subquery — nó phải trả về đúng một giá trị SELECT 1, nếu có nhiều dòng khớp sẽ gây lỗi runtime** (Sai): EXISTS chỉ kiểm tra sự tồn tại của dòng, không đọc giá trị trả về — nhiều dòng khớp không gây lỗi; SELECT 1 chỉ là quy ước viết gọn.
- **Subquery không tương quan — nó chạy độc lập một lần duy nhất rồi truy vấn ngoài dùng lại kết quả** (Sai): Subquery này tham chiếu c.id từ truy vấn ngoài nên không thể chạy độc lập — đó chính là điểm phân biệt với subquery không tương quan.
- **Correlated subquery — nó tham chiếu cột c.id của truy vấn ngoài** (Đúng): EXISTS trả true ngay khi tìm thấy một dòng khớp. Đúng: tham chiếu tới cột của truy vấn ngoài là dấu hiệu định nghĩa của correlated subquery, và EXISTS dừng ngay khi có dòng đầu tiên khớp. Về mặt logic nó phải được đánh giá lại cho từng dòng customers, và EXISTS trả true ngay khi tìm thấy một dòng khớp.
- **Lỗi cú pháp — subquery bên trong EXISTS không được phép tham chiếu bảng của truy vấn ngoài** (Sai): Ngược lại: tham chiếu truy vấn ngoài trong EXISTS hoàn toàn hợp lệ và chính là cách dùng phổ biến nhất của EXISTS.
