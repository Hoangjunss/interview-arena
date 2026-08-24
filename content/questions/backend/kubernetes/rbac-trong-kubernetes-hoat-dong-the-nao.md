---
id: rbac-trong-kubernetes-hoat-dong-the-nao
position: backend
technology: kubernetes
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RBAC trong Kubernetes hoạt động thế nào?

## Question (EN)
How does RBAC work in Kubernetes?

## Đáp án chi tiết (VI)
RBAC (Role-Based Access Control) kiểm soát **ai được thực hiện hành động gì** trên Kubernetes API. Có **4 object** chia làm hai cặp:\
\
- **Role** (phạm vi **một namespace**) và **ClusterRole** (phạm vi **toàn cluster**): định nghĩa một tập **rule** — được làm **verb** gì (`get`, `list`, `create`, `delete`...) trên **resource** nào (pods, secrets...).\
- **RoleBinding** và **ClusterRoleBinding**: **gán** một Role/ClusterRole cho **subject** — user, group, hoặc **ServiceAccount**.\
\
Đặc điểm quan trọng:\
- **Chỉ có allow, không có deny**. Mặc định **từ chối tất cả**; quyền là **cộng dồn** các rule allow.\
- **ServiceAccount**: danh tính cho **pod** gọi API — gán RBAC cho ServiceAccount thay vì cấp quyền rộng.\
- Nguyên tắc **least privilege**: cấp tối thiểu cần thiết, tránh gán `cluster-admin` tuỳ tiện.\
\
Đây là cơ chế phân quyền chuẩn để nhiều team/ứng dụng dùng chung một cluster một cách an toàn.

## Detailed Answer (EN)
RBAC (Role-Based Access Control) governs **who may perform which actions** on the Kubernetes API. There are **4 objects** in two pairs:\
\
- **Role** (scoped to **one namespace**) and **ClusterRole** (scoped to the **whole cluster**): define a set of **rules** — which **verbs** (`get`, `list`, `create`, `delete`...) on which **resources** (pods, secrets...).\
- **RoleBinding** and **ClusterRoleBinding**: **grant** a Role/ClusterRole to a **subject** — a user, group, or **ServiceAccount**.\
\
Key traits:\
- **Allow-only, no deny**. It **denies all** by default; permissions are the **union** of allow rules.\
- **ServiceAccount**: the identity a **pod** uses to call the API — bind RBAC to a ServiceAccount rather than granting broad access.\
- **Least privilege**: grant the minimum needed, avoid handing out `cluster-admin` carelessly.\
\
This is the standard authorization mechanism letting many teams/apps share one cluster safely.
