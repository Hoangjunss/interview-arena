---
id: export-vai-trieu-document-ra-ngoai-nen-dung-cach-nao
position: backend
technology: search
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Export vài triệu document ra ngoài nên dùng cách nào?

## Question (EN)
What is the right way to export a few million documents?

## Đáp án chi tiết (VI)
`point_in_time` + `search_after`. Đây là cách được khuyến nghị hiện nay; `scroll` API là cách cũ và đã bị deprecate cho use case này.\
\
```bash\
POST /products/_pit?keep_alive=5m\
# -\u003e {\\"id\\": \\"46ToAwMD...\\

## Detailed Answer (EN)
`point_in_time` plus `search_after`. This is the current recommendation; the `scroll` API is the older approach and is deprecated for this use case.\
\
```bash\
POST /products/_pit?keep_alive=5m\
# -\u003e {\\"id\\": \\"46ToAwMD...\\
