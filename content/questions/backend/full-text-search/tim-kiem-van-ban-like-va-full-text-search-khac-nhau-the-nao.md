---
id: tim-kiem-van-ban-like-va-full-text-search-khac-nhau-the-nao
position: backend
technology: full-text-search
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tìm kiếm văn bản: LIKE và full-text search khác nhau thế nào?

## Question (EN)
Text search: how do LIKE and full-text search differ?

## Đáp án chi tiết (VI)
- **`LIKE` / `ILIKE`**: khớp mẫu chuỗi đơn giản. `col LIKE '%from%'` với `%` ở đầu **không dùng được B-tree index** → quét toàn bảng, chậm trên dữ liệu lớn. Không hiểu ngôn ngữ: không phân biệt gốc từ, thứ hạng, dấu câu.\
- **Full-text search (FTS)**: hiểu văn bản theo **từ (token)**. PostgreSQL chuyển văn bản thành `tsvector` (tách từ, chuẩn hóa gốc từ/stemming, bỏ stop word) và truy vấn bằng `tsquery`:\
\
```sql\
SELECT * FROM articles\
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'index \u0026 btree');\
```\
\
Ưu điểm FTS:\
- **Index GIN** trên `tsvector` → tìm nhanh trên khối văn bản lớn.\
- Khớp theo gốc từ (`running` ~ `run`), toán tử logic (AND/OR/NOT), và **xếp hạng độ liên quan** (`ts_rank`).\
\
Khi nào dùng gì: mẫu ngắn/tiền tố (`abc%`) hoặc so khớp chính xác → LIKE (kèm `text_pattern_ops` index cho tiền tố). Tìm kiếm ngôn ngữ tự nhiên trên đoạn văn → FTS. Cần fuzzy/typo hay tiếng Việt có dấu phức tạp → cân nhắc `pg_trgm` hoặc công cụ chuyên (Elasticsearch, Meilisearch).

## Detailed Answer (EN)
- **`LIKE` / `ILIKE`**: simple string pattern matching. `col LIKE '%from%'` with a leading `%` **can't use a B-tree index** → full table scan, slow on large data. It has no language awareness: no word stems, ranking, or punctuation handling.\
- **Full-text search (FTS)**: understands text by **token (word)**. PostgreSQL turns text into a `tsvector` (tokenize, stem, drop stop words) and queries it with a `tsquery`:\
\
```sql\
SELECT * FROM articles\
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'index \u0026 btree');\
```\
\
FTS advantages:\
- A **GIN index** on `tsvector` → fast search over large text bodies.\
- Stem-aware matching (`running` ~ `run`), boolean operators (AND/OR/NOT), and **relevance ranking** (`ts_rank`).\
\
When to use which: short/prefix patterns (`abc%`) or exact matches → LIKE (with a `text_pattern_ops` index for prefixes). Natural-language search over prose → FTS. Need fuzzy/typo tolerance or complex accented text → consider `pg_trgm` or a dedicated engine (Elasticsearch, Meilisearch).
