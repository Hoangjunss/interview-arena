---
id: declarative-vs-push-based-deployment
position: devops
technology: gitops-release-mgmt
level: junior
tags: [gitops, ci-cd, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt deployment kiểu "declarative + pull-based" (GitOps) và "imperative + push-based" (CI/CD truyền thống). Cho ví dụ cụ thể.

## Question (EN)
Distinguish "declarative + pull-based" deployment (GitOps) from "imperative + push-based" deployment (traditional CI/CD). Give a concrete example.

## Đáp án chi tiết (VI)
Có hai trục cần tách riêng: **declarative vs imperative** (mô tả cái gì cần đạt được, hay ra lệnh từng bước) và **push vs pull** (ai chủ động đẩy thay đổi vào hệ thống).

**Declarative (khai báo):** bạn định nghĩa **trạng thái mong muốn cuối cùng**, hệ thống tự tìm cách đạt tới đó.
```yaml
# Ví dụ: deployment.yaml khai báo "tôi muốn 3 replicas, image v1.2.0"
spec:
  replicas: 3
  template:
    spec:
      containers:
        - image: myapp:v1.2.0
```
**Imperative (mệnh lệnh):** bạn ra lệnh từng bước cụ thể để thực hiện thay đổi.
```bash
kubectl scale deployment myapp --replicas=3
kubectl set image deployment/myapp myapp=myapp:v1.2.0
```

**Push-based:** một hệ thống bên ngoài (CI server như Jenkins/GitLab CI) **chủ động kết nối** tới cluster và đẩy thay đổi vào (`kubectl apply`, `helm upgrade --install`). CI server cần credentials/kubeconfig của cluster.

**Pull-based (GitOps):** một agent **chạy bên trong cluster** (ArgoCD, Flux) tự động **kéo** cấu hình mới nhất từ Git về và áp dụng. Không ai từ bên ngoài cần quyền ghi trực tiếp vào cluster.

| | Push-based | Pull-based (GitOps) |
|---|---|---|
| Ai khởi tạo apply | CI pipeline (bên ngoài cluster) | Controller trong cluster |
| Bảo mật | Phải cấp quyền cluster cho CI (nguy cơ leak credential) | Cluster tự quản lý, không lộ quyền ra ngoài |
| Phát hiện drift | Không | Có (continuous reconciliation) |
| Độ trễ | Ngay khi pipeline chạy | Có polling interval hoặc webhook trigger |

**Trong thực tế:** GitOps luôn đi cùng declarative (Kubernetes YAML vốn dĩ là declarative) và pull-based (ArgoCD/Flux). CI/CD truyền thống thường push-based và có thể declarative (Helm/Terraform) hoặc imperative (script bash gọi `kubectl` từng lệnh).

**Lưu ý phỏng vấn:** một câu hỏi bẫy thường gặp là "Helm có phải GitOps không?" — câu trả lời: Helm chỉ là công cụ templating/packaging declarative, không tự nó là GitOps. Nó trở thành một phần của GitOps workflow chỉ khi được ArgoCD/Flux quản lý và pull từ Git.

## Detailed Answer (EN)
There are two separate axes here: **declarative vs imperative** (describing the desired end state vs issuing step-by-step commands) and **push vs pull** (who actively drives the change into the system).

**Declarative:** you define the **desired final state**, and the system figures out how to get there.
```yaml
# Example: deployment.yaml declares "I want 3 replicas, image v1.2.0"
spec:
  replicas: 3
  template:
    spec:
      containers:
        - image: myapp:v1.2.0
```
**Imperative:** you issue specific step-by-step commands to make the change happen.
```bash
kubectl scale deployment myapp --replicas=3
kubectl set image deployment/myapp myapp=myapp:v1.2.0
```

**Push-based:** an external system (a CI server like Jenkins/GitLab CI) **actively connects** to the cluster and pushes changes in (`kubectl apply`, `helm upgrade --install`). The CI server needs the cluster's credentials/kubeconfig.

**Pull-based (GitOps):** an agent **running inside the cluster** (ArgoCD, Flux) automatically **pulls** the latest config from Git and applies it. No external system needs direct write access to the cluster.

| | Push-based | Pull-based (GitOps) |
|---|---|---|
| Who triggers apply | CI pipeline (outside the cluster) | Controller inside the cluster |
| Security | CI needs cluster credentials (credential leak risk) | Cluster self-manages; no access exposed externally |
| Drift detection | None | Yes (continuous reconciliation) |
| Latency | Immediate when the pipeline runs | Polling interval or webhook trigger |

**In practice:** GitOps is always paired with declarative configs (Kubernetes YAML is inherently declarative) and pull-based agents (ArgoCD/Flux). Traditional CI/CD is usually push-based and can be either declarative (Helm/Terraform) or imperative (a bash script calling `kubectl` step by step).

**Interview note:** a common trick question is "Is Helm GitOps?" — the answer: Helm is just a declarative templating/packaging tool, it isn't GitOps by itself. It only becomes part of a GitOps workflow when it's managed by ArgoCD/Flux and pulled from Git.
