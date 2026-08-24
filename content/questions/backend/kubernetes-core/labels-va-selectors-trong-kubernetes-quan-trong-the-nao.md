---
id: labels-va-selectors-trong-kubernetes-quan-trong-the-nao
position: backend
technology: kubernetes-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Labels và selectors trong Kubernetes quan trọng thế nào?

## Question (EN)
How important are labels and selectors in Kubernetes?

## Đáp án chi tiết (VI)
Labels là key-value metadata gắn lên objects. Selectors cho Service, Deployment, NetworkPolicy hoặc kubectl chọn đúng objects. Nếu labels/selectors sai, Service không route traffic hoặc Deployment không quản lý Pods đúng.\
\
Ví dụ:\
```yaml\
metadata:\
  labels:\
    app: api\
    tier: backend\
spec:\
  selector:\
    matchLabels:\
      app: api\
```\
Label taxonomy nên nhất quán từ đầu: app, component, version, environment, team. Đừng dùng label tùy hứng cho routing/automation quan trọng.

## Detailed Answer (EN)
Labels are key-value metadata attached to objects. Selectors let Services, Deployments, NetworkPolicies or kubectl choose the correct objects. If labels/selectors are wrong, a Service may not route traffic or a Deployment may not manage Pods correctly.\
\
Example:\
```yaml\
metadata:\
  labels:\
    app: api\
    tier: backend\
spec:\
  selector:\
    matchLabels:\
      app: api\
```\
Keep label taxonomy consistent from the start: app, component, version, environment and team. Avoid casual labels for critical routing/automation.
