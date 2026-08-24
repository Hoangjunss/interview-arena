---
id: helm-la-gi-giai-quyet-van-de-gi-trong-kubernetes
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Helm là gì? Giải quyết vấn đề gì trong Kubernetes?

## Question (EN)
What is Helm and what problem does it solve in Kubernetes?

## Đáp án chi tiết (VI)
Helm là **package manager cho Kubernetes** — ví như apt/npm nhưng cho các resource K8s. Đơn vị đóng gói là **chart**: một bộ manifest được **template hóa** kèm file `values.yaml`.\
\
Helm giải quyết:\
- **Lặp lại YAML**: một ứng dụng thực tế cần nhiều manifest (Deployment, Service, Ingress, ConfigMap...). Chart gom chúng lại và **tham số hóa** để cùng một chart deploy được cho dev/staging/prod chỉ bằng `values` khác nhau.\
- **Versioning + rollback**: mỗi lần cài/cập nhật tạo một **release** có lịch sử → `helm rollback` quay lại phiên bản trước.\
- **Chia sẻ + dependency**: kéo chart công khai (Bitnami...) và khai báo chart phụ thuộc.\
\
Lệnh chính: `helm install`, `helm upgrade`, `helm rollback`, `helm uninstall`. Tóm lại Helm quản lý **cài đặt và vòng đời** của một ứng dụng nhiều manifest như một gói duy nhất.

## Detailed Answer (EN)
Helm is the **package manager for Kubernetes** — like apt/npm but for K8s resources. Its packaging unit is a **chart**: a set of **templated** manifests plus a `values.yaml` file.\
\
Helm solves:\
- **YAML repetition**: a real app needs many manifests (Deployment, Service, Ingress, ConfigMap...). A chart bundles and **parameterizes** them so the same chart deploys to dev/staging/prod with different `values`.\
- **Versioning + rollback**: each install/upgrade creates a **release** with history → `helm rollback` reverts to a prior version.\
- **Sharing + dependencies**: pull public charts (Bitnami...) and declare chart dependencies.\
\
Key commands: `helm install`, `helm upgrade`, `helm rollback`, `helm uninstall`. In short, Helm manages the **installation and lifecycle** of a multi-manifest app as one package.
