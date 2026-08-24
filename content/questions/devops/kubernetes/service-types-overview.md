---
id: service-types-overview
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, networking, service]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kubernetes có những loại Service nào (ClusterIP, NodePort, LoadBalancer, ExternalName)? Khác nhau ở đâu và khi nào dùng loại nào?

## Question (EN)
What Service types does Kubernetes offer (ClusterIP, NodePort, LoadBalancer, ExternalName)? How do they differ, and when would you use each?

## Đáp án chi tiết (VI)
**Service** là một địa chỉ ổn định (VIP) đứng trước một nhóm Pod (chọn qua label selector), giải quyết vấn đề Pod bị đổi IP liên tục khi bị tạo lại.

| Loại | Phạm vi truy cập | Cơ chế | Dùng khi |
|---|---|---|---|
| **ClusterIP** (mặc định) | Chỉ trong nội bộ cluster | Cấp 1 IP ảo cố định, kube-proxy route traffic tới Pod qua iptables/IPVS | Giao tiếp giữa các service nội bộ (backend gọi backend) |
| **NodePort** | Từ bên ngoài, qua `<NodeIP>:<NodePort>` | Mở một port cố định (30000-32767) trên **mọi** node, forward vào ClusterIP | Test nhanh, on-prem không có cloud LB, hoặc backend cho Ingress controller tự triển khai |
| **LoadBalancer** | Từ Internet, qua IP public | Yêu cầu cloud provider (AWS ELB, GCP LB...) cấp một Load Balancer thật, trỏ vào NodePort | Expose service ra Internet trên môi trường cloud |
| **ExternalName** | Không route Pod, chỉ là CNAME | Trả về DNS CNAME trỏ tới một domain ngoài (VD: `db.external.com`) | Cho Pod trong cluster gọi một service bên ngoài bằng tên nội bộ, dễ đổi endpoint sau này |

**Chi tiết quan trọng dễ bị hỏi xoáy**:
- LoadBalancer **thực chất bao gồm cả NodePort và ClusterIP** — nó là lớp ngoài cùng của 3 loại, mỗi Service LoadBalancer đều có sẵn NodePort đi kèm (trừ khi bạn set `allocateLoadBalancerNodePorts: false` trên K8s mới).
- Service không phải là process hay Pod — nó chỉ là **rule mạng** (iptables/IPVS) do kube-proxy quản lý, không có gì "chạy" thực sự.
- `spec.selector` của Service khớp với `labels` trên Pod template — nếu quên gắn label đúng, Service sẽ có `Endpoints` rỗng (`kubectl get endpoints <svc>` trả về `<none>`) — lỗi rất phổ biến khi mới học.
- **Headless Service** (`clusterIP: None`) không cấp VIP, trả thẳng DNS record cho từng Pod IP — dùng cho StatefulSet để mỗi Pod có DNS riêng ổn định.

Ví dụ NodePort:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: NodePort
  selector:
    app: web
  ports:
    - port: 80          # port của Service (nội bộ)
      targetPort: 8080  # port container
      nodePort: 30080   # port mở trên mọi node
```

Debug nhanh khi Service không hoạt động:
```bash
kubectl get endpoints web        # rỗng => sai selector/label
kubectl describe svc web         # xem selector, port mapping
kubectl get pods -l app=web      # confirm Pod có đúng label không
```

## Detailed Answer (EN)
A **Service** is a stable address (a VIP) sitting in front of a group of Pods (chosen via a label selector), solving the problem of Pod IPs changing every time they're recreated.

| Type | Reachable from | Mechanism | Use when |
|---|---|---|---|
| **ClusterIP** (default) | Cluster-internal only | Assigns a fixed virtual IP; kube-proxy routes traffic to Pods via iptables/IPVS | Internal service-to-service traffic |
| **NodePort** | Externally, via `<NodeIP>:<NodePort>` | Opens a fixed port (30000-32767) on **every** node, forwarding to the ClusterIP | Quick testing, on-prem without a cloud LB, or as the backend for a self-deployed Ingress controller |
| **LoadBalancer** | Internet, via a public IP | Asks the cloud provider (AWS ELB, GCP LB, ...) to provision a real load balancer pointing at the NodePort | Exposing a service to the Internet on cloud environments |
| **ExternalName** | No Pod routing — it's just a CNAME | Returns a DNS CNAME pointing to an external domain (e.g. `db.external.com`) | Letting in-cluster Pods call an external service by an internal name, making the endpoint easy to swap later |

**Details commonly probed further**:
- LoadBalancer actually **includes NodePort and ClusterIP underneath it** — it's the outermost layer of the three; every LoadBalancer Service comes with a NodePort by default (unless you set `allocateLoadBalancerNodePorts: false` on newer Kubernetes).
- A Service is not a process or a Pod — it's purely a **network rule** (iptables/IPVS) managed by kube-proxy; nothing is actually "running".
- The Service's `spec.selector` matches `labels` on the Pod template — forget to label Pods correctly and the Service ends up with empty `Endpoints` (`kubectl get endpoints <svc>` returns `<none>`) — a very common beginner bug.
- A **headless Service** (`clusterIP: None`) doesn't assign a VIP — it returns DNS records for each Pod IP directly — used by StatefulSets so each Pod gets its own stable DNS name.

Example NodePort:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: NodePort
  selector:
    app: web
  ports:
    - port: 80          # Service's internal port
      targetPort: 8080  # container port
      nodePort: 30080   # port opened on every node
```

Quick debugging when a Service isn't working:
```bash
kubectl get endpoints web        # empty => wrong selector/labels
kubectl describe svc web         # inspect selector, port mapping
kubectl get pods -l app=web      # confirm Pods carry the right label
```
