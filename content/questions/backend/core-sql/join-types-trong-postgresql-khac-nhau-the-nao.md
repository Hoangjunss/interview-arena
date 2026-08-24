---
id: join-types-trong-postgresql-khac-nhau-the-nao
position: backend
technology: core-sql
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`JOIN` types trong PostgreSQL khác nhau thế nào?

## Question (EN)
How are PostgreSQL join types different?

## Đáp án chi tiết (VI)
JOIN ghép dòng giữa hai bảng; khác nhau ở chỗ có giữ lại dòng không khớp hay không:\
\
- **INNER JOIN**: chỉ giữ dòng khớp ở cả hai bảng.\
- **LEFT JOIN**: giữ toàn bộ bảng trái, bên phải không khớp thì điền NULL.\
- **RIGHT JOIN**: ngược lại, giữ toàn bộ bảng phải.\
- **FULL OUTER JOIN**: giữ cả hai phía, thiếu thì NULL.\
- **CROSS JOIN**: ghép mọi dòng với mọi dòng (tích Descartes).\
\
Lưu ý: sau `LEFT JOIN`, nếu đặt điều kiện về bảng phải trong `WHERE`, bạn vô tình loại hết dòng NULL và biến nó thành INNER JOIN. Muốn giữ dòng không khớp, đặt điều kiện đó trong `ON`.

## Detailed Answer (EN)
A JOIN combines rows across two tables; they differ in whether unmatched rows are kept:\
\
- **INNER JOIN**: keeps only rows matching in both tables.\
- **LEFT JOIN**: keeps all left rows, filling NULL where the right has no match.\
- **RIGHT JOIN**: the reverse, keeps all right rows.\
- **FULL OUTER JOIN**: keeps both sides, NULL where missing.\
- **CROSS JOIN**: pairs every row with every row (Cartesian product).\
\
Classic trap: after a `LEFT JOIN`, putting a right-table condition in `WHERE` drops the NULL rows and silently turns it into an INNER JOIN. To keep unmatched rows, put that condition in `ON`.
