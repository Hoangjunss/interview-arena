---
id: text-va-keyword-khac-nhau-ra-sao-khi-nao-dung-cai-nao
position: backend
technology: mapping
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`text` và `keyword` khác nhau ra sao? Khi nào dùng cái nào?

## Question (EN)
How do `text` and `keyword` differ, and when do you use each?

## Đáp án chi tiết (VI)
`text` **được analyze** (tách token, lowercase) để full-text search; `keyword` **lưu nguyên chuỗi**, dùng cho filter, sort và aggregation.\
\
```json\
\\"name\\": {\
  \\"type\\": \\"text\\

## Detailed Answer (EN)
`text` is **analyzed** (tokenized, lowercased) for full-text search; `keyword` **stores the string as-is** for filtering, sorting and aggregations.\
\
```json\
\\"name\\": {\
  \\"type\\": \\"text\\
