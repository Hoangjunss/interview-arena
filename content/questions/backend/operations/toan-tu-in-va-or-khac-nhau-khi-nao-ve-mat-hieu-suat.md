---
id: toan-tu-in-va-or-khac-nhau-khi-nao-ve-mat-hieu-suat
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử `$in` và `$or` khác nhau khi nào về mặt hiệu suất?

## Question (EN)
How do the `$in` and `$or` operators differ in terms of performance?

## Đáp án chi tiết (VI)
Cả hai đều khớp nhiều điều kiện, nhưng khác nhau:\
\
- **`$in`**: tìm nhiều giá trị trên **cùng một field**. Dễ tận dụng một index duy nhất, hiệu năng rất tốt.\
- **`$or`**: thường nối các điều kiện trên **các field khác nhau**. MongoDB có thể dùng index riêng cho từng nhánh (index intersection), nhưng chỉ cần một nhánh thiếu index là cả query có thể tụt xuống collection scan.\
\
*Lời khuyên:* nếu chỉ lọc trên một field, luôn ưu tiên `$in` hơn `$or`.

## Detailed Answer (EN)
Both match multiple conditions, but they differ:\
\
- **`$in`**: matches multiple values on the **same field**. Easily uses a single index, with excellent performance.\
- **`$or`**: usually combines conditions across **different fields**. MongoDB can use a separate index per branch (index intersection), but if even one branch lacks an index the whole query may fall back to a collection scan.\
\
*Advice:* if you're filtering on a single field, always prefer `$in` over `$or`.
