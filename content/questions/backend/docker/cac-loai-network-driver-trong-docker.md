---
id: cac-loai-network-driver-trong-docker
position: backend
technology: docker
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các loại network driver trong Docker?

## Question (EN)
What are the Docker network drivers?

## Đáp án chi tiết (VI)
- **bridge** (mặc định): mạng riêng ảo trên một host. Container trong cùng bridge (user-defined) gọi nhau qua **tên container** (DNS nội bộ). Ra ngoài qua NAT.\
- **host**: bỏ cách ly mạng, container dùng **thẳng network stack của host** (nhanh hơn, nhưng đụng port với host).\
- **none**: không có mạng — cô lập hoàn toàn.\
- **overlay**: nối container **qua nhiều host** (dùng với Swarm/orchestration).\
- **macvlan**: gán MAC/IP riêng cho container như một thiết bị vật lý trên LAN.\
\
Thực tế hay dùng **user-defined bridge** để container trong một `docker-compose` gọi nhau bằng tên service.

## Detailed Answer (EN)
- **bridge** (default): a virtual private network on one host. Containers on the same user-defined bridge reach each other by **container name** (built-in DNS). External access is via NAT.\
- **host**: drops network isolation; the container uses the **host network stack directly** (faster, but shares host ports).\
- **none**: no networking — fully isolated.\
- **overlay**: connects containers **across multiple hosts** (used with Swarm/orchestration).\
- **macvlan**: gives a container its own MAC/IP as if a physical device on the LAN.\
\
In practice a **user-defined bridge** is common so containers in one `docker-compose` reach each other by service name.
