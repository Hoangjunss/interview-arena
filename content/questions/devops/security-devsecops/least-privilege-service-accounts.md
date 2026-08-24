---
id: least-privilege-service-accounts
position: devops
technology: security-devsecops
level: junior
tags: [least-privilege, iam, service-accounts]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên tắc "least privilege" (đặc quyền tối thiểu) áp dụng cho service account nghĩa là gì? Cho ví dụ một service account bị cấp quyền quá rộng và cách khắc phục.

## Question (EN)
What does the "principle of least privilege" mean when applied to service accounts? Give an example of an over-privileged service account and how to fix it.

## Đáp án chi tiết (VI)
**Principle of least privilege (PoLP)** nghĩa là mỗi identity (user, service account, ứng dụng) chỉ được cấp đúng những quyền tối thiểu cần thiết để thực hiện nhiệm vụ của nó — không hơn. Áp dụng cho service account (tài khoản mà ứng dụng/pipeline dùng để gọi API, không phải người dùng thật) vì:
- Service account thường có credential tồn tại lâu dài, tự động hoá, ít được giám sát trực tiếp bởi con người.
- Nếu bị lộ (leak trong log, code, image), phạm vi thiệt hại (blast radius) tỉ lệ thuận với quyền hạn được cấp.

**Ví dụ sai — service account quá rộng quyền (AWS):**
```json
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}
```
Một Lambda chỉ cần đọc 1 bucket S3 cụ thể để xử lý ảnh nhưng lại được gắn policy `AdministratorAccess` — nếu function bị exploit (VD: SSRF khai thác được credential từ metadata endpoint), kẻ tấn công có toàn quyền trên cả AWS account.

**Sửa lại đúng nguyên tắc least privilege:**
```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::image-processing-bucket/*"
}
```

**Ví dụ trong Kubernetes** — ServiceAccount cho một Pod chỉ cần đọc ConfigMap nhưng bị gắn `cluster-admin`:
```yaml
# SAI
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: app-binding
subjects:
  - kind: ServiceAccount
    name: my-app-sa
roleRef:
  kind: ClusterRole
  name: cluster-admin
```
```yaml
# ĐÚNG - Role giới hạn trong namespace, chỉ quyền cần thiết
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: my-app-ns
  name: configmap-reader
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-binding
  namespace: my-app-ns
subjects:
  - kind: ServiceAccount
    name: my-app-sa
roleRef:
  kind: Role
  name: configmap-reader
  apiGroup: rbac.authorization.k8s.io
```

**Cách thực hành PoLP trong tổ chức:**
1. Bắt đầu từ **zero quyền**, thêm dần theo nhu cầu thực tế thay vì copy policy rộng có sẵn cho "tiện".
2. Dùng công cụ như **AWS IAM Access Analyzer**, **kubeaudit**, hoặc **Polaris** để phát hiện policy/role thừa quyền không dùng đến.
3. Review định kỳ (quarterly access review) — quyền cấp lúc launch project có thể không còn cần sau khi kiến trúc thay đổi.
4. Tách riêng service account theo môi trường (dev/staging/prod) và theo chức năng, tránh dùng chung 1 service account cho nhiều service khác nhau.

**Pitfall:** cấp quyền rộng "cho chắc" để tránh phải quay lại xin thêm permission — đây là nguyên nhân phổ biến nhất khiến một lỗ hổng nhỏ (SSRF, RCE cục bộ) biến thành sự cố toàn hệ thống.

## Detailed Answer (EN)
**Principle of least privilege (PoLP)** means every identity (user, service account, application) is granted only the minimum permissions required to do its job — nothing more. It matters especially for service accounts (accounts an application/pipeline uses to call APIs, not a human) because:
- Service account credentials tend to be long-lived, automated, and less directly monitored by humans.
- If leaked (in logs, code, an image), the blast radius scales directly with the permissions granted.

**Bad example — over-privileged service account (AWS):**
```json
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}
```
A Lambda that only needs to read one specific S3 bucket to process images is attached to `AdministratorAccess` — if the function is exploited (e.g., an SSRF that pulls credentials from the metadata endpoint), the attacker gets full control of the AWS account.

**Fixed to follow least privilege:**
```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::image-processing-bucket/*"
}
```

**Kubernetes example** — a Pod's ServiceAccount only needs to read a ConfigMap but is bound to `cluster-admin`:
```yaml
# WRONG
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: app-binding
subjects:
  - kind: ServiceAccount
    name: my-app-sa
roleRef:
  kind: ClusterRole
  name: cluster-admin
```
```yaml
# CORRECT - namespace-scoped Role, only the needed permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: my-app-ns
  name: configmap-reader
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-binding
  namespace: my-app-ns
subjects:
  - kind: ServiceAccount
    name: my-app-sa
roleRef:
  kind: Role
  name: configmap-reader
  apiGroup: rbac.authorization.k8s.io
```

**How to practice PoLP organizationally:**
1. Start from **zero permissions** and add incrementally based on actual need, instead of copying a broad existing policy for convenience.
2. Use tools like **AWS IAM Access Analyzer**, **kubeaudit**, or **Polaris** to detect unused over-permissive policies/roles.
3. Run periodic access reviews (quarterly) — permissions granted at project launch may no longer be needed after the architecture changes.
4. Separate service accounts per environment (dev/staging/prod) and per function; avoid sharing one service account across multiple services.

**Pitfall:** granting broad permissions "just to be safe" to avoid asking for more access later — this is the most common reason a small vulnerability (SSRF, local RCE) escalates into a system-wide incident.
