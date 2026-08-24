---
id: mongodb-la-gi-va-khi-nao-nen-chon
position: backend
technology: document-model
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MongoDB là gì và khi nào nên chọn?

## Question (EN)
What is MongoDB and when should you choose it?

## Đáp án chi tiết (VI)
MongoDB là **document database**: thay vì bẻ dữ liệu thành nhiều bảng, nó lưu cả một \\"cục\\" dữ liệu liên quan trong một **document** (giống một object JSON) nằm trong **collection**. Bên dưới, document được lưu dạng BSON.\
\
**Nên chọn khi:**\
- Dữ liệu có hình dạng document tự nhiên (một đơn hàng kèm luôn các dòng hàng...).\
- Schema thay đổi nhanh, cần linh hoạt.\
- Cần scale ngang (chia dữ liệu ra nhiều máy) dễ dàng.\
- Thường đọc/ghi trọn cả document một lần.\
\
**Không nên chọn khi:**\
- Dữ liệu quan hệ chặt, cần join phức tạp hay transaction trên nhiều bảng.\
- Cần ràng buộc dữ liệu mạnh (lúc đó PostgreSQL/RDBMS hợp hơn).\
\
*Lưu ý:* đừng chọn MongoDB chỉ để né việc thiết kế schema — sớm muộn vẫn phải thiết kế.

## Detailed Answer (EN)
MongoDB is a **document database**: instead of splitting data into many tables, it stores a whole \\"chunk\\" of related data in one **document** (like a JSON object) inside a **collection**. Under the hood, documents are stored as BSON.\
\
**When to choose:**\
- Data has a natural document shape (an order with its line items...).\
- Schemas change fast and need flexibility.\
- You need easy horizontal scaling (spreading data across machines).\
- You usually read/write the whole document at once.\
\
**When NOT to choose:**\
- Data is tightly relational, needs complex joins or multi-table transactions.\
- You need strong data constraints (PostgreSQL/RDBMS fits better).\
\
*Common trap:* don't choose MongoDB just to dodge schema design — you'll still need it eventually.
