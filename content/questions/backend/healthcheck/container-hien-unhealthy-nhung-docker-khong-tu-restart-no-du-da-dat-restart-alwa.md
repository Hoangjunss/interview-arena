---
id: container-hien-unhealthy-nhung-docker-khong-tu-restart-no-du-da-dat-restart-alwa
position: backend
technology: healthcheck
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container hiện `unhealthy` nhưng Docker không tự restart nó dù đã đặt `restart: always`. Vì sao?

## Question (EN)
A container shows `unhealthy` but Docker never restarts it even with `restart: always`. Why?

## Đáp án chi tiết (VI)
Vì `HEALTHCHECK` và **restart policy là hai cơ chế độc lập**. Restart policy chỉ phản ứng khi process chính **thoát** (exit code khác 0, hoặc bất kỳ exit code nào với `always`). Container `unhealthy` mà process vẫn sống thì Docker Engine **chỉ đổi trạng thái**, không kill, không restart.\
\
```dockerfile\
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \\\\\
  CMD curl -fsS http://localhost:3000/healthz || exit 1\
```\
\
Giá trị thật của healthcheck nằm ở việc **hạ tầng bên ngoài đọc trạng thái đó**:\
- Compose: `depends_on: { db: { condition: service_healthy } }` để service chờ đúng lúc DB sẵn sàng.\
- Load balancer / orchestrator loại container unhealthy khỏi vòng định tuyến.\
- Kubernetes: `livenessProbe` **có** restart container, `readinessProbe` gỡ Pod khỏi Service — đây là thứ Docker standalone không làm thay.\
\
Tham số quan trọng hay bị bỏ: `--start-period` (thời gian khởi động, fail trong giai đoạn này không tính vào `retries`) — thiếu nó thì app khởi động chậm sẽ bị đánh dấu unhealthy oan.

## Detailed Answer (EN)
$83
