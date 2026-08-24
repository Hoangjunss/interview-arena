---
id: denormalization-la-gi-va-khi-nao-nen-chap-nhan-du-lieu-du-thua
position: backend
technology: normalization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Denormalization là gì và khi nào nên chấp nhận dữ liệu dư thừa?

## Question (EN)
What is denormalization and when should you accept redundant data?

## Đáp án chi tiết (VI)
Denormalization là việc **cố ý thêm dữ liệu dư thừa** (nhân bản cột, lưu giá trị đã tính sẵn) để **giảm số `JOIN`** và tăng tốc đọc.\
\
Đánh đổi:\
- **Lợi**: đọc nhanh hơn (ít JOIN/aggregate lúc query), hợp báo cáo/analytics đọc nhiều.\
- **Hại**: ghi phức tạp hơn — phải cập nhật nhiều nơi để tránh dữ liệu lệch; tốn dung lượng; rủi ro bất nhất.\
\
Khi nào dùng: hệ **đọc nhiều hơn ghi**, có điểm nghẽn hiệu năng đã đo được, hoặc cần precompute (đếm like, tổng tiền đơn). Nguyên tắc: **chuẩn hóa trước, denormalize sau khi có số liệu** chứng minh cần — đừng tối ưu sớm. Materialized view là một dạng denormalization có kiểm soát. Một dạng khác là **snapshot**: nhúng dữ liệu tại thời điểm giao dịch (địa chỉ giao hàng lưu ngay trong đơn) — lịch sử cần ảnh chụp lúc đó, không phải giá trị hiện tại.

## Detailed Answer (EN)
Denormalization **deliberately introduces redundant data** (duplicating columns, storing precomputed values) to **reduce `JOIN`s** and speed up reads.\
\
Trade-offs:\
- **Pros**: faster reads (fewer JOINs/aggregations at query time), good for read-heavy reporting/analytics.\
- **Cons**: writes get harder — you must update several places to avoid drift; more storage; risk of inconsistency.\
\
When to use: **read-heavy** systems, a measured performance bottleneck, or when you need precomputed values (like counts, order totals). Rule: **normalize first, denormalize only once data proves the need** — don't optimize early. A materialized view is a controlled form of denormalization. Another form is the **snapshot**: embed data as it was at transaction time (the shipping address stored on the order) — history needs the snapshot then, not the current value.
