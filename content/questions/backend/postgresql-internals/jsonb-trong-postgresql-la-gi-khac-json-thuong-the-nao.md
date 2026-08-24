---
id: jsonb-trong-postgresql-la-gi-khac-json-thuong-the-nao
position: backend
technology: postgresql-internals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JSONB trong PostgreSQL là gì? Khác JSON thường thế nào?

## Question (EN)
What is JSONB in PostgreSQL and how does it differ from plain JSON?

## Đáp án chi tiết (VI)
Postgres có hai kiểu lưu JSON:\
\
- **`json`**: lưu **nguyên văn text**, giữ nguyên khoảng trắng/thứ tự khóa/khóa trùng; mỗi lần truy vấn phải **parse lại** → ghi nhanh, đọc/thao tác chậm.\
- **`jsonb`**: lưu dạng **nhị phân đã parse**, bỏ khoảng trắng, không giữ thứ tự khóa, loại khóa trùng; **truy vấn/index nhanh hơn**, ghi tốn thêm chút chi phí parse.\
\
Sức mạnh của `jsonb`:\
- Toán tử phong phú: `-\u003e`, `-\u003e\u003e`, `@\u003e` (chứa), `?` (có khóa), path `#\u003e`.\
- **Index GIN** trên jsonb → truy vấn theo khóa/chứa rất nhanh, hợp dữ liệu bán cấu trúc.\
\
Khi nào dùng: cần **lưu linh hoạt** và truy vấn vào bên trong document → chọn `jsonb`. Nhưng đừng lạm dụng thay cho cột quan hệ khi dữ liệu có cấu trúc rõ và cần ràng buộc/JOIN. `json` chỉ hợp khi cần giữ y nguyên văn bản gốc.

## Detailed Answer (EN)
Postgres has two JSON storage types:\
\
- **`json`**: stores the **raw text**, preserving whitespace/key order/duplicate keys; every query must **re-parse** it → fast writes, slower reads/operations.\
- **`jsonb`**: stores a **parsed binary** form, dropping whitespace, not preserving key order, removing duplicate keys; **faster to query/index**, with a small parse cost on write.\
\
What makes `jsonb` powerful:\
- Rich operators: `-\u003e`, `-\u003e\u003e`, `@\u003e` (contains), `?` (has key), path `#\u003e`.\
- **GIN indexes** on jsonb → very fast key/containment queries, great for semi-structured data.\
\
When to use: need **flexible storage** and to query inside the document → choose `jsonb`. But don't overuse it in place of relational columns when data is well-structured and needs constraints/JOINs. `json` fits only when you must preserve the exact original text.
