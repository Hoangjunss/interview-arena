---
id: ttl-index-trong-mongodb-dung-khi-nao
position: backend
technology: indexes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TTL index trong MongoDB dùng khi nào?

## Question (EN)
When should you use a TTL index in MongoDB?

## Đáp án chi tiết (VI)
TTL (Time-To-Live) index dùng để **tự động xóa document** sau một khoảng thời gian, dựa trên một field kiểu `Date`.\
\
**Hợp cho:** dữ liệu tạm như session, token/OTP, link xác thực, log ngắn hạn, cache.\
\
**Ví dụ:**\
```javascript\
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })\
```\
\
*Lưu ý:* việc xóa **không tức thời tuyệt đối** — một tiến trình nền chạy định kỳ (khoảng 60 giây/lần) mới dọn. Vì vậy đừng dùng TTL cho nghiệp vụ cần xóa chính xác đến từng giây.

## Detailed Answer (EN)
A TTL (Time-To-Live) index **automatically deletes documents** after a set time, based on a `Date` field.\
\
**Good for:** temporary data like sessions, tokens/OTPs, verification links, short-lived logs, cache.\
\
**Example:**\
```javascript\
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })\
```\
\
*Note:* deletion is **not perfectly real-time** — a background process runs periodically (about every 60 seconds) to clean up. So don't use TTL for business logic that needs second-precise deletion.
