---
id: capped-collections-trong-mongodb-la-gi
position: backend
technology: change-streams
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Capped Collections trong MongoDB là gì?

## Question (EN)
What are Capped Collections in MongoDB?

## Đáp án chi tiết (VI)
Capped collection là collection có kích thước cố định. Khi đầy, MongoDB tự ghi đè document cũ nhất bằng document mới — hoạt động như một vòng tròn (circular buffer).\
\
**Đặc điểm:**\
- Insert rất nhanh vì dữ liệu ghi tuần tự xuống đĩa.\
- Dữ liệu cũ tự cuốn đi, khỏi tốn lệnh xóa hay TTL.\
- **Hạn chế:** giữ thứ tự chèn; update làm document *to ra* sẽ bị lỗi. (Trước MongoDB 5.0 còn không cho xóa document thủ công; bản mới đã cho phép.)\
\
Hợp cho log, cache ngắn hạn, dữ liệu cảm biến IoT.

## Detailed Answer (EN)
A capped collection is a fixed-size collection. When full, MongoDB automatically overwrites the oldest document with the newest — working like a circular buffer.\
\
**Characteristics:**\
- Very fast inserts because data is written sequentially to disk.\
- Old data rolls out on its own, no delete commands or TTL needed.\
- **Limits:** it preserves insertion order; an update that makes a document *larger* fails. (Before MongoDB 5.0 you also couldn't manually delete documents; newer versions allow it.)\
\
Good for logs, short-term cache, IoT sensor data.
