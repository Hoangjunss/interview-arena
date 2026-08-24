---
id: khi-nao-chua-nen-dua-elasticsearch-vao-he-thong
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào chưa nên đưa Elasticsearch vào hệ thống?

## Question (EN)
When should you not adopt Elasticsearch yet?

## Đáp án chi tiết (VI)
Khi **PostgreSQL vẫn còn dư sức**. Với vài trăm nghìn record, full-text search của Postgres (`tsvector` + GIN index) thường đủ nhanh, và bạn tiết kiệm được một hệ thống phải vận hành, đồng bộ và backup riêng.\
\
```sql\
CREATE INDEX idx_search ON products USING GIN (to_tsvector('simple', name));\
```\
\
Cái giá thật của Elasticsearch không nằm ở việc cài đặt mà ở **vận hành lâu dài**: đồng bộ dữ liệu, xử lý lệch giữa hai bên, quản lý shard và heap, nâng version, và có người biết debug lúc 2 giờ sáng.\
\
Các dấu hiệu cho thấy đã đến lúc cần thật:\
- Dữ liệu ở mức nhiều triệu record trở lên và query text bắt đầu chậm.\
- Cần chấm điểm relevance, gợi ý, sửa lỗi chính tả, synonym, facet nhiều chiều.\
- Cần aggregation tương tác trên khối lượng lớn mà DB gốc không kham nổi.\
- Cần tách tải search khỏi database transaction.\
\
Một lời khuyên thực dụng: nếu đã dùng, hãy giữ Elasticsearch ở đúng vai **read model dựng lại được**. Bao lâu còn reindex lại được từ DB gốc thì mọi sự cố đều có đường lùi.

## Detailed Answer (EN)
$84
