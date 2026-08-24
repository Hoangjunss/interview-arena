---
id: kubernetes-service-types-khac-nhau-the-nao
position: backend
technology: workloads-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kubernetes Service types khác nhau thế nào?

## Question (EN)
How are Kubernetes Service types different?

## Đáp án chi tiết (VI)
`ClusterIP` expose service nội bộ trong cluster. `NodePort` mở port trên nodes. `LoadBalancer` yêu cầu cloud/load balancer provider tạo load balancer bên ngoài. `ExternalName` map service sang DNS name ngoài cluster.\
\
Ví dụ `ClusterIP`:\
```yaml\
apiVersion: v1\
kind: Service\
metadata:\
  name: api\
spec:\
  selector:\
    app: api\
  ports:\
    - port: 80\
      targetPort: 8000\
```\
Phần quan trọng là selector phải match labels của Pods, nếu không Service sẽ không có endpoints.

## Detailed Answer (EN)
`ClusterIP` exposes a service inside the cluster. `NodePort` opens a port on nodes. `LoadBalancer` asks the cloud/load balancer provider to create an external load balancer. `ExternalName` maps a service to an external DNS name.\
\
`ClusterIP` example:\
```yaml\
apiVersion: v1\
kind: Service\
metadata:\
  name: api\
spec:\
  selector:\
    app: api\
  ports:\
    - port: 80\
      targetPort: 8000\
```\
The key point is that the selector must match Pod labels, otherwise the Service has no endpoints.
