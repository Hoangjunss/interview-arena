---
id: trong-docker-compose-service-api-ket-noi-toi-db-bang-host-nao-vi-sao-localhost-k
position: backend
technology: networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Docker Compose, service `api` kết nối tới `db` bằng host nào? Vì sao `localhost` không chạy?

## Question (EN)
In Docker Compose, what host does the `api` service use to reach `db`? Why does `localhost` not work?

## Đáp án chi tiết (VI)
Dùng **tên service** làm hostname: `db:5432`. `localhost` bên trong container trỏ về **chính container đó**, không phải máy host hay container khác — mỗi container có network namespace riêng.\
\
Compose tự tạo một **user-defined bridge network** cho project và bật **DNS nội bộ**, nên mọi service trong cùng network phân giải được nhau bằng tên service (và cả alias nếu khai báo).\
\
```yaml\
services:\
  api:\
    environment:\
      DATABASE_URL: postgres://app@db:5432/app   # service name, not localhost\
    depends_on: [db]\
  db:\
    image: postgres:16\
    ports:\
      - \\"5433:5432\\"   # only needed for access from the host machine\
```\
\
Hai điểm hay nhầm:\
- **Port mapping (`ports`) không cần thiết** để hai service gọi nhau; container nói chuyện qua **cổng nội bộ** (5432), không phải cổng đã publish (5433).\
- Muốn container gọi ngược về service chạy trên máy host thì dùng `host.docker.internal` (Docker Desktop) thay vì `localhost`.

## Detailed Answer (EN)
Use the **service name** as the hostname: `db:5432`. Inside a container, `localhost` refers to **that container itself**, not the host machine or another container — each container has its own network namespace.\
\
Compose creates a **user-defined bridge network** for the project with **built-in DNS**, so every service on that network resolves the others by service name (and by alias if declared).\
\
```yaml\
services:\
  api:\
    environment:\
      DATABASE_URL: postgres://app@db:5432/app   # service name, not localhost\
    depends_on: [db]\
  db:\
    image: postgres:16\
    ports:\
      - \\"5433:5432\\"   # only needed for access from the host machine\
```\
\
Two common mix-ups:\
- **Port mapping (`ports`) is not required** for services to reach each other; containers talk over the **internal port** (5432), not the published one (5433).\
- To reach a service running on the host machine from inside a container, use `host.docker.internal` (Docker Desktop) rather than `localhost`.
