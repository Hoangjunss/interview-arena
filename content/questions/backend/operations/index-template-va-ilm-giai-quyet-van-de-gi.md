---
id: index-template-va-ilm-giai-quyet-van-de-gi
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index template và ILM giải quyết vấn đề gì?

## Question (EN)
What do index templates and ILM solve?

## Đáp án chi tiết (VI)
**Index template** áp mapping và settings tự động cho index khớp pattern, nên index sinh theo ngày không bị rơi vào dynamic mapping.\
\
```json\
PUT /_index_template/logs\
{\
  \\"index_patterns\\": [\\"logs-*\\"],\
  \\"template\\": {\
    \\"settings\\": { \\"number_of_shards\\": 2, \\"index.lifecycle.name\\": \\"logs-policy\\" },\
    \\"mappings\\": { \\"dynamic\\": \\"strict\\

## Detailed Answer (EN)
$81
