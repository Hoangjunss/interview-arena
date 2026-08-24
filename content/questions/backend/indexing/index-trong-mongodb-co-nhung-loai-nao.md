---
id: index-trong-mongodb-co-nhung-loai-nao
position: backend
technology: indexing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index trong MongoDB có những loại nào?

## Question (EN)
What types of indexes does MongoDB have?

## Đáp án chi tiết (VI)
Cũng như DB quan hệ, MongoDB dùng **B-tree index** để tránh quét toàn collection (`COLLSCAN`). Mọi collection có sẵn index trên `_id`. Các loại chính:\
\
- **Single field**: index một field.\
- **Compound**: nhiều field theo thứ tự — áp dụng **leftmost prefix** như SQL; thứ tự field quan trọng.\
- **Multikey**: tự động khi index một field là **mảng** — index từng phần tử.\
- **Text**: hỗ trợ tìm kiếm văn bản đơn giản.\
- **Geospatial** (`2dsphere`): truy vấn theo vị trí.\
- **Hashed**: dùng cho **sharding** theo hash.\
- **TTL**: tự xóa document sau thời gian (hợp session, log).\
\
Còn có **partial** (chỉ index document khớp điều kiện) và **unique**. Dùng `explain()` xem truy vấn dùng `IXSCAN` (tốt) hay `COLLSCAN` (xấu). Nguyên tắc index/đánh đổi ghi giống DB quan hệ.

## Detailed Answer (EN)
Like relational DBs, MongoDB uses **B-tree indexes** to avoid scanning a whole collection (`COLLSCAN`). Every collection has an index on `_id`. Main types:\
\
- **Single field**: index one field.\
- **Compound**: several fields in order — follows the **leftmost prefix** rule like SQL; field order matters.\
- **Multikey**: automatic when indexing an **array** field — indexes each element.\
- **Text**: supports simple text search.\
- **Geospatial** (`2dsphere`): location queries.\
- **Hashed**: used for hash-based **sharding**.\
- **TTL**: auto-deletes documents after a time (good for sessions, logs).\
\
There are also **partial** (index only documents matching a filter) and **unique** indexes. Use `explain()` to see whether a query uses `IXSCAN` (good) or `COLLSCAN` (bad). The indexing rules and write trade-offs mirror relational DBs.
