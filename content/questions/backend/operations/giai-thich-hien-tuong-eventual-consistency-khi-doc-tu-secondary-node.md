---
id: giai-thich-hien-tuong-eventual-consistency-khi-doc-tu-secondary-node
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích hiện tượng \\"Eventual Consistency\\" khi đọc từ Secondary node.

## Question (EN)
Explain \\"Eventual Consistency\\" when reading from a Secondary node.

## Đáp án chi tiết (VI)
Mặc định, đọc từ Primary cho bạn \\"strong consistency\\" (luôn mới nhất). Nhưng nếu đặt `readPreference` về `secondary`, bạn có thể nhận dữ liệu cũ.\
\
**Vì sao:** khi Primary cập nhật, cần một chút thời gian (replication lag) để ghi vào oplog rồi truyền sang các Secondary. Nếu bạn ghi vào Primary rồi *đọc ngay* từ Secondary, có thể chưa thấy dữ liệu vừa ghi; đọc lại lát sau mới thấy. Đó chính là \\"eventual consistency\\" — nhất quán *cuối cùng*, không phải tức thì.

## Detailed Answer (EN)
By default, reading from the Primary gives you \\"strong consistency\\" (always the latest). But if `readPreference` is set to `secondary`, you may get stale data.\
\
**Why:** when the Primary updates, it takes a moment (replication lag) to write to the oplog and stream to the Secondaries. If you write to the Primary and *immediately read* from a Secondary, you might not see the new data yet; reading again a bit later will show it. That is \\"eventual consistency\\" — consistent *eventually*, not instantly.
