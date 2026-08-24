---
id: quiz-sql-cte-menh-de-with-trong-sql-dung-de-lam-gi
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CTE (mệnh đề WITH) trong SQL dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] CTE là cú pháp thay thế cho VIEW — mỗi WITH tự động tạo một view lưu trong schema của database
- [x] Đặt tên cho một subquery để chẻ truy vấn phức tạp thành các bước dễ đọc
- [ ] Tạo một bảng tạm được lưu xuống đĩa và tồn tại đến hết phiên làm việc để các truy vấn sau dùng lại
- [ ] CTE luôn được materialize thành kết quả trung gian riêng, nên luôn chậm hơn viết subquery lồng trực tiếp

## Giải thích (VI)
CTE (mệnh đề WITH) đặt tên cho một subquery để chẻ truy vấn phức tạp thành các bước có tên, dễ đọc, và tham chiếu được nhiều lần trong cùng câu lệnh. Nó chỉ tồn tại trong phạm vi một câu lệnh — không phải bảng tạm hay view. Từ PostgreSQL 12, CTE thường được inline vào truy vấn chính khi tối ưu, nên hiệu năng tương đương subquery; dạng WITH RECURSIVE xử lý dữ liệu phân cấp.

### Giải thích các phương án:
- **CTE là cú pháp thay thế cho VIEW — mỗi WITH tự động tạo một view lưu trong schema của database** (Sai): CTE không tạo object nào trong schema — nó là cấu trúc cục bộ của một câu lệnh; VIEW mới là truy vấn được đặt tên lưu bền trong database.
- **Đặt tên cho một subquery để chẻ truy vấn phức tạp thành các bước dễ đọc** (Đúng): PostgreSQL hiện đại thường tự inline CTE khi tối ưu. Đúng: giá trị chính của CTE là khả năng đọc và tái sử dụng trong một câu lệnh; từ PostgreSQL 12, CTE không còn mặc định là hàng rào tối ưu hóa. Nó tham chiếu được nhiều lần trong câu lệnh chính, và PostgreSQL hiện đại thường tự inline CTE khi tối ưu.
- **Tạo một bảng tạm được lưu xuống đĩa và tồn tại đến hết phiên làm việc để các truy vấn sau dùng lại** (Sai): Đó là temporary table — CTE chỉ tồn tại trong phạm vi đúng một câu lệnh, không lưu bền và không dùng lại được ở câu lệnh khác.
- **CTE luôn được materialize thành kết quả trung gian riêng, nên luôn chậm hơn viết subquery lồng trực tiếp** (Sai): Từ PostgreSQL 12, CTE không tham chiếu nhiều lần thường được inline vào truy vấn chính — hiệu năng tương đương subquery; materialize chỉ khi cần hoặc khai báo MATERIALIZED.
