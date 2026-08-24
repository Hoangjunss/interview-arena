---
id: docker-compose-dung-de-lam-gi
position: backend
technology: docker
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker Compose dùng để làm gì?

## Question (EN)
What is Docker Compose used for?

## Đáp án chi tiết (VI)
Compose định nghĩa và chạy ứng dụng **nhiều container** bằng một file YAML (`compose.yaml`). Thay vì gõ nhiều lệnh `docker run`, khai báo toàn bộ stack rồi `docker compose up`.\
\
- Mỗi **service** = một container (web, api, db, redis...), khai báo image, port, env, volume, depends_on.\
- Compose tự tạo một **network chung** để các service gọi nhau bằng **tên service**.\
- Lệnh: `up` (khởi động), `down` (dừng + dọn), `logs`, `ps`.\
\
Hợp cho **môi trường dev/local và test**. Với production đa host thường chuyển sang orchestrator như Kubernetes.

## Detailed Answer (EN)
Compose defines and runs **multi-container** apps from one YAML file (`compose.yaml`). Instead of many `docker run` commands, you declare the whole stack and run `docker compose up`.\
\
- Each **service** = a container (web, api, db, redis...), declaring image, ports, env, volumes, depends_on.\
- Compose creates a **shared network** so services reach each other by **service name**.\
- Commands: `up` (start), `down` (stop + clean), `logs`, `ps`.\
\
Great for **dev/local and testing**. For multi-host production you usually move to an orchestrator like Kubernetes.
