---
id: reverse-proxy-vs-load-balancer
position: devops
technology: linux-networking-ops
level: junior
tags: [networking, load-balancing, nginx, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt reverse proxy và load balancer. Nginx và HAProxy có thể đóng vai trò nào?

## Question (EN)
Distinguish between a reverse proxy and a load balancer. What roles can Nginx and HAProxy play?

## Đáp án chi tiết (VI)
Hai khái niệm này hay bị dùng lẫn lộn vì **một load balancer luôn là một dạng reverse proxy đặc biệt**, nhưng không phải reverse proxy nào cũng làm nhiệm vụ load balancing.

**Reverse proxy**: là một server đứng **giữa client và (một hoặc nhiều) backend server**, nhận request thay mặt backend, rồi forward tới backend phù hợp, cuối cùng trả response lại cho client như thể chính nó xử lý. Client không biết (và không cần biết) backend thật sự là gì.

Vai trò chính của reverse proxy:
- **Ẩn topology backend**: client chỉ thấy 1 địa chỉ public.
- **TLS termination**: giải mã HTTPS tại proxy, backend chỉ cần chạy HTTP nội bộ.
- **Routing theo path/host**: `/api/*` → service A, `/static/*` → service B (dùng cho microservices/API gateway).
- **Caching, compression, rate limiting, WAF**.
- Có thể chỉ có **1 backend duy nhất** (không cần cân bằng tải) — vẫn là reverse proxy hợp lệ.

**Load balancer**: tập trung vào **phân phối traffic đồng đều/hợp lý giữa nhiều backend instance giống nhau**, với mục tiêu chính là scale ngang và high availability (nếu 1 backend chết, tự động loại khỏi pool). Load balancer bản chất **là một reverse proxy** khi nó hoạt động ở layer 7 (HTTP), nhưng cũng có thể hoạt động ở **layer 4** (TCP/UDP, không hiểu HTTP, chỉ forward theo IP:port) — trường hợp này không còn là "reverse proxy" theo nghĩa hẹp vì không xử lý nội dung HTTP.

Bảng so sánh:

| Tiêu chí | Reverse proxy | Load balancer |
|---|---|---|
| Mục tiêu chính | Ẩn backend, routing, TLS, cache | Phân phối tải, HA |
| Số backend | Có thể chỉ 1 | Thường ≥ 2 (cùng chức năng) |
| Layer | Chủ yếu L7 | L4 hoặc L7 |
| Thuật toán chọn backend | Không cần (route cố định) | round-robin, least-conn, ip-hash... |
| Ví dụ | Nginx làm gateway cho 1 app | HAProxy/Nginx upstream với nhiều server, ELB/NLB |

**Nginx**: mặc định hoạt động như reverse proxy L7 (module `proxy_pass`), và có thể làm load balancer L7 khi cấu hình `upstream` với nhiều server:
```nginx
upstream backend_pool {
    least_conn;
    server 10.0.1.10:8080;
    server 10.0.1.11:8080;
    server 10.0.1.12:8080 backup;
}
server {
    listen 443 ssl;
    location / {
        proxy_pass http://backend_pool;
    }
}
```

**HAProxy**: thiên về load balancer chuyên dụng, hỗ trợ cả **L4 (TCP mode)** và **L7 (HTTP mode)**, có nhiều thuật toán cân bằng tải và health check phong phú hơn Nginx (`roundrobin`, `leastconn`, `source`, `uri`...), thường được chọn khi cần cân bằng tải L4 hiệu năng cao hoặc logic routing L7 phức tạp (ACL dựa trên header, cookie-based session persistence).

```
frontend web
    bind *:443
    default_backend backend_pool
backend backend_pool
    balance leastconn
    server web1 10.0.1.10:8080 check
    server web2 10.0.1.11:8080 check
```

**Tóm gọn để trả lời phỏng vấn**: mọi load balancer HTTP đều là reverse proxy, nhưng reverse proxy không nhất thiết phải cân bằng tải — sự khác biệt nằm ở **mục đích sử dụng** (routing/ẩn topology vs phân phối tải + HA) chứ không phải công cụ, vì cùng một phần mềm (Nginx, HAProxy, Envoy) có thể đóng cả hai vai trò tùy cấu hình.

## Detailed Answer (EN)
These two terms are often confused because **a load balancer is always a specialized form of reverse proxy**, but not every reverse proxy does load balancing.

**Reverse proxy**: a server sitting **between clients and one or more backend servers**, receiving requests on the backend's behalf, forwarding them to the right backend, and returning the response to the client as if it had handled it itself. The client doesn't know (and doesn't need to know) what the real backend is.

Main roles of a reverse proxy:
- **Hiding backend topology**: the client only sees one public address.
- **TLS termination**: decrypting HTTPS at the proxy so backends only need to run plain HTTP internally.
- **Path/host-based routing**: `/api/*` → service A, `/static/*` → service B (used in microservices/API gateways).
- **Caching, compression, rate limiting, WAF**.
- It may forward to just **one backend** (no load balancing needed) and still be a valid reverse proxy.

**Load balancer**: focused on **distributing traffic evenly/appropriately across multiple identical backend instances**, primarily for horizontal scaling and high availability (automatically removing a dead backend from the pool). A load balancer is essentially **a reverse proxy** when operating at layer 7 (HTTP), but it can also operate at **layer 4** (TCP/UDP, no HTTP awareness, just forwarding by IP:port) — in that case it's not strictly a "reverse proxy" since it doesn't inspect HTTP content.

Comparison:

| Criterion | Reverse proxy | Load balancer |
|---|---|---|
| Primary goal | Hide backend, routing, TLS, caching | Traffic distribution, HA |
| Number of backends | Can be just 1 | Usually ≥ 2 (same function) |
| Layer | Mostly L7 | L4 or L7 |
| Backend-selection algorithm | Not needed (fixed routing) | round-robin, least-conn, ip-hash... |
| Example | Nginx acting as gateway for 1 app | HAProxy/Nginx upstream with multiple servers, ELB/NLB |

**Nginx**: by default acts as an L7 reverse proxy (the `proxy_pass` directive), and can act as an L7 load balancer when configured with an `upstream` block listing multiple servers:
```nginx
upstream backend_pool {
    least_conn;
    server 10.0.1.10:8080;
    server 10.0.1.11:8080;
    server 10.0.1.12:8080 backup;
}
server {
    listen 443 ssl;
    location / {
        proxy_pass http://backend_pool;
    }
}
```

**HAProxy**: leans toward being a dedicated load balancer, supporting both **L4 (TCP mode)** and **L7 (HTTP mode)**, with richer load-balancing algorithms and health checks than Nginx (`roundrobin`, `leastconn`, `source`, `uri`, etc.) — commonly chosen for high-performance L4 balancing or complex L7 routing logic (header-based ACLs, cookie-based session persistence).

```
frontend web
    bind *:443
    default_backend backend_pool
backend backend_pool
    balance leastconn
    server web1 10.0.1.10:8080 check
    server web2 10.0.1.11:8080 check
```

**Interview-ready summary**: every HTTP load balancer is a reverse proxy, but a reverse proxy doesn't have to do load balancing — the distinction is about **purpose** (routing/hiding topology vs distributing load + HA), not the tool itself, since the same software (Nginx, HAProxy, Envoy) can play either role depending on configuration.
