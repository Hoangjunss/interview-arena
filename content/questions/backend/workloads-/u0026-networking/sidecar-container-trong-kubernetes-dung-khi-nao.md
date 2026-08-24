---
id: sidecar-container-trong-kubernetes-dung-khi-nao
position: backend
technology: workloads-\u0026-networking
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sidecar container trong Kubernetes dùng khi nào?

## Question (EN)
When should sidecar containers be used in Kubernetes?

## Đáp án chi tiết (VI)
Sidecar là container phụ trợ chạy cùng Pod với app chính để cung cấp chức năng gắn chặt như proxy service mesh, log shipper, config reloader hoặc local agent. Sidecar chia sẻ network và volumes với app container, nên phù hợp khi hai phần cần cùng lifecycle.\
\
Ví dụ:\
```yaml\
containers:\
  - name: app\
    image: api:1.0.0\
  - name: log-shipper\
    image: log-agent:1.0.0\
```\
Sidecar tăng tài nguyên và complexity. Chỉ dùng khi lifecycle/network/storage coupling thật sự cần cùng Pod.

## Detailed Answer (EN)
A sidecar is a helper container running in the same Pod as the main app to provide tightly coupled functionality such as a service mesh proxy, log shipper, config reloader or local agent. It shares network and volumes with the app container, so it fits when both parts need the same lifecycle.\
\
Example:\
```yaml\
containers:\
  - name: app\
    image: api:1.0.0\
  - name: log-shipper\
    image: log-agent:1.0.0\
```\
Sidecars increase resource use and complexity. Use them only when lifecycle/network/storage coupling really needs the same Pod.
