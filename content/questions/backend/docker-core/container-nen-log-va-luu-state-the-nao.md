---
id: container-nen-log-va-luu-state-the-nao
position: backend
technology: docker-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container nên log và lưu state thế nào?

## Question (EN)
How should containers handle logs and state?

## Đáp án chi tiết (VI)
Container app nên log ra stdout/stderr để platform thu thập, thay vì ghi file log local khó gom. State quan trọng nên lưu ở database, object storage, queue hoặc volume được backup, không phụ thuộc writable layer của container.\
\
Container nên được thiết kế stateless càng nhiều càng tốt để scale, restart và rolling update dễ hơn. Nếu container cần state, phải có strategy rõ cho persistence, backup, migration và recovery.

## Detailed Answer (EN)
Containerized apps should log to stdout/stderr so the platform can collect logs, instead of writing local log files that are hard to aggregate. Important state should live in a database, object storage, queue or backed-up volume, not in the container writable layer.\
\
Containers should be as stateless as practical to make scaling, restarts and rolling updates easier. If a container needs state, it needs a clear persistence, backup, migration and recovery strategy.
