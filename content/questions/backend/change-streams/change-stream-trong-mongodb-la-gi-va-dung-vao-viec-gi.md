---
id: change-stream-trong-mongodb-la-gi-va-dung-vao-viec-gi
position: backend
technology: change-streams
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Change stream trong MongoDB là gì và dùng vào việc gì?

## Question (EN)
What is a MongoDB change stream and what is it used for?

## Đáp án chi tiết (VI)
**Change stream** cho phép ứng dụng lắng nghe thay đổi dữ liệu (insert/update/delete) theo thời gian thực mà không cần polling. Nó đọc từ **oplog** của replica set, nên chỉ chạy được trên replica set hoặc sharded cluster, không chạy trên standalone.\
\
```js\
const stream = db.collection('orders').watch([\
  { $match: { 'fullDocument.status': 'paid' } }\
], { fullDocument: 'updateLookup' })\
\
for await (const change of stream) {\
  await sendInvoice(change.fullDocument)\
}\
```\
\
Các việc hay dùng: đẩy thông báo real-time, đồng bộ sang Elasticsearch/cache, ghi audit log, kích hoạt job nền khi đơn chuyển trạng thái.\
\
Hai điểm phải nhớ khi dùng thật:\
- Mặc định event `update` chỉ chứa **phần thay đổi**, muốn cả document phải bật `fullDocument: 'updateLookup'`.\
- Mỗi event có **`_id` là resume token**. Lưu lại token đã xử lý để khi service restart thì `resumeAfter` từ đó, không mất event — miễn là oplog chưa bị ghi đè.

## Detailed Answer (EN)
A **change stream** lets an application subscribe to data changes (insert/update/delete) in real time without polling. It reads from the replica set **oplog**, so it requires a replica set or sharded cluster — it does not work on a standalone server.\
\
```js\
const stream = db.collection('orders').watch([\
  { $match: { 'fullDocument.status': 'paid' } }\
], { fullDocument: 'updateLookup' })\
\
for await (const change of stream) {\
  await sendInvoice(change.fullDocument)\
}\
```\
\
Common uses: pushing real-time notifications, syncing to Elasticsearch/cache, writing audit logs, triggering background jobs on status transitions.\
\
Two things to remember in production:\
- By default an `update` event carries only the **delta**; set `fullDocument: 'updateLookup'` to receive the whole document.\
- Every event has an **`_id` that acts as a resume token**. Persist the last processed token so a restarted service can `resumeAfter` it without losing events — as long as the oplog has not rolled over.
