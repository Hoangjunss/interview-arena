---
id: vi-sao-sort-tren-field-text-bi-tu-choi
position: backend
technology: mapping
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao sort trên field `text` bị từ chối?

## Question (EN)
Why is sorting on a `text` field rejected?

## Đáp án chi tiết (VI)
Vì field `text` đã bị analyze thành nhiều token, nên **không có một giá trị duy nhất để so sánh**. Sort cần đọc giá trị theo từng document (doc values), mà `text` không sinh doc values.\
\
Lỗi nhận được là `Fielddata is disabled on text fields by default`.\
\
Cách đúng là sort trên sub-field `keyword`:\
\
```json\
\\"name\\": { \\"type\\": \\"text\\

## Detailed Answer (EN)
Because a `text` field is analyzed into many tokens, so there is **no single value to compare**. Sorting reads per-document values (doc values), and `text` produces none.\
\
The error is `Fielddata is disabled on text fields by default`.\
\
The correct approach sorts on the `keyword` sub-field:\
\
```json\
\\"name\\": { \\"type\\": \\"text\\
