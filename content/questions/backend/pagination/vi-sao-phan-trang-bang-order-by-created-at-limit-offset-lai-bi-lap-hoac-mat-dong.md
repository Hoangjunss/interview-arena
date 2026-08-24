---
id: vi-sao-phan-trang-bang-order-by-created-at-limit-offset-lai-bi-lap-hoac-mat-dong
position: backend
technology: pagination
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao phân trang bằng `ORDER BY created_at LIMIT/OFFSET` lại bị lặp hoặc mất dòng?

## Question (EN)
Why does paginating with `ORDER BY created_at LIMIT/OFFSET` repeat or skip rows?

## Đáp án chi tiết (VI)
Vì `ORDER BY` **không xác định (non-deterministic)** khi nhiều dòng có cùng giá trị sắp xếp. SQL không hứa giữ nguyên thứ tự giữa các dòng bằng nhau, nên hai lần chạy có thể xếp chúng khác nhau — dòng ở cuối trang 1 có thể xuất hiện lại ở đầu trang 2, hoặc bị bỏ qua.\
\
```sql\
-- nhieu bai cung created_at -\u003e thu tu khong on dinh\
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 20;\
\
-- sua: them tie-breaker duy nhat\
SELECT * FROM posts ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 20;\
```\
\
Quy tắc: **mọi truy vấn có `LIMIT` phải `ORDER BY` trên một tổ hợp cột duy nhất** — thường là thêm khoá chính vào cuối.\
\
Hai vấn đề còn lại mà tie-breaker không giải quyết:\
- Dữ liệu **thay đổi giữa hai lần gọi trang** (có bài mới chèn vào) vẫn gây lệch. Cách xử lý là cursor pagination (`WHERE (created_at, id) \u003c (:last_at, :last_id)`).\
- `OFFSET` lớn vẫn chậm vì database phải đọc rồi bỏ đi `OFFSET` dòng đầu tiên.

## Detailed Answer (EN)
Because `ORDER BY` is **non-deterministic** when several rows share the same sort value. SQL makes no promise about the relative order of tied rows, so two runs may arrange them differently — a row at the end of page 1 can reappear at the top of page 2, or be skipped entirely.\
\
```sql\
-- many posts share created_at -\u003e unstable order\
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 20;\
\
-- fix: add a unique tie-breaker\
SELECT * FROM posts ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 20;\
```\
\
Rule: **every query with `LIMIT` must `ORDER BY` a unique column combination** — usually by appending the primary key.\
\
Two problems a tie-breaker does not solve:\
- Data **changing between page requests** (new posts inserted) still shifts results. The remedy is cursor pagination: `WHERE (created_at, id) \u003c (:last_at, :last_id)`.\
- A large `OFFSET` is still slow because the database must read and discard those leading rows.
