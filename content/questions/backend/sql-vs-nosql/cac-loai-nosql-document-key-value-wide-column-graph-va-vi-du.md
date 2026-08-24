---
id: cac-loai-nosql-document-key-value-wide-column-graph-va-vi-du
position: backend
technology: sql-vs-nosql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các loại NoSQL (document, key-value, wide-column, graph) và ví dụ?

## Question (EN)
What are the NoSQL types (document, key-value, wide-column, graph) with examples?

## Đáp án chi tiết (VI)
Bốn họ NoSQL chính, khác nhau ở mô hình dữ liệu:\
\
- **Document**: lưu tài liệu tự mô tả (JSON/BSON), schema linh hoạt; hợp catalog, profile, nội dung. Vd **MongoDB**, Couchbase.\
- **Key-value**: bản đồ khóa → giá trị, đọc/ghi cực nhanh theo khóa; hợp cache, session, đếm. Vd **Redis**, DynamoDB (dạng đơn giản).\
- **Wide-column**: bảng có hàng với tập cột động, tối ưu ghi lớn và truy vấn theo khóa phân vùng; hợp time-series, log quy mô lớn. Vd **Cassandra**, HBase, Bigtable.\
- **Graph**: node + cạnh mang quan hệ, tối ưu duyệt quan hệ nhiều bậc; hợp mạng xã hội, gợi ý, phát hiện gian lận. Vd **Neo4j**, Neptune.\
\
Chọn theo **mẫu truy cập**: tra theo khóa → key-value; tài liệu lồng nhau → document; quan hệ nhiều bước → graph; ghi khổng lồ theo khóa → wide-column.

## Detailed Answer (EN)
Four main NoSQL families, differing by data model:\
\
- **Document**: self-describing documents (JSON/BSON), flexible schema; fits catalogs, profiles, content. E.g. **MongoDB**, Couchbase.\
- **Key-value**: a map of key → value, extremely fast read/write by key; fits caches, sessions, counters. E.g. **Redis**, DynamoDB (in its simple form).\
- **Wide-column**: tables whose rows have dynamic column sets, optimized for large writes and partition-key queries; fits time-series, large-scale logs. E.g. **Cassandra**, HBase, Bigtable.\
- **Graph**: nodes + edges carrying relationships, optimized for multi-hop traversal; fits social networks, recommendations, fraud detection. E.g. **Neo4j**, Neptune.\
\
Choose by **access pattern**: lookup by key → key-value; nested documents → document; multi-step relationships → graph; huge writes by key → wide-column.
