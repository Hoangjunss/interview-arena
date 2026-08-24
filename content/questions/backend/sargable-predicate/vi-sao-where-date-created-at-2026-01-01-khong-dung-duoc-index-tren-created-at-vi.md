---
id: vi-sao-where-date-created-at-2026-01-01-khong-dung-duoc-index-tren-created-at-vi
position: backend
technology: sargable-predicate
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `WHERE DATE(created_at) = '2026-01-01'` không dùng được index trên `created_at`? Viết lại thế nào?

## Question (EN)
Why does `WHERE DATE(created_at) = '2026-01-01'` fail to use an index on `created_at`? How do you rewrite it?

## Đáp án chi tiết (VI)
Vì index lưu **giá trị gốc của cột**, không lưu kết quả của hàm. Khi cột bị bọc trong một hàm, database phải tính hàm đó cho **từng dòng** rồi mới so sánh — nghĩa là phải đọc hết bảng. Điều kiện như vậy gọi là **non-sargable** (không dùng được làm access predicate).\
\
```sql\
-- non-sargable: forces a full scan\
SELECT * FROM orders WHERE DATE(created_at) = '2026-01-01';\
\
-- sargable: half-open range, index on created_at is usable\
SELECT * FROM orders\
WHERE created_at \u003e= '2026-01-01'\
  AND created_at \u003c  '2026-01-02';\
```\
\
Cùng lỗi này còn xuất hiện ở nhiều dạng khác:\
- `WHERE YEAR(created_at) = 2026` → đổi thành khoảng `\u003e= '2026-01-01' AND \u003c '2027-01-01'`.\
- `WHERE amount * 100 \u003e 5000` → chuyển phép tính sang vế hằng số: `amount \u003e 50`.\
- `WHERE UPPER(email) = 'A@B.COM'` → chuẩn hoá dữ liệu khi ghi, hoặc dùng expression index.\
\
Dùng **khoảng nửa mở** (`\u003e=` và `\u003c`) thay vì `BETWEEN` khi cột là `timestamp`: `BETWEEN '2026-01-01' AND '2026-01-02'` sẽ lấy lẫn đúng thời điểm nửa đêm ngày hôm sau.

## Detailed Answer (EN)
$87
