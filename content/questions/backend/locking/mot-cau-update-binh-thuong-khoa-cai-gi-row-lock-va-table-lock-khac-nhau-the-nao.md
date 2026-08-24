---
id: mot-cau-update-binh-thuong-khoa-cai-gi-row-lock-va-table-lock-khac-nhau-the-nao
position: backend
technology: locking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một câu `UPDATE` bình thường khoá cái gì? Row lock và table lock khác nhau thế nào?

## Question (EN)
What does a plain `UPDATE` lock? How do row locks differ from table locks?

## Đáp án chi tiết (VI)
Một câu `UPDATE`/`DELETE` chỉ lấy **row-level lock** trên đúng những hàng nó thay đổi, giữ tới khi transaction kết thúc. Transaction khác vẫn `SELECT` được các hàng đó (đọc bản cũ qua MVCC), chỉ khi muốn sửa cùng hàng mới phải chờ.\
\
**Row lock**\
- Phạm vi hẹp, cho phép nhiều transaction ghi song song ở các hàng khác nhau.\
- Người đọc không chặn người ghi và ngược lại.\
\
**Table lock**\
- Phạm vi cả bảng. Xuất hiện khi chạy DDL: `ALTER TABLE` lấy `ACCESS EXCLUSIVE`, chặn **cả đọc lẫn ghi** trong lúc chạy.\
- Cũng có thể lấy tường minh bằng `LOCK TABLE`, hiếm khi cần trong code ứng dụng.\
\
**Lưu ý:**\
- Migration chạy giờ cao điểm: một `ALTER TABLE` chờ khoá sẽ xếp hàng phía sau nó toàn bộ request đọc — nhìn như database treo. Luôn đặt `lock_timeout` khi chạy DDL trên production.\
- Nếu điều kiện `WHERE` không dùng được index, engine phải quét nhiều hàng và khoá rộng hơn mức cần. Trên MySQL/InnoDB, `UPDATE` theo cột không index có thể khoá gần như toàn bộ hàng đã quét.

## Detailed Answer (EN)
$83
