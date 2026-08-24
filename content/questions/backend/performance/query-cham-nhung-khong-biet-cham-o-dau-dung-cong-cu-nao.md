---
id: query-cham-nhung-khong-biet-cham-o-dau-dung-cong-cu-nao
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Query chậm nhưng không biết chậm ở đâu. Dùng công cụ nào?

## Question (EN)
A query is slow but you do not know where. What tools do you use?

## Đáp án chi tiết (VI)
`profile: true` để bóc thời gian từng phần của query, và **slow log** để bắt query chậm ở production.\
\
```json\
{ \\"profile\\": true, \\"query\\": { ... } }\
// tra ve thoi gian tung Lucene query: build_scorer, next_doc, score...\
```\
\
```json\
PUT /products/_settings\
{ \\"index.search.slowlog.threshold.query.warn\\": \\"1s\\

## Detailed Answer (EN)
`profile: true` to break down query time, and the **slow log** to catch slow queries in production.\
\
```json\
{ \\"profile\\": true, \\"query\\": { ... } }\
// returns timing per Lucene query: build_scorer, next_doc, score...\
```\
\
```json\
PUT /products/_settings\
{ \\"index.search.slowlog.threshold.query.warn\\": \\"1s\\
