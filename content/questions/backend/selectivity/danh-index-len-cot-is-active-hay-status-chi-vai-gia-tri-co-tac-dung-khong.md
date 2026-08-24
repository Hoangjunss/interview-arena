---
id: danh-index-len-cot-is-active-hay-status-chi-vai-gia-tri-co-tac-dung-khong
position: backend
technology: selectivity
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh index lên cột `is_active` hay `status` (chỉ vài giá trị) có tác dụng không?

## Question (EN)
Is it useful to index a column like `is_active` or `status` that only holds a few distinct values?

## Đáp án chi tiết (VI)
Thường là **không**, vì cột đó có **cardinality thấp** — số giá trị phân biệt quá ít nên **selectivity** kém. Nếu 90% dòng có `is_active = true`, đi qua index rồi nhảy về bảng đọc 90% số dòng còn **chậm hơn** quét tuần tự, do quét tuần tự đọc tuần tự theo trang còn index scan sinh truy cập ngẫu nhiên. Planner biết điều này qua thống kê và sẽ tự bỏ qua index — index vẫn tồn tại, vẫn tốn chi phí ghi, nhưng không ai dùng.\
\
**Khi cột cardinality thấp vẫn đáng đánh index:**\
- **Giá trị hiếm.** `status = 'failed'` chỉ chiếm 0.1% dòng thì lọc theo nó rất chọn lọc, dù cột chỉ có 4 giá trị. Phân bố lệch quan trọng hơn số giá trị phân biệt.\
- **Làm cột phụ trong composite index.** `(user_id, status)` hữu ích vì `user_id` đã lọc mạnh sẵn.\
- **Partial index.** Chỉ đánh index phần dòng thật sự được truy vấn:\
\
```sql\
CREATE INDEX idx_orders_pending ON orders (created_at)\
WHERE status = 'pending';\
```\
\
Index này nhỏ, rẻ khi ghi, và phục vụ đúng truy vấn hàng đợi xử lý đơn.

## Detailed Answer (EN)
$87
