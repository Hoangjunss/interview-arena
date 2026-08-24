---
id: deadlock-la-gi-4-dieu-kien-can-thiet-va-cac-cach-phong-tranh
position: backend
technology: process-\u0026-thread
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deadlock là gì? 4 điều kiện cần thiết và các cách phòng tránh?

## Question (EN)
What is a deadlock? What are the 4 necessary conditions and how do you prevent it?

## Đáp án chi tiết (VI)
Deadlock xảy ra khi nhiều process chờ nhau giải phóng resource mà không process nào có thể tiếp tục.\
\
Coffman (1971) xác định 4 điều kiện cần thiết đồng thời: (1) Mutual Exclusion: resource chỉ 1 process dùng tại một thời điểm; (2) Hold and Wait: process giữ ít nhất 1 resource và chờ thêm resource khác; (3) No Preemption: resource không thể bị lấy bắt buộc; (4) Circular Wait: tồn tại chuỗi vòng P1→P2→...→Pn→P1 chờ nhau.\
\
Phòng tránh bằng cách phá vỡ một điều kiện: Lock Ordering (phá Circular Wait):"])</script><script>self.__next_f.push([1," luôn acquire lock theo thứ tự cố định — ví dụ database luôn lock bảng A trước bảng B. Trylock với timeout (phá Hold and Wait): nếu không lấy được lock sau timeout thì release tất cả và retry. Banker's Algorithm: OS kiểm tra trước khi cấp resource. Thực tế: Java synchronized blocks, Go channel patterns, và database transaction isolation level đều phải xử lý deadlock — PostgreSQL phát hiện deadlock và rollback một transaction.

## Detailed Answer (EN)
$87
