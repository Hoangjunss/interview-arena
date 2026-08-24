---
id: sql-va-nosql-khac-nhau-o-dau
position: backend
technology: sql-vs-nosql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SQL và NoSQL khác nhau ở đâu?

## Question (EN)
How do SQL and NoSQL differ?

## Đáp án chi tiết (VI)
**SQL (quan hệ)**: dữ liệu ở bảng, **schema cố định**, quan hệ qua PK/FK, ngôn ngữ **SQL** chuẩn hóa, đảm bảo **ACID** mạnh, thường **scale dọc** (máy mạnh hơn). Hợp dữ liệu có cấu trúc rõ và ràng buộc chặt (tài chính, đơn hàng).\
\
**NoSQL**: schema **linh hoạt**, không bắt buộc quan hệ, thiết kế để **scale ngang** qua cluster, throughput cao; nhiều hệ ưu tiên **eventual consistency** thay vì ACID đầy đủ. Gồm nhiều họ: document, key-value, wide-column, graph.\
\
Khác biệt cốt lõi:\
- **Schema**: cố định (SQL) vs linh hoạt (NoSQL).\
- **Nhất quán**: mạnh (SQL) vs thường nới lỏng (NoSQL).\
- **Scale**: dọc (SQL) vs ngang (NoSQL).\
- **Join \u0026 giao dịch**: mạnh ở SQL; NoSQL thường đẩy về phía ứng dụng hoặc dùng mô hình nhúng.\
\
Không có cái \\"tốt hơn\\" tuyệt đối — chọn theo bài toán.

## Detailed Answer (EN)
**SQL (relational)**: data in tables, **fixed schema**, relationships via PK/FK, standardized **SQL** language, strong **ACID**, usually **vertical scaling** (a bigger machine). Fits well-structured data with tight constraints (finance, orders).\
\
**NoSQL**: **flexible schema**, no mandatory relations, designed for **horizontal scaling** across clusters, high throughput; many favor **eventual consistency** over full ACID. Several families: document, key-value, wide-column, graph.\
\
Core differences:\
- **Schema**: fixed (SQL) vs flexible (NoSQL).\
- **Consistency**: strong (SQL) vs often relaxed (NoSQL).\
- **Scaling**: vertical (SQL) vs horizontal (NoSQL).\
- **Joins \u0026 transactions**: strong in SQL; NoSQL often pushes them to the app or uses an embedded model.\
\
Neither is universally \\"better\\" — choose by the problem.
