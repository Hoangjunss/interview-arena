---
id: phan-biet-dirty-read-non-repeatable-read-va-phantom-read
position: backend
technology: isolation-levels
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt dirty read, non-repeatable read và phantom read.

## Question (EN)
Distinguish dirty read, non-repeatable read and phantom read.

## Đáp án chi tiết (VI)
Ba hiện tượng bất thường khi nhiều transaction chạy đồng thời:\
\
- **Dirty read**: đọc phải dữ liệu mà transaction khác **chưa commit** — nếu transaction đó rollback thì ta đã đọc dữ liệu \\"ma\\".\
- **Non-repeatable read**: đọc **cùng một hàng** hai lần trong một transaction ra **giá trị khác nhau** vì transaction khác đã commit UPDATE ở giữa.\
- **Phantom read**: chạy **cùng một truy vấn theo điều kiện** (vd `WHERE age \u003e 30`) hai lần ra **số hàng khác nhau** vì transaction khác đã INSERT/DELETE hàng khớp điều kiện.\
\
Khác nhau ở phạm vi: dirty = dữ liệu chưa commit; non-repeatable = một hàng đổi giá trị; phantom = **tập hàng** khớp điều kiện thay đổi. Isolation level cao hơn lần lượt loại bỏ chúng.

## Detailed Answer (EN)
Three anomalies that arise when transactions run concurrently:\
\
- **Dirty read**: reading data another transaction **has not committed** — if that transaction rolls back, you read a \\"ghost\\" value.\
- **Non-repeatable read**: reading the **same row** twice in one transaction yields **different values** because another transaction committed an UPDATE in between.\
- **Phantom read**: running the **same predicate query** (e.g. `WHERE age \u003e 30`) twice returns a **different number of rows** because another transaction INSERTed/DELETEd matching rows.\
\
They differ in scope: dirty = uncommitted data; non-repeatable = one row's value changes; phantom = the **set of rows** matching a condition changes. Higher isolation levels eliminate them in turn.
