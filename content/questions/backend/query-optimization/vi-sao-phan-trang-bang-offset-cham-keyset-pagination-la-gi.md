---
id: vi-sao-phan-trang-bang-offset-cham-keyset-pagination-la-gi
position: backend
technology: query-optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao phân trang bằng OFFSET chậm? Keyset pagination là gì?

## Question (EN)
Why is OFFSET pagination slow, and what is keyset pagination?

## Đáp án chi tiết (VI)
**OFFSET/LIMIT** (`LIMIT 20 OFFSET 100000`) buộc DB **quét và bỏ đi** toàn bộ hàng trước offset rồi mới trả 20 hàng → càng lật sâu càng chậm (chi phí tăng tuyến tính theo offset). Thêm rủi ro: nếu dữ liệu chèn/xóa giữa các lần lật, hàng có thể **bị trùng hoặc bỏ sót**.\
\
**Keyset pagination (seek method)**: thay vì đếm offset, dùng **giá trị của hàng cuối trang trước** làm mốc trong `WHERE`:\
\
```sql\
SELECT * FROM posts\
WHERE (created_at, id) \u003c (:last_created_at, :last_id)\
ORDER BY created_at DESC, id DESC\
LIMIT 20;\
```\
\
- DB **nhảy thẳng** tới vị trí nhờ index trên `(created_at, id)` → nhanh và **ổn định** dù offset lớn.\
- Ổn định trước thay đổi dữ liệu (không lệch trang).\
- Đánh đổi: khó \\"nhảy tới trang N\\" tùy ý; hợp cuộn vô hạn / \\"tải thêm\\" hơn là dãy số trang.\
\
Cần một khóa sắp xếp **duy nhất và có thứ tự** (thường thêm `id` để phá hòa).

## Detailed Answer (EN)
**OFFSET/LIMIT** (`LIMIT 20 OFFSET 100000`) forces the DB to **scan and discard** every row before the offset before returning 20 → the deeper you page, the slower it gets (cost grows linearly with the offset). Extra risk: if rows are inserted/deleted between page loads, rows can be **duplicated or skipped**.\
\
**Keyset pagination (seek method)**: instead of counting an offset, use the **last row's values** from the previous page as an anchor in `WHERE`:\
\
```sql\
SELECT * FROM posts\
WHERE (created_at, id) \u003c (:last_created_at, :last_id)\
ORDER BY created_at DESC, id DESC\
LIMIT 20;\
```\
\
- The DB **seeks directly** using an index on `(created_at, id)` → fast and **stable** regardless of depth.\
- Stable against concurrent data changes (no page drift).\
- Trade-off: hard to \\"jump to page N\\" arbitrarily; fits infinite scroll / \\"load more\\" more than numbered pages.\
\
It needs a **unique, ordered** sort key (usually append `id` to break ties).
