---
id: normalization-va-denormalization-la-gi-trade-off-va-khi-nao-dung-moi-ky-thuat
position: system-design
technology: data-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Normalization và Denormalization là gì? Trade-off và khi nào dùng mỗi kỹ thuật?

## Question (EN)
What are Normalization and Denormalization? What are the trade-offs and when should you use each?

## Đáp án chi tiết (VI)
Normalization là quá trình tổ chức database để giảm data redundancy và dependency thông qua các Normal Forms (1NF, 2NF, 3NF, BCNF) – chia data thành nhiều tables liên quan, tránh duplicate data. \
\
**Lợi ích:** storage hiệu quả, dễ maintain consistency khi update (chỉ cần update một chỗ), ít risk inconsistency. \
\
**Nhược điểm:** cần nhiều JOINs để reconstruct data, JOINs tốn kém ở scale lớn. Denormalization là cố tình thêm redundant data để tăng read performance – ví dụ lưu username trong bảng posts thay vì JOIN với bảng users mỗi lần query. \
\
**Lợi ích:** read queries nhanh hơn đáng kể, đơn giản hóa query. \
\
**Nhược điểm:** duplicate data tốn storage, phức tạp khi update (phải update nhiều chỗ), risk inconsistency. Quyết định: OLTP (transaction processing) thường normalize để đảm bảo data integrity; OLAP (analytics, data warehouse) thường denormalize (star/snowflake schema) để tăng query speed. Với NoSQL Document DB, denormalization là mặc định – embed related data vào document nếu luôn được đọc cùng nhau.

## Detailed Answer (EN)
$7b
