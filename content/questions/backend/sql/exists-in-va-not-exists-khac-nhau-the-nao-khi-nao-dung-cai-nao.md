---
id: exists-in-va-not-exists-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: sql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
EXISTS, IN và NOT EXISTS khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do EXISTS, IN and NOT EXISTS differ, and when should you use each?

## Đáp án chi tiết (VI)
- **IN** so giá trị với một danh sách hoặc kết quả subquery: `x IN (SELECT ...)`. Hợp khi danh sách nhỏ, giá trị cụ thể.\
- **EXISTS** kiểm tra \\"có tồn tại ít nhất một dòng khớp không\\" và dừng ngay khi tìm thấy (short-circuit). Hợp với subquery tương quan (correlated), nối theo điều kiện với truy vấn ngoài.\
- **NOT EXISTS** kiểm tra \\"không có dòng nào khớp\\".\
\
Lưu ý về NULL: `NOT IN` với một subquery có chứa `NULL` sẽ trả về rỗng/sai ngoài ý muốn, vì phép so sánh với NULL cho kết quả UNKNOWN (logic ba giá trị). `NOT EXISTS` không dính bẫy này, nên thường an toàn hơn khi loại trừ.\
\
```sql\
SELECT c.id FROM customers c\
WHERE NOT EXISTS (\
  SELECT 1 FROM orders o WHERE o.customer_id = c.id\
);\
```\
Trình tối ưu hiện đại thường tạo cùng một plan cho EXISTS và IN khi không có NULL — nhưng để loại trừ có khả năng gặp NULL, ưu tiên `NOT EXISTS`.

## Detailed Answer (EN)
- **IN** compares a value against a list or subquery result: `x IN (SELECT ...)`. Fits small lists or concrete values.\
- **EXISTS** checks \\"does at least one matching row exist\\" and stops as soon as it finds one (short-circuits). Fits correlated subqueries tied by a condition to the outer query.\
- **NOT EXISTS** checks \\"no matching row exists\\".\
\
Important NULL trap: `NOT IN` against a subquery that contains a `NULL` returns empty/unexpected results, because comparing with NULL yields UNKNOWN (three-valued logic). `NOT EXISTS` avoids this trap, so it is usually safer for exclusion.\
\
```sql\
SELECT c.id FROM customers c\
WHERE NOT EXISTS (\
  SELECT 1 FROM orders o WHERE o.customer_id = c.id\
);\
```\
Modern optimizers often produce the same plan for EXISTS and IN when there are no NULLs — but for exclusion where NULLs are possible, prefer `NOT EXISTS`.
