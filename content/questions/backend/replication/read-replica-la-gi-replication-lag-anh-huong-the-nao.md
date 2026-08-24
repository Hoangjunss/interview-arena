---
id: read-replica-la-gi-replication-lag-anh-huong-the-nao
position: backend
technology: replication
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Read replica là gì? Replication lag ảnh hưởng thế nào?

## Question (EN)
What is a read replica and how does replication lag affect it?

## Đáp án chi tiết (VI)
**Read replica** là bản sao chỉ-đọc của DB chính, dùng để **chia tải đọc** khỏi node ghi. Ứng dụng gửi `INSERT/UPDATE/DELETE` tới primary, còn các `SELECT` chịu được dữ liệu hơi cũ thì định tuyến sang replica → primary rảnh hơn, hệ chịu tải đọc cao hơn.\
\
**Replication lag** là độ trễ giữa lúc primary commit và lúc replica áp xong thay đổi:\
- Với replication bất đồng bộ, replica **có thể trả dữ liệu cũ** trong khoảng lag.\
- Hệ quả điển hình — **read-your-writes**: user vừa cập nhật hồ sơ rồi tải lại, nếu đọc từ replica chưa kịp sync sẽ thấy dữ liệu cũ.\
\
Xử lý: đọc dữ liệu vừa ghi thì route về primary (hoặc dùng session sticky), chấp nhận eventual consistency cho phần còn lại, theo dõi lag và cảnh báo khi vượt ngưỡng.

## Detailed Answer (EN)
A **read replica** is a read-only copy of the primary DB used to **offload reads** from the write node. The app sends `INSERT/UPDATE/DELETE` to the primary, while `SELECT`s that tolerate slightly stale data route to a replica → the primary is freer and the system handles more read load.\
\
**Replication lag** is the delay between the primary committing and the replica finishing applying the change:\
- With asynchronous replication, a replica **may return stale data** within the lag window.\
- Typical consequence — **read-your-writes**: a user updates their profile then reloads; reading from a not-yet-synced replica shows the old value.\
\
Handling: route reads of just-written data to the primary (or use sticky sessions), accept eventual consistency elsewhere, and monitor/alert on lag exceeding a threshold.
