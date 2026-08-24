---
id: session-storage-voi-redis-tai-sao-redis-la-lua-chon-tot-hon-database-cho-session
position: backend
technology: patterns-\u0026-use-cases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Session storage với Redis: tại sao Redis là lựa chọn tốt hơn database cho session?

## Question (EN)
Session storage with Redis: why is Redis a better choice than a database for sessions?

## Đáp án chi tiết (VI)
Session cần đặc tính: đọc/ghi nhanh (mỗi request authenticated cần verify session), TTL-based expiration (logout tự động sau idle time), và không cần persist lâu dài. Redis rất phù hợp: O(1) GET/SET, native TTL support (`SETEX session:abc123 3600 '{userId:1,...}'`), in-memory nên sub-millisecond latency. So với database: query DB mỗi request tốn 1-10ms thêm; DB không có native TTL; cần background job cleanup expired sessions. **Implementation pattern:**\
```bash\
# Login: tạo session\
SET session:{token} {json_data} EX 86400\
# Verify: đọc session\
GET session:{token}\
# Logout: xóa session ngay\
DEL session:{token}\
# Extend: renew TTL khi user active\
EXPIRE session:{token} 86400\
```\
Với Sentinel/Cluster: session available ngay cả khi một node fail. **Lưu ý:** không lưu sensitive data trong session JSON — chỉ lưu user_id, roles; sensitive data lấy từ DB. Express.js `connect-redis`, Next.js `iron-session` đều support Redis backend.

## Detailed Answer (EN)
$84
