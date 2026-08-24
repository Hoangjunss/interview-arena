---
id: denormalization-o-quy-mo-lon-la-gi-va-khi-nao-dung
position: system-design
technology: database
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Denormalization ở quy mô lớn là gì và khi nào dùng?

## Question (EN)
What is denormalization at scale and when should you use it?

## Đáp án chi tiết (VI)
Denormalization = **chủ ý lặp lại dữ liệu** (nhúng, sao chép cột, precompute) thay vì chuẩn hóa hoàn toàn, để **đọc nhanh hơn** bằng cách tránh join tốn kém ở quy mô lớn.\
\
Khi nào dùng:\
- Hệ **đọc nhiều hơn ghi rất nhiều**; join qua nhiều bảng/shard trở thành điểm nghẽn.\
- NoSQL không có join → phải nhúng/lặp dữ liệu theo mẫu truy vấn.\
- Cần **precompute** (đếm, tổng hợp, feed) để phục vụ ngay.\
\
Đánh đổi:\
- Tốn thêm dung lượng và **ghi phức tạp hơn** (một sự thật nằm ở nhiều nơi → phải cập nhật đồng bộ, dễ lệch).\
- Thường kết hợp **eventual consistency** để đồng bộ các bản sao dẫn xuất.\
\
Nguyên tắc: chuẩn hóa để đúng đắn trước, denormalize có kiểm soát khi số đo cho thấy đọc là điểm nghẽn.

## Detailed Answer (EN)
Denormalization = **deliberately duplicating data** (embedding, copying columns, precomputing) instead of fully normalizing, to **read faster** by avoiding expensive joins at scale.\
\
When to use:\
- The system is **far more read-heavy than write-heavy**; multi-table/shard joins become a bottleneck.\
- NoSQL has no joins → you embed/duplicate data along query patterns.\
- You need **precomputed** values (counts, aggregates, feeds) to serve instantly.\
\
Trade-offs:\
- Extra storage and **harder writes** (one fact lives in many places → must update in sync, prone to drift).\
- Often paired with **eventual consistency** to reconcile derived copies.\
\
Rule: normalize for correctness first, denormalize deliberately once metrics show reads are the bottleneck.
