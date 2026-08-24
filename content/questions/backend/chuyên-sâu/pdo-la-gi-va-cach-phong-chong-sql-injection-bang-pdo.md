---
id: pdo-la-gi-va-cach-phong-chong-sql-injection-bang-pdo
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PDO là gì và cách phòng chống SQL injection bằng PDO?

## Question (EN)
What is PDO and how does it prevent SQL injection?

## Đáp án chi tiết (VI)
PDO (PHP Data Objects) là lớp trừu tượng cung cấp giao diện nhất quán để truy cập database. Phòng chống SQL injection bằng prepared statements: thay vì `\\"SELECT * FROM users WHERE id=$id\\"`, dùng `$stmt = $pdo-\u003eprepare(\\"SELECT * FROM users WHERE id=?\\"); $stmt-\u003eexecute([$id]);`. Placeholder `?` đảm bảo input của người dùng được xử lý như dữ liệu, không phải code thực thi. Named placeholder cũng tương tự: `\\"... WHERE id=:id\\"` rồi `execute([\\":id\\" =\u003e $id])`. Database engine sẽ không bao giờ parse tham số như SQL code.

## Detailed Answer (EN)
PDO (PHP Data Objects) is an abstraction layer providing consistent database access. Prevent SQL injection with prepared statements: instead of `\\"SELECT * FROM users WHERE id=$id\\"`, use `$stmt = $pdo-\u003eprepare(\\"SELECT * FROM users WHERE id=?\\"); $stmt-\u003eexecute([$id]);`. The placeholder `?` ensures user input is treated as data, not executable code. Named placeholders work similarly: `\\"... WHERE id=:id\\"` then `execute([\\":id\\" =\u003e $id])`. The database engine never interprets the parameter as SQL code.
