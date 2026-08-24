---
id: sql-injection-la-gi-cach-phong-chong-trong-node-js
position: backend
technology: threats-\u0026-vulnerabilities
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SQL Injection là gì? Cách phòng chống trong Node.js?

## Question (EN)
What is SQL injection? How do you prevent it in Node.js?

## Đáp án chi tiết (VI)
SQL Injection là tấn công chèn SQL qua user input để thao túng query — bypass đăng nhập, trích xuất hoặc xóa dữ liệu.\
\
- **Ví dụ kinh điển** — username `' OR '1'='1' --` biến query thành `SELECT * FROM users WHERE username = '' OR '1'='1' --...` — luôn true, vượt qua login.\
- **Second-order injection** — input được lưu vào DB rồi dùng trong query khác không qua kiểm soát — khó phát hiện hơn.\
- **Phòng chống chính: parameterized query** — `db.query('SELECT * FROM users WHERE id = $1', [userId])`: user input không bao giờ được diễn giải thành SQL.\
- **ORM** — Prisma/Sequelize/TypeORM tự parameterize; raw query vẫn rủi ro: `prisma.$queryRaw` với tagged template an toàn, `$queryRawUnsafe('...' + userId)` thì không.\
- **Defense in depth** — input validation bổ trợ nhưng không thay được parameterized query; DB user chỉ có quyền tối thiểu (không DROP TABLE); WAF là lớp thêm, không đủ một mình.

## Detailed Answer (EN)
SQL injection injects SQL through user input to manipulate queries — bypassing login, extracting or deleting data.\
\
- **Classic example** — a username of `' OR '1'='1' --` turns the query into `SELECT * FROM users WHERE username = '' OR '1'='1' --...` — always true, login bypassed.\
- **Second-order injection** — input is stored in the DB, then used unsafely in a later query — harder to detect.\
- **Primary defense: parameterized queries** — `db.query('SELECT * FROM users WHERE id = $1', [userId])`: user input is never interpreted as SQL.\
- **ORMs** — Prisma/Sequelize/TypeORM parameterize automatically; raw queries are still risky: `prisma.$queryRaw` with a tagged template is safe, `$queryRawUnsafe('...' + userId)` is not.\
- **Defense in depth** — input validation helps but never replaces parameterized queries; give the DB user least privilege (no DROP TABLE); a WAF is an extra layer, not sufficient alone.
