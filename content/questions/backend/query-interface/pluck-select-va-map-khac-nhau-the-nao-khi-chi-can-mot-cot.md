---
id: pluck-select-va-map-khac-nhau-the-nao-khi-chi-can-mot-cot
position: backend
technology: query-interface
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`pluck`, `select` và `map` khác nhau thế nào khi chỉ cần một cột?

## Question (EN)
How do `pluck`, `select`, and `map` differ when you only need one column?

## Đáp án chi tiết (VI)
`pluck` lấy thẳng cột từ DB và trả về **mảng giá trị thuần**, không dựng object Active Record.\
\
```ruby\
User.pluck(:email)        # SELECT \\"users\\".\\"email\\" FROM \\"users\\"  =\u003e [\\"a@x.com\\

## Detailed Answer (EN)
`pluck` reads the column straight from the DB and returns a **plain array of values** without instantiating Active Record objects.\
\
```ruby\
User.pluck(:email)        # SELECT \\"users\\".\\"email\\" FROM \\"users\\"  =\u003e [\\"a@x.com\\
