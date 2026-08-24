---
id: dynamic-mapping-la-gi-va-vi-sao-nguy-hiem-o-production
position: backend
technology: mapping
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dynamic mapping là gì và vì sao nguy hiểm ở production?

## Question (EN)
What is dynamic mapping and why is it dangerous in production?

## Đáp án chi tiết (VI)
Elasticsearch **tự đoán kiểu field** khi gặp field mới. Tiện lúc thử nghiệm nhưng ở production sinh ra ba vấn đề.\
\
1. **Đoán sai kiểu và không sửa được** — `\\"1234\\"` thành `text` thay vì `long`, `\\"2026-01-15\\"` thành `date` trong khi đó là mã đơn hàng. Kiểu field **không đổi được sau khi đã có dữ liệu**.\
2. **Mapping explosion** — log ghi field động (`user_123_score`) làm mapping phình tới hàng nghìn field, cluster state nặng và node chậm hẳn.\
3. Lỗi chỉ lộ ra lúc query, không phải lúc ghi.\
\
Cách chặn ở production:\
\
```json\
PUT /orders\
{\
  \\"mappings\\": {\
    \\"dynamic\\": \\"strict\\

## Detailed Answer (EN)
Elasticsearch **guesses field types** for new fields. Convenient while prototyping, but it creates three production problems.\
\
1. **Wrong guesses you cannot fix** — `\\"1234\\"` becomes `text` instead of `long`, `\\"2026-01-15\\"` becomes `date` when it is really an order code. Field types **cannot change once data exists**.\
2. **Mapping explosion** — logs with dynamic field names (`user_123_score`) grow the mapping to thousands of fields, bloating cluster state and slowing nodes.\
3. Errors surface at query time, not at write time.\
\
How to lock it down in production:\
\
```json\
PUT /orders\
{\
  \\"mappings\\": {\
    \\"dynamic\\": \\"strict\\
