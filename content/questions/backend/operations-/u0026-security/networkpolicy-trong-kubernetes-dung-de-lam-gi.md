---
id: networkpolicy-trong-kubernetes-dung-de-lam-gi
position: backend
technology: operations-\u0026-security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
NetworkPolicy trong Kubernetes dùng để làm gì?

## Question (EN)
What is NetworkPolicy used for in Kubernetes?

## Đáp án chi tiết (VI)
NetworkPolicy kiểm soát traffic ingress/egress giữa Pods/namespaces/IP blocks, nếu cluster CNI hỗ trợ enforcement. Mặc định nhiều cluster cho phép traffic rộng, nên NetworkPolicy giúp giảm blast radius.\
\
Ví dụ chỉ cho frontend gọi api:\
```yaml\
apiVersion: networking.k8s.io/v1\
kind: NetworkPolicy\
metadata:\
  name: api-from-frontend\
spec:\
  podSelector:\
    matchLabels:\
      app: api\
  ingress:\
    - from:\
        - podSelector:\
            matchLabels:\
              app: frontend\
```\
Cần test kỹ DNS, metrics, ingress controller và egress dependencies vì policy sai có thể làm app mất kết nối.

## Detailed Answer (EN)
NetworkPolicy controls ingress/egress traffic between Pods/namespaces/IP blocks when the cluster CNI supports enforcement. Many clusters allow broad traffic by default, so NetworkPolicy reduces blast radius.\
\
Example allowing only frontend to call api:\
```yaml\
apiVersion: networking.k8s.io/v1\
kind: NetworkPolicy\
metadata:\
  name: api-from-frontend\
spec:\
  podSelector:\
    matchLabels:\
      app: api\
  ingress:\
    - from:\
        - podSelector:\
            matchLabels:\
              app: frontend\
```\
Test DNS, metrics, ingress controller and egress dependencies carefully because a wrong policy can disconnect the app.
