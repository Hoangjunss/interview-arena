---
id: danh-gia-chat-luong-search-sau-khi-chinh-ranking-nen-dua-vao-dau
position: backend
technology: relevance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh giá chất lượng search sau khi chỉnh ranking nên dựa vào đâu?

## Question (EN)
How do you evaluate search quality after tuning ranking?

## Đáp án chi tiết (VI)
Dựa vào **số liệu offline + số liệu online**, không dựa vào việc gõ thử vài câu rồi thấy \\"có vẻ ổn hơn\\".\
\
Offline: dựng bộ đánh giá gồm query kèm document đúng, rồi chạy `_rank_eval`:\
\
```json\
POST /products/_rank_eval\
{\
  \\"requests\\": [{\
    \\"id\\": \\"laptop_query\\

## Detailed Answer (EN)
$83
