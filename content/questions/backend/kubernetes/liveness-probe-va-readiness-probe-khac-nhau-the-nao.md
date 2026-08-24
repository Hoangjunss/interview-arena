---
id: liveness-probe-va-readiness-probe-khac-nhau-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Liveness probe và readiness probe khác nhau thế nào?

## Question (EN)
What is the difference between liveness and readiness probes?

## Đáp án chi tiết (VI)
Cả hai là **health check** kubelet chạy định kỳ trên container, nhưng phản ứng khác nhau khi fail:\
\
- **Liveness probe**: \\"container còn sống không?\\" Fail → kubelet **restart container** (dùng khi app treo/deadlock).\
- **Readiness probe**: \\"container sẵn sàng nhận traffic chưa?\\" Fail → **gỡ pod khỏi endpoint của Service** (ngừng gửi request) nhưng **không restart**. Dùng khi app đang warm-up hoặc mất kết nối dependency tạm thời.\
- **Startup probe**: dành cho app khởi động chậm — hoãn liveness/readiness cho tới khi app boot xong.\
\
Kiểu kiểm tra: `httpGet`, `tcpSocket`, hoặc `exec`. Sai probe (liveness quá gắt) dễ gây restart loop.

## Detailed Answer (EN)
Both are **health checks** the kubelet runs periodically on a container, but they react differently on failure:\
\
- **Liveness probe**: \\"is the container alive?\\" On failure the kubelet **restarts the container** (for hangs/deadlocks).\
- **Readiness probe**: \\"is the container ready for traffic?\\" On failure the pod is **removed from the Service endpoints** (stops receiving requests) but is **not restarted**. Use during warm-up or transient dependency loss.\
- **Startup probe**: for slow-starting apps — delays liveness/readiness until the app has booted.\
\
Check types: `httpGet`, `tcpSocket`, or `exec`. A misconfigured (too-aggressive) liveness probe can cause restart loops.
