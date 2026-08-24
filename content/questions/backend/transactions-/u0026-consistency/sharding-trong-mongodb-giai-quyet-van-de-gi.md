---
id: sharding-trong-mongodb-giai-quyet-van-de-gi
position: backend
technology: transactions-\u0026-consistency
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sharding trong MongoDB giải quyết vấn đề gì?

## Question (EN)
What problem does sharding in MongoDB solve?

## Đáp án chi tiết (VI)
Sharding giải quyết **giới hạn vật lý của một server đơn lẻ** bằng cách chia dữ liệu ra nhiều server (scale ngang).\
\
Dùng khi collection quá lớn không chứa nổi trên một đĩa, hoặc traffic đọc/ghi vượt CPU/RAM của con replica set mạnh nhất.\
\
*Lưu ý:* chọn **shard key** rất quan trọng. Chọn sai dễ gây *hot-spot* (mọi traffic dồn vào một shard) hoặc *scatter-gather* (một query phải đi hỏi tất cả các shard → rất chậm). Đây là loại quyết định khó sửa về sau, nên cần cân nhắc kỹ từ đầu.

## Detailed Answer (EN)
Sharding solves the **physical limit of a single server** by splitting data across multiple servers (horizontal scaling).\
\
Use it when a collection is too large for one disk, or read/write traffic exceeds the CPU/RAM of your most powerful replica-set machine.\
\
*Note:* choosing the **shard key** is critical. A bad choice causes *hot-spots* (all traffic on one shard) or *scatter-gather* (a query must ask every shard → very slow). This is hard to change later, so think it through up front.
