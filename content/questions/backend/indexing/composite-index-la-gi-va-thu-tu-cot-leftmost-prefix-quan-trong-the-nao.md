---
id: composite-index-la-gi-va-thu-tu-cot-leftmost-prefix-quan-trong-the-nao
position: backend
technology: indexing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composite index là gì và thứ tự cột (leftmost prefix) quan trọng thế nào?

## Question (EN)
What is a composite index and why does column order (leftmost prefix) matter?

## Đáp án chi tiết (VI)
Composite (multi-column) index đánh index trên **nhiều cột theo thứ tự**, vd `(a, b, c)`. Index được sắp xếp theo a trước, rồi b, rồi c.\
\
**Quy tắc leftmost prefix**: index chỉ dùng được khi query lọc từ **cột trái nhất trở đi liên tục**:\
- Dùng tốt: `WHERE a = ?`, `WHERE a = ? AND b = ?`, `WHERE a = ? AND b = ? AND c = ?`.\
- Không dùng được (hoặc kém): `WHERE b = ?` đơn lẻ, hoặc `WHERE c = ?` — vì bỏ qua tiền tố trái.\
\
Hệ quả thiết kế:\
- Đặt cột **hay dùng cho equality** và **độ chọn lọc cao** ở bên trái.\
- Cột dùng cho range (`\u003e`, `BETWEEN`) nên ở cuối, vì sau range thì các cột sau không còn tận dụng được thứ tự.\
\
Một composite index `(a, b)` thường thay được index đơn `(a)` → tránh tạo index thừa. Lưu ý `(a, b)` và `(b, a)` là hai index khác nhau, phục vụ mẫu truy vấn khác nhau.

## Detailed Answer (EN)
A composite (multi-column) index indexes **several columns in order**, e.g. `(a, b, c)`. It is sorted by a first, then b, then c.\
\
**Leftmost-prefix rule**: the index is usable only when the query filters on a **continuous prefix from the leftmost column**:\
- Works well: `WHERE a = ?`, `WHERE a = ? AND b = ?`, `WHERE a = ? AND b = ? AND c = ?`.\
- Does not work (or poorly): `WHERE b = ?` alone, or `WHERE c = ?` — the left prefix is skipped.\
\
Design implications:\
- Put columns used for **equality** and with **high selectivity** on the left.\
- Put range columns (`\u003e`, `BETWEEN`) last, since columns after a range can no longer exploit the ordering.\
\
A composite `(a, b)` index usually covers a single-column `(a)` index too → avoid redundant indexes. Note `(a, b)` and `(b, a)` are two different indexes serving different query patterns.
