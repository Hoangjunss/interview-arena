---
id: vector-search-knn-khac-keyword-search-the-nao-va-nen-dung-ra-sao
position: backend
technology: search
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vector search (kNN) khác keyword search thế nào và nên dùng ra sao?

## Question (EN)
How does vector (kNN) search differ from keyword search, and how should it be used?

## Đáp án chi tiết (VI)
Keyword search khớp **term chính xác**; vector search khớp **ý nghĩa** bằng cách so khoảng cách giữa các embedding. Câu \\"laptop cho dân thiết kế\\" khớp được document viết \\"MacBook Pro cho designer\\" dù không chung từ nào.\
\
```json\
\\"embedding\\": { \\"type\\": \\"dense_vector\\

## Detailed Answer (EN)
Keyword search matches **exact terms**; vector search matches **meaning** by comparing embedding distances. A query for \\"laptop for designers\\" can match a document saying \\"MacBook Pro for creative work\\" with no shared words.\
\
```json\
\\"embedding\\": { \\"type\\": \\"dense_vector\\
