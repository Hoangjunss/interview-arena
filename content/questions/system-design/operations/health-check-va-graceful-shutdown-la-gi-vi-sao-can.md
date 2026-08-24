---
id: health-check-va-graceful-shutdown-la-gi-vi-sao-can
position: system-design
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Health check và graceful shutdown là gì? Vì sao cần?

## Question (EN)
What are health checks and graceful shutdown, and why are they needed?

## Đáp án chi tiết (VI)
**Health check**: endpoint (vd `/healthz`) để load balancer/orchestrator (Kubernetes) biết instance có sống và sẵn sàng nhận traffic không. Hai loại thường phân biệt:\
- **Liveness**: process còn sống không? Fail → **restart** instance.\
- **Readiness**: đã sẵn sàng phục vụ chưa (đã nối DB, nạp xong cache)? Fail → **ngừng gửi traffic** tới nó nhưng không kill.\
\
**Graceful shutdown**: khi instance nhận tín hiệu dừng (SIGTERM lúc deploy/scale-down), nó **không cắt đột ngột** mà: ngừng nhận request mới → **xử lý nốt** request đang chạy (trong một khoảng grace) → đóng kết nối DB/queue → mới thoát.\
\
Vì sao cần: tránh **rớt request giữa chừng**, mất dữ liệu hay trả lỗi cho user khi deploy/rolling update. Kết hợp: readiness báo \\"đang tắt\\" để LB rút traffic trước, rồi graceful drain phần còn lại.

## Detailed Answer (EN)
**Health check**: an endpoint (e.g. `/healthz`) that lets the load balancer/orchestrator (Kubernetes) know whether an instance is alive and ready to take traffic. Two kinds are usually distinguished:\
- **Liveness**: is the process alive? Failing → **restart** the instance.\
- **Readiness**: is it ready to serve (DB connected, cache warmed)? Failing → **stop routing traffic** to it but do not kill it.\
\
**Graceful shutdown**: when an instance gets a stop signal (SIGTERM on deploy/scale-down), it does **not cut off abruptly** but: stops accepting new requests → **finishes** in-flight requests (within a grace period) → closes DB/queue connections → then exits.\
\
Why needed: avoids **dropping requests mid-flight**, losing data, or erroring users during deploys/rolling updates. Combined: readiness signals \\"shutting down\\" so the LB drains traffic first, then a graceful drain finishes the rest.
