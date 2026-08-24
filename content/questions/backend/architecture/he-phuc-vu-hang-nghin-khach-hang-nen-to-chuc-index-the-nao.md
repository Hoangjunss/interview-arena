---
id: he-phuc-vu-hang-nghin-khach-hang-nen-to-chuc-index-the-nao
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hệ phục vụ hàng nghìn khách hàng nên tổ chức index thế nào?

## Question (EN)
How should indices be organised for a system serving thousands of customers?

## Đáp án chi tiết (VI)
Ba mô hình, chọn theo phân bố kích thước khách hàng:\
\
1. **Index dùng chung + `tenant_id` filter** — mặc định đúng cho phần lớn trường hợp. Ít shard, dễ vận hành. Rủi ro: lập trình viên quên filter là lộ dữ liệu chéo, nên phải ép filter ở tầng backend, không tin vào caller.\
2. **Index riêng cho mỗi khách hàng** — cô lập tốt, xoá khách hàng chỉ là xoá index. Nhưng **không scale được tới hàng nghìn**: mỗi index tối thiểu một shard, mà mỗi shard tốn heap và làm cluster state phình.\
3. **Mô hình lai** — khách hàng lớn có index riêng, phần đuôi dài nằm chung một index. Đây là cách các hệ thật hay dùng.\
\
Với mô hình 1, thêm custom routing theo `tenant_id` để query chỉ chạm một shard.\
\
Một lớp bảo vệ đáng có ở tầng Elasticsearch: **document level security** trong role, để ngay cả khi backend quên filter thì cluster vẫn chặn.\
\
Quyết định phải dựa trên số liệu: đếm số tenant, phân bố dung lượng, và ước lượng tổng số shard trước khi chọn.

## Detailed Answer (EN)
$86
