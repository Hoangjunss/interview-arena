---
id: docker-healthcheck-dung-khi-nao
position: backend
technology: docker-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker `HEALTHCHECK` dùng khi nào?

## Question (EN)
When should Docker `HEALTHCHECK` be used?

## Đáp án chi tiết (VI)
`HEALTHCHECK` cho Docker biết container process còn sống chưa đủ, app có thật sự healthy hay không. Nó có thể gọi endpoint nội bộ, kiểm tra port hoặc chạy command nhẹ.\
\
Ví dụ:\
```\
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\\\
  CMD wget -qO- http://localhost:8000/health || exit 1\
```\
Healthcheck không nên nặng hoặc phụ thuộc hệ thống ngoài quá xa. Với Kubernetes, thường dùng probes thay vì chỉ dựa vào Docker healthcheck.

## Detailed Answer (EN)
`HEALTHCHECK` tells Docker whether the app is actually healthy, not just whether the container process is still alive. It can call an internal endpoint, check a port or run a lightweight command.\
\
Example:\
```\
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\\\
  CMD wget -qO- http://localhost:8000/health || exit 1\
```\
A healthcheck should not be heavy or depend on far external systems. With Kubernetes, probes are usually used instead of relying only on Docker healthcheck.
