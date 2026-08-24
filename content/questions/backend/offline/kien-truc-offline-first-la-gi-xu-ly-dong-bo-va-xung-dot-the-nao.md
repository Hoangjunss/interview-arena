---
id: kien-truc-offline-first-la-gi-xu-ly-dong-bo-va-xung-dot-the-nao
position: backend
technology: offline
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiến trúc offline-first là gì? Xử lý đồng bộ và xung đột thế nào?

## Question (EN)
What is offline-first architecture and how do you handle sync and conflicts?

## Đáp án chi tiết (VI)
App **offline-first** cho phép dùng chức năng cốt lõi **không cần mạng**: đọc/ghi vào **kho cục bộ trước**, rồi đồng bộ với server khi có kết nối. Local là nguồn UI đọc ra; mạng chỉ để đồng bộ.\
\
Thành phần:\
- **Nguồn dữ liệu cục bộ** (SQLite/Room/Realm) làm single source of truth cho UI.\
- **Repository** điều phối giữa local và network.\
\
Ghi khi offline:\
- **Queue/outbox**: xếp thao tác ghi lại, gửi khi online (dùng WorkManager/background sync).\
- Cập nhật UI **lạc quan (optimistic)** ngay, hoàn tác nếu server từ chối.\
\
Đồng bộ \u0026 xung đột:\
- Kéo (pull) theo yêu cầu, đẩy (push) chủ động, hoặc lai (hybrid).\
- Xung đột: chiến lược **last-write-wins** theo timestamp, hoặc merge theo field, hoặc để người dùng chọn; đánh version/`updatedAt` để phát hiện lệch.\
\
Hay hỏi: vì sao cần idempotency khi retry ghi, và cách tránh mất dữ liệu khi cùng lúc sửa hai nơi.

## Detailed Answer (EN)
An **offline-first** app lets you use core features **without a network**: read/write to a **local store first**, then sync with the server when connectivity returns. Local is what the UI reads; the network only syncs.\
\
Components:\
- A **local data source** (SQLite/Room/Realm) as the single source of truth for the UI.\
- A **repository** that coordinates local and network.\
\
Writing while offline:\
- **Queue/outbox**: enqueue write operations and send them when online (via WorkManager/background sync).\
- Update the UI **optimistically** right away, rolling back if the server rejects it.\
\
Sync \u0026 conflicts:\
- Pull on demand, push proactively, or a hybrid.\
- Conflicts: **last-write-wins** by timestamp, or field-level merge, or let the user choose; version/`updatedAt` stamps detect divergence.\
\
Common ask: why idempotency matters when retrying writes, and how to avoid data loss when two places edit concurrently.
