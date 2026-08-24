---
id: sql-injection-la-gi-va-cach-phong-chong
position: backend
technology: web-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SQL injection là gì và cách phòng chống?

## Question (EN)
What is SQL injection and how do you prevent it?

## Đáp án chi tiết (VI)
SQL injection xảy ra khi app **ghép chuỗi** input người dùng vào câu SQL → kẻ tấn công chèn lệnh SQL để lộ/sửa dữ liệu, thậm chí chiếm DB.\
\
```js\
// BAD — input becomes part of the SQL code\
db.query(\\"SELECT * FROM users WHERE name = '\\" + input + \\"'\\")\
// GOOD — parameterized: input is always treated as data\
db.query('SELECT * FROM users WHERE name = ?', [input])\
```\
\
Phòng chống (theo thứ tự hiệu quả — OWASP):\
1. **Prepared statement / parameterized query** — tách **code SQL** khỏi **dữ liệu**; input luôn được coi là giá trị, không bao giờ là lệnh. Đây là biện pháp chính.\
2. **Stored procedure** viết an toàn (không tự ghép SQL động bên trong).\
3. **Allow-list** cho phần không tham số hóa được (tên bảng/cột, chiều sort).\
4. **Least privilege** cho tài khoản DB; validate input là lớp phụ.\
\
**Tránh** escape thủ công làm biện pháp chính — mong manh. ORM dùng đúng cũng tham số hóa sẵn.

## Detailed Answer (EN)
SQL injection happens when an app **concatenates** user input into a SQL statement → the attacker injects SQL to expose/modify data or even take over the DB.\
\
```js\
// BAD — input becomes part of the SQL code\
db.query(\\"SELECT * FROM users WHERE name = '\\" + input + \\"'\\")\
// GOOD — parameterized: input is always treated as data\
db.query('SELECT * FROM users WHERE name = ?', [input])\
```\
\
Defenses (by effectiveness — OWASP):\
1. **Prepared statements / parameterized queries** — separate **SQL code** from **data**; input is always treated as a value, never as commands. This is the primary defense.\
2. **Safely written stored procedures** (no dynamic SQL built inside).\
3. **Allow-list** for parts that cannot be parameterized (table/column names, sort direction).\
4. **Least-privilege** DB accounts; input validation as a secondary layer.\
\
**Avoid** manual escaping as the primary defense — it is fragile. A properly used ORM also parameterizes by default.
