---
id: ingress-controller-explained
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, networking, ingress]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ingress khác Service LoadBalancer ở điểm nào? Ingress Controller đóng vai trò gì và tại sao chỉ định nghĩa Ingress resource thôi thì không đủ?

## Question (EN)
How does Ingress differ from a LoadBalancer Service? What role does an Ingress Controller play, and why isn't defining an Ingress resource alone enough?

## Đáp án chi tiết (VI)
**Service LoadBalancer** cấp **một Load Balancer riêng cho mỗi Service** — nếu có 10 microservice cần expose ra ngoài, bạn tốn 10 Load Balancer (10 IP public, 10 lần phí cloud). Nó cũng chỉ hoạt động ở **Layer 4** (TCP/UDP), không biết gì về HTTP path/host.

**Ingress** giải quyết vấn đề đó bằng cách hoạt động như một **reverse proxy Layer 7** đứng trước nhiều Service, dùng **1 điểm vào duy nhất** (1 LoadBalancer) để route traffic theo:
- **Host-based routing**: `api.example.com` → service A, `admin.example.com` → service B.
- **Path-based routing**: `/api` → service A, `/admin` → service B.
- **TLS termination**: giải mã HTTPS tập trung tại 1 nơi thay vì mỗi service tự lo cert.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:
    - hosts: ["shop.example.com"]
      secretName: shop-tls
  rules:
    - host: shop.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-svc
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-svc
                port:
                  number: 80
```

**Vì sao Ingress resource một mình không đủ — điểm cực kỳ hay bị hỏi**:
`Ingress` chỉ là một **object khai báo ý định (declarative spec)**, giống như một bản thiết kế — nó **không tự chạy proxy nào cả**. Cần có **Ingress Controller** (Nginx Ingress Controller, Traefik, HAProxy, Istio Gateway, cloud-native ALB Ingress Controller...) — một Deployment/DaemonSet chạy thực sự trong cluster, **watch các Ingress object** và tự động cấu hình proxy engine (nginx.conf, Envoy config...) tương ứng.

Không cài Ingress Controller thì tạo Ingress resource xong `kubectl get ingress` vẫn hiện nhưng **`ADDRESS` trống mãi mãi**, không traffic nào được route — đây là lỗi rất phổ biến với người mới ("tôi tạo Ingress rồi mà truy cập không được").

**Ingress Controller thường tự expose ra ngoài qua**:
- Một Service `type: LoadBalancer` (chỉ 1 cái, dùng chung cho toàn bộ Ingress trong cluster) — đây là lý do Ingress tiết kiệm chi phí LB hơn hẳn so với mỗi service 1 LoadBalancer riêng.

**Ingress class**: khi cluster có nhiều Ingress Controller (VD vừa nginx vừa Traefik), `spec.ingressClassName` chỉ định Controller nào xử lý Ingress đó — thiếu field này (hoặc annotation cũ `kubernetes.io/ingress.class`) khiến không controller nào nhận, Ingress bị "treo" im lặng.

**Gateway API** (thế hệ kế tiếp): Kubernetes đang khuyến khích dần chuyển sang **Gateway API** thay Ingress — biểu đạt được nhiều tình huống routing phức tạp hơn (traffic splitting, header-based routing) mà annotation vendor-specific của Ingress không chuẩn hóa được.

## Detailed Answer (EN)
A **LoadBalancer Service** provisions **one dedicated Load Balancer per Service** — with 10 microservices to expose, you'd end up with 10 Load Balancers (10 public IPs, 10x the cloud cost). It also only operates at **Layer 4** (TCP/UDP), unaware of HTTP paths/hosts.

**Ingress** solves this by acting as a **Layer 7 reverse proxy** in front of many Services, using a **single entry point** (one LoadBalancer) to route traffic by:
- **Host-based routing**: `api.example.com` → service A, `admin.example.com` → service B.
- **Path-based routing**: `/api` → service A, `/admin` → service B.
- **TLS termination**: decrypting HTTPS in one centralized place instead of every service managing its own cert.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:
    - hosts: ["shop.example.com"]
      secretName: shop-tls
  rules:
    - host: shop.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-svc
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-svc
                port:
                  number: 80
```

**Why the Ingress resource alone isn't enough — a very commonly probed point**:
An `Ingress` is just a **declarative spec expressing intent**, like a blueprint — it **doesn't run any proxy itself**. You need an **Ingress Controller** (Nginx Ingress Controller, Traefik, HAProxy, Istio Gateway, a cloud-native ALB Ingress Controller, ...) — an actual Deployment/DaemonSet running in the cluster that **watches Ingress objects** and automatically configures the real proxy engine (nginx.conf, Envoy config, ...) accordingly.

Without an Ingress Controller installed, creating an Ingress resource still shows up under `kubectl get ingress`, but its **`ADDRESS` stays empty forever** and no traffic gets routed — a very common beginner confusion ("I created an Ingress but can't reach it").

**How an Ingress Controller typically exposes itself externally**:
- Via a single `type: LoadBalancer` Service (just one, shared across every Ingress in the cluster) — this is exactly why Ingress is far more cost-efficient than one LoadBalancer per service.

**Ingress class**: when a cluster runs multiple Ingress Controllers (e.g. both nginx and Traefik), `spec.ingressClassName` specifies which Controller should handle that Ingress — omitting it (or the legacy `kubernetes.io/ingress.class` annotation) means no controller picks it up, and the Ingress silently sits unprocessed.

**Gateway API** (the next generation): Kubernetes is gradually encouraging a move from Ingress to the **Gateway API** — it can express far more complex routing scenarios (traffic splitting, header-based routing) that Ingress's vendor-specific annotations never standardized.
