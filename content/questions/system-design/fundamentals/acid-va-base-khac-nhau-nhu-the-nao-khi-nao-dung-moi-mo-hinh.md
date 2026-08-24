---
id: acid-va-base-khac-nhau-nhu-the-nao-khi-nao-dung-moi-mo-hinh
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ACID và BASE khác nhau như thế nào? Khi nào dùng mỗi mô hình?

## Question (EN)
How do ACID and BASE differ, and when should each model be used?

## Đáp án chi tiết (VI)
ACID (Atomicity, Consistency, Isolation, Durability) là tập hợp thuộc tính đảm bảo transaction trong RDBMS luôn đáng tin cậy: toàn bộ transaction thành công hoặc rollback hoàn toàn, dữ liệu luôn hợp lệ, các transaction cô lập nhau, và dữ liệu đã commit không bao giờ mất.\
\
BASE (Basically Available, Soft state, Eventually consistent) là mô hình của hệ thống NoSQL phân tán: hệ thống cơ bản luôn available, trạng thái có thể thay đổi theo thời gian, và cuối cùng sẽ đạt trạng thái nhất quán.\
\
ACID phù hợp cho giao dịch tài chính, đặt hàng, bất kỳ nghiệp vụ nào yêu cầu tính chính xác tuyệt đối. BASE phù hợp cho hệ thống cần scale lớn như mạng xã hội, analytics, giỏ hàng e-commerce – nơi đôi khi đọc dữ liệu hơi cũ vẫn chấp nhận được để đổi lấy hiệu năng và khả năng mở rộng.

## Detailed Answer (EN)
ACID (Atomicity, Consistency, Isolation, Durability) guarantees reliability of transactions in relational databases: the entire transaction succeeds or rolls back completely, data always remains valid, transactions are isolated from each other, and committed data is never lost.\
\
BASE (Basically Available, Soft state, Eventually consistent) is the model used by distributed NoSQL systems: the system remains fundamentally available, state may change over time, and the system eventually reaches a consistent state.\
\
ACID is appropriate for financial transactions, order processing, and any business requiring absolute accuracy. BASE suits large-scale systems like social networks, analytics, and e-commerce shopping carts — where reading slightly stale data is acceptable in exchange for performance and scalability.
