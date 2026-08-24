---
id: normalization-va-denormalization-la-gi-danh-doi-ra-sao
position: backend
technology: schema-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Normalization và denormalization là gì? Đánh đổi ra sao?

## Question (EN)
What are normalization and denormalization, and what is the trade-off?

## Đáp án chi tiết (VI)
**Normalization**: tổ chức dữ liệu để **loại trùng lặp** — tách thành nhiều bảng liên kết bằng khóa, mỗi dữ kiện lưu một chỗ (theo các dạng chuẩn 1NF/2NF/3NF).\
- Lợi: ghi/cập nhật gọn, tránh dữ liệu mâu thuẫn, tiết kiệm dung lượng.\
- Hại: đọc phải `JOIN` nhiều bảng → truy vấn phức tạp và có thể chậm.\
\
**Denormalization**: cố ý **thêm dữ liệu trùng** (gộp bảng, lưu giá trị tính sẵn) để đọc nhanh, ít `JOIN`.\
- Lợi: đọc nhanh, hợp báo cáo/analytics/đọc nhiều.\
- Hại: dễ **lệch dữ liệu** (cùng thông tin ở nhiều nơi), ghi phức tạp, tốn dung lượng.\
\
Chốt: hệ giao dịch (OLTP) thường chuẩn hóa để đúng đắn; nơi đọc chi phối/analytics thì bỏ chuẩn có chọn lọc để tăng tốc.

## Detailed Answer (EN)
**Normalization**: organize data to **remove duplication** — split into related tables joined by keys, each fact stored once (per the normal forms 1NF/2NF/3NF).\
- Pros: compact writes/updates, avoids contradictory data, saves space.\
- Cons: reads must `JOIN` many tables → more complex and potentially slower queries.\
\
**Denormalization**: deliberately **add redundant data** (merge tables, store precomputed values) so reads are fast with fewer `JOIN`s.\
- Pros: fast reads, fits reporting/analytics/read-heavy loads.\
- Cons: risks **inconsistent data** (same fact in many places), more complex writes, more storage.\
\
Bottom line: transactional (OLTP) systems usually normalize for correctness; read-dominated/analytics systems selectively denormalize for speed.
