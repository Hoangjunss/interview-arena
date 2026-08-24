---
id: vi-sao-ghi-db-xong-roi-publish-message-lai-lam-du-lieu-lech-nhau-dual-write-prob
position: backend
technology: dual-write
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao ghi DB xong rồi publish message lại làm dữ liệu lệch nhau? (dual write problem)

## Question (EN)
Why does writing to the DB and then publishing a message cause data inconsistency? (the dual write problem)

## Đáp án chi tiết (VI)
Vì DB và message broker là **hai hệ thống riêng biệt**, không nằm chung một transaction. Bạn ghi vào cả hai trong cùng một hàm, nhưng không có gì đảm bảo cả hai cùng thành công.\
\
```java\
// dual write: two systems, no shared transaction\
orderRepository.save(order);   // committed\
broker.publish(orderCreated);  // process crashes here -\u003e event lost forever\
```\
\
Hai chiều hỏng:\
- **Ghi DB xong, publish lỗi** (broker down, process bị kill): đơn hàng có trong DB nhưng service khác không bao giờ biết.\
- **Publish trước, commit DB lỗi**: consumer nhận sự kiện cho một đơn hàng không tồn tại.\
\
Đổi thứ tự hai lệnh không giải quyết được, chỉ đổi kiểu lỗi. Bọc `try/catch` rồi retry publish cũng không cứu nổi trường hợp process chết giữa chừng.\
\
Cách xử lý đúng là đưa việc \\"ghi dữ liệu\\" và \\"ghi ý định gửi message\\" vào **cùng một transaction DB**, rồi để một tiến trình riêng đọc bảng đó và publish — đó chính là **transactional outbox**.

## Detailed Answer (EN)
Because the DB and the message broker are **two separate systems** with no shared transaction. You write to both in one function, but nothing guarantees both succeed.\
\
```java\
// dual write: two systems, no shared transaction\
orderRepository.save(order);   // committed\
broker.publish(orderCreated);  // process crashes here -\u003e event lost forever\
```\
\
Two failure directions:\
- **DB committed, publish fails** (broker down, process killed): the order exists in the DB but no other service ever learns about it.\
- **Publish first, DB commit fails**: consumers receive an event for an order that does not exist.\
\
Swapping the order of the two calls does not fix it, it only changes which failure you get. Wrapping the publish in `try/catch` with retries still cannot survive a process crash mid-way.\
\
The correct fix is to put \\"write the data\\" and \\"record the intent to publish\\" into the **same DB transaction**, then have a separate process read that table and publish — the **transactional outbox** pattern.
