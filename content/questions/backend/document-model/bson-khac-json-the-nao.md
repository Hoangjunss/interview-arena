---
id: bson-khac-json-the-nao
position: backend
technology: document-model
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BSON khác JSON thế nào?

## Question (EN)
How is BSON different from JSON?

## Đáp án chi tiết (VI)
Hiểu đơn giản: **JSON** là văn bản (text) để người và máy trao đổi dữ liệu; **BSON (Binary JSON)** là dạng nhị phân mà MongoDB dùng để *lưu* document — tối ưu cho tốc độ đọc và kích thước.\
\
Khác biệt quan trọng: BSON hỗ trợ nhiều kiểu dữ liệu hơn JSON, như `ObjectId`, `Date`, `Decimal128`, `binary`, `int32`/`int64`.\
\
**Điểm dễ bị hỏi khi phỏng vấn:** document MongoDB không chỉ là \\"JSON text\\". Nếu lẫn lộn kiểu dữ liệu — lưu ngày dưới dạng string thay vì `Date`, sai độ chính xác số, hay nhầm string với `ObjectId` thật — thì query và index có thể không khớp như mong đợi.

## Detailed Answer (EN)
Simply put: **JSON** is text for humans and machines to exchange data; **BSON (Binary JSON)** is the binary form MongoDB uses to *store* documents — optimized for read speed and size.\
\
Key difference: BSON supports more data types than JSON, such as `ObjectId`, `Date`, `Decimal128`, `binary`, `int32`/`int64`.\
\
**A common interview point:** a MongoDB document is not just \\"JSON text\\". Mixing up types — storing a date as a string instead of `Date`, number precision issues, or confusing a string with a real `ObjectId` — can make queries and indexes silently fail to match.
