---
id: mongodb-luu-du-lieu-the-nao-document-collection-bson-la-gi
position: backend
technology: document-model
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MongoDB lưu dữ liệu thế nào? Document, collection, BSON là gì?

## Question (EN)
How does MongoDB store data? What are documents, collections and BSON?

## Đáp án chi tiết (VI)
MongoDB là **document database**:\
\
- **Document**: đơn vị dữ liệu dạng JSON (cặp field–value), có thể **lồng nhau** (object, array). Mỗi document có `_id` làm khóa chính (mặc định là `ObjectId`).\
- **Collection**: nhóm các document — tương đương \\"bảng\\" nhưng **không bắt schema cố định**; các document trong cùng collection có thể khác cấu trúc field (schema linh hoạt).\
- **BSON**: định dạng nhị phân MongoDB dùng để lưu/truyền document — như JSON nhưng thêm kiểu (Date, ObjectId, Decimal128, binary) và tối ưu duyệt.\
\
Triết lý chính: **\\"data accessed together is stored together\\"** — dữ liệu hay đọc cùng nhau nên **nhúng (embed)** vào một document để đọc trong một lần thay vì JOIN nhiều bảng. Khi cần ép cấu trúc, MongoDB có **schema validation** (`$jsonSchema`) ở mức collection. So với quan hệ: collection ~ table, document ~ row, field ~ column, nhưng linh hoạt và có cấu trúc lồng.

## Detailed Answer (EN)
MongoDB is a **document database**:\
\
- **Document**: a JSON-like unit of data (field–value pairs), which can be **nested** (objects, arrays). Each document has an `_id` primary key (an `ObjectId` by default).\
- **Collection**: a group of documents — the equivalent of a \\"table\\" but with **no fixed schema**; documents in one collection may have different fields (flexible schema).\
- **BSON**: the binary format MongoDB uses to store/transmit documents — like JSON but with extra types (Date, ObjectId, Decimal128, binary) and optimized traversal.\
\
Core philosophy: **\\"data accessed together is stored together\\"** — data often read together should be **embedded** in one document so it can be read in a single operation instead of joining tables. When you need to enforce structure, MongoDB offers collection-level **schema validation** (`$jsonSchema`). Versus relational: collection ~ table, document ~ row, field ~ column, but flexible and with nested structure.
