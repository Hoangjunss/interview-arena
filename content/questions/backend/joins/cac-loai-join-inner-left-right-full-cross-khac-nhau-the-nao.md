---
id: cac-loai-join-inner-left-right-full-cross-khac-nhau-the-nao
position: backend
technology: joins
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các loại JOIN (INNER, LEFT, RIGHT, FULL, CROSS) khác nhau thế nào?

## Question (EN)
How do the JOIN types (INNER, LEFT, RIGHT, FULL, CROSS) differ?

## Đáp án chi tiết (VI)
JOIN ghép hàng của hai bảng theo điều kiện (thường qua khóa):\
\
- **INNER JOIN**: chỉ giữ hàng **khớp cả hai bên**. Hàng không có cặp bị loại.\
- **LEFT (OUTER) JOIN**: giữ **mọi hàng bảng trái**, bên phải không khớp thì điền `NULL`.\
- **RIGHT (OUTER) JOIN**: ngược lại — giữ mọi hàng bảng phải.\
- **FULL (OUTER) JOIN**: giữ mọi hàng **cả hai bên**, thiếu bên nào điền `NULL`.\
- **CROSS JOIN**: tích Descartes — mỗi hàng trái ghép với mọi hàng phải (M×N hàng), ít dùng.\
\
Hay bị hỏi: `LEFT JOIN ... WHERE right.id IS NULL` để tìm hàng bên trái **không có** cặp bên phải (anti-join). Lưu ý: lọc cột bảng phải trong `WHERE` sẽ **biến LEFT JOIN thành INNER JOIN** (hàng `NULL` bị loại) — muốn giữ hàng không khớp, đặt điều kiện vào `ON`.

## Detailed Answer (EN)
A JOIN combines rows of two tables by a condition (usually a key):\
\
- **INNER JOIN**: keeps only rows that **match on both sides**. Unmatched rows are dropped.\
- **LEFT (OUTER) JOIN**: keeps **every left-table row**; where the right has no match, fills `NULL`.\
- **RIGHT (OUTER) JOIN**: the mirror — keeps every right-table row.\
- **FULL (OUTER) JOIN**: keeps every row from **both** sides, filling `NULL` on the missing side.\
- **CROSS JOIN**: Cartesian product — each left row paired with every right row (M×N rows), rarely used.\
\
Common follow-up: `LEFT JOIN ... WHERE right.id IS NULL` finds left rows with **no** right match (anti-join). Classic trap: filtering a right-table column in `WHERE` **turns a LEFT JOIN into an INNER JOIN** (the `NULL` rows are dropped) — to keep unmatched rows, put the condition in `ON`.
