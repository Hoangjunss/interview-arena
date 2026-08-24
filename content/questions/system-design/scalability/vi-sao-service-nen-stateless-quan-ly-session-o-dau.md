---
id: vi-sao-service-nen-stateless-quan-ly-session-o-dau
position: system-design
technology: scalability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao service nên stateless? Quản lý session ở đâu?

## Question (EN)
Why should services be stateless, and where does session state go?

## Đáp án chi tiết (VI)
Một service **stateless** không giữ trạng thái phiên giữa các request trong bộ nhớ cục bộ; mỗi request tự chứa đủ ngữ cảnh (hoặc tra từ store dùng chung).\
\
Vì sao quan trọng:\
- **Scale ngang tự do**: mọi instance tương đương → load balancer gửi request tới bất kỳ node nào, thêm/bớt node thoải mái.\
- **Chịu lỗi tốt**: một node chết không mất session của user.\
- Không cần **sticky session** (ghim user vào một node, gây mất cân bằng).\
\
Để state ở đâu:\
- **Session store dùng chung** (Redis/Memcached) — mọi node truy cập được.\
- **Token phía client** (JWT): trạng thái nằm trong token đã ký, server không cần lưu (đổi lại khó thu hồi ngay).\
- Dữ liệu bền → **database**; file → **object storage**.\
\
Nguyên tắc: đẩy state ra khỏi tầng compute, giữ tầng ứng dụng stateless.

## Detailed Answer (EN)
A **stateless** service keeps no session state in local memory between requests; each request carries enough context (or looks it up from a shared store).\
\
Why it matters:\
- **Free horizontal scaling**: all instances are interchangeable → the load balancer can send a request to any node, and you add/remove nodes freely.\
- **Fault tolerance**: a dead node loses no user's session.\
- No need for **sticky sessions** (pinning a user to one node, causing imbalance).\
\
Where state goes:\
- A **shared session store** (Redis/Memcached) — reachable by every node.\
- A **client-side token** (JWT): state lives in the signed token, the server stores nothing (harder to revoke instantly).\
- Durable data → the **database**; files → **object storage**.\
\
Principle: push state out of the compute tier, keep the app tier stateless.
