---
id: docker-port-publishing-va-container-network-can-hieu-gi
position: backend
technology: compose-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker port publishing và container network cần hiểu gì?

## Question (EN)
What should you understand about Docker port publishing and container networking?

## Đáp án chi tiết (VI)
Container có network namespace riêng. Service bên trong có thể listen trên port 8000, nhưng host chỉ truy cập được nếu publish port hoặc cùng network có service khác gọi bằng container/service name.\
\
Ví dụ:\
```bash\
docker run --rm -p 8080:8000 my-api\
```\
`8080:8000` nghĩa là host port 8080 trỏ vào container port 8000. Trong Docker Compose, services cùng network thường gọi nhau bằng tên service, không gọi `localhost`.

## Detailed Answer (EN)
A container has its own network namespace. A service inside it can listen on port 8000, but the host can only reach it when the port is published or another service on the same network calls it by container/service name.\
\
Example:\
```bash\
docker run --rm -p 8080:8000 my-api\
```\
`8080:8000` means host port 8080 maps to container port 8000. In Docker Compose, services on the same network usually call each other by service name, not `localhost`.
