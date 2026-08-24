---
id: tai-sao-mongodb-dung-bson-thay-vi-json
position: backend
technology: crud-\u0026-querying
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao MongoDB dùng BSON thay vì JSON?

## Question (EN)
Why does MongoDB use BSON instead of JSON?

## Đáp án chi tiết (VI)
MongoDB dùng BSON (Binary JSON) thay vì JSON text vì ba lý do:\
\
1. **Tốc độ**: parse nhị phân nhanh hơn parse chuỗi text.\
2. **Duyệt nhanh (traversability)**: BSON lưu sẵn độ dài mỗi khối, nên engine có thể *nhảy qua* các field không cần mà khỏi đọc cả document.\
3. **Kiểu dữ liệu mở rộng**: JSON chỉ có string/number/boolean/null; BSON thêm `ObjectId`, `Date`, `Decimal128`, `Int32`, `Int64`, `Binary`... — những thứ một database engine thực thụ cần.

## Detailed Answer (EN)
MongoDB uses BSON (Binary JSON) instead of JSON text for three reasons:\
\
1. **Speed**: parsing binary is faster than parsing text.\
2. **Traversability**: BSON stores the length of each block, so the engine can *skip* fields it doesn't need without reading the whole document.\
3. **Extended types**: JSON only has string/number/boolean/null; BSON adds `ObjectId`, `Date`, `Decimal128`, `Int32`, `Int64`, `Binary`... — things a real database engine needs.
