---
id: sharding-la-gi-khac-gi-voi-replication
position: backend
technology: sharding
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sharding là gì? Khác gì với replication?

## Question (EN)
What is sharding and how does it differ from replication?

## Đáp án chi tiết (VI)
**Sharding** là **chia dữ liệu thành nhiều mảnh (shard)** đặt trên các node khác nhau, mỗi node giữ **một phần** dữ liệu → mở rộng cả **ghi** lẫn dung lượng vượt giới hạn một máy.\
\
Khác với replication:\
- **Replication**: mỗi node giữ **bản sao đầy đủ** → tăng khả dụng và mở rộng đọc.\
- **Sharding**: mỗi node giữ **tập con khác nhau** → mở rộng ghi và lưu trữ.\
\
Chiến lược chia (theo **shard key**):\
- **Range**: chia theo khoảng giá trị (dễ query range, dễ lệch tải \\"hot\\").\
- **Hash**: băm khóa để rải đều (đều tải nhưng khó query range).\
- **Directory/lookup**: bảng tra ánh xạ key → shard.\
\
Đánh đổi: chọn **shard key** sai gây **hot shard** (lệch tải); truy vấn/`JOIN` xuyên shard và transaction phân tán trở nên phức tạp. Thực tế thường **kết hợp**: mỗi shard lại được replicate để vừa scale vừa HA.\
\
Trước khi shard, dùng hết các phương án rẻ hơn: scale dọc, read replica, cache, partition trong một máy, archive dữ liệu cũ — sharding chỉ dành cho khi một node thực sự tới giới hạn.

## Detailed Answer (EN)
$84
