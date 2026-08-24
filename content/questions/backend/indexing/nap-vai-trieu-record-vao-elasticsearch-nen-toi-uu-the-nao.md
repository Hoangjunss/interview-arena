---
id: nap-vai-trieu-record-vao-elasticsearch-nen-toi-uu-the-nao
position: backend
technology: indexing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nạp vài triệu record vào Elasticsearch nên tối ưu thế nào?

## Question (EN)
How do you optimise loading a few million records into Elasticsearch?

## Đáp án chi tiết (VI)
Dùng `_bulk` với batch **5–15 MB**, và **tắt refresh + replica** trong lúc nạp.\
\
```bash\
PUT /products/_settings\
{ \\"index\\": { \\"refresh_interval\\": \\"-1\\

## Detailed Answer (EN)
$82
