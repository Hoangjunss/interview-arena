---
id: json-va-jsonb-khac-nhau-the-nao
position: backend
technology: jsonb-\u0026-advanced
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`json` và `jsonb` khác nhau thế nào?

## Question (EN)
How are `json` and `jsonb` different?

## Đáp án chi tiết (VI)
`json` lưu nguyên văn bản JSON và phân tích lại mỗi lần dùng. `jsonb` lưu dạng nhị phân đã phân tích sẵn — mất định dạng và thứ tự key gốc, nhưng query và đánh index nhanh hơn nhiều. Hầu hết ứng dụng nên dùng `jsonb`.\
\
Ví dụ tìm theo nội dung JSON (toán tử \\"chứa\\" `@\u003e`):\
```sql\
SELECT * FROM events\
WHERE payload @\u003e '{\\"type\\":\\"checkout\\

## Detailed Answer (EN)
`json` stores the raw JSON text and re-parses it on every use. `jsonb` stores a pre-parsed binary form — it loses original formatting and key order, but querying and indexing are much faster. Most applications should use `jsonb`.\
\
Example searching by JSON content (the \\"contains\\" operator `@\u003e`):\
```sql\
SELECT * FROM events\
WHERE payload @\u003e '{\\"type\\":\\"checkout\\
