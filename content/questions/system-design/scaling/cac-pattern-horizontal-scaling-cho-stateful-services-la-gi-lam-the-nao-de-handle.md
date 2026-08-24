---
id: cac-pattern-horizontal-scaling-cho-stateful-services-la-gi-lam-the-nao-de-handle
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các pattern horizontal scaling cho stateful services là gì? Làm thế nào để handle session state?

## Question (EN)
What are horizontal scaling patterns for stateful services? How do you handle session state?

## Đáp án chi tiết (VI)
Stateful services yêu cầu externalize state; các lựa chọn chính là Sticky Sessions, Externalized Store (Redis), và JWT — mỗi cách có trade-off riêng về complexity và failover.\
\
- **Sticky Sessions**: load balancer route cùng user về cùng server dựa trên cookie — đơn giản nhưng tạo uneven load và failover khó.\
- **Externalized Session Store**: lưu session trong Redis/Memcached thay vì in-memory — mọi instance đọc được, dễ scale và failover.\
- **JWT Tokens**: encode state vào token, server không lưu state — hoàn toàn stateless nhưng không thể revoke trước khi expire (giải quyết bằng blacklist).\
- **Database-backed Sessions**: lưu session trong DB — đơn giản nhưng chậm hơn Redis.\
\
Thực tế: JWT cho authentication + Redis cho session data ngắn hạn là pattern phổ biến nhất.

## Detailed Answer (EN)
Stateful services require externalizing state; the main options are Sticky Sessions, Externalized Store (Redis), and JWT — each with different trade-offs on complexity and failover.\
\
- **Sticky Sessions**: load balancer routes the same user to the same server via cookie — simple but creates uneven load and complicates failover.\
- **Externalized Session Store**: store sessions in Redis/Memcached — every instance can read the session, enabling easy scaling and failover.\
- **JWT Tokens**: encode state into the token, server stores no state — fully stateless but tokens cannot be revoked before expiry (mitigated with a blacklist).\
- **Database-backed Sessions**: store in the database — simple but slower than Redis.\
\
In practice: JWT for authentication + Redis for short-lived session data is the most common pattern.
