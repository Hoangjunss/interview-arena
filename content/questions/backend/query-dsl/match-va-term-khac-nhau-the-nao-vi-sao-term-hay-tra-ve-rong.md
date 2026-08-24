---
id: match-va-term-khac-nhau-the-nao-vi-sao-term-hay-tra-ve-rong
position: backend
technology: query-dsl
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`match` và `term` khác nhau thế nào? Vì sao `term` hay trả về rỗng?

## Question (EN)
How do `match` and `term` differ, and why does `term` often return nothing?

## Đáp án chi tiết (VI)
`match` **analyze giá trị tìm kiếm trước khi so khớp**; `term` so khớp **nguyên văn** với token trong index. Đó là lý do `term` trên field `text` thường trả rỗng.\
\
```json\
// tra ve rong: index chi co token \\"laptop\\

## Detailed Answer (EN)
`match` **analyzes the search value before matching**; `term` matches **verbatim** against indexed tokens. That is why `term` on a `text` field usually returns nothing.\
\
```json\
// returns nothing: the index only holds \\"laptop\\
