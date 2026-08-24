---
id: iam-cross-account-role-assume
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [iam, security, multi-account]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao để cho phép một service ở account AWS A truy cập tài nguyên ở account AWS B một cách an toàn, không dùng access key tĩnh?

## Question (EN)
How do you securely allow a service in AWS account A to access resources in account B, without using static access keys?

## Đáp án chi tiết (VI)
**Giải pháp chuẩn: Cross-Account IAM Role với `sts:AssumeRole`.**

**Kiến trúc:**
```
Account A (source)                Account B (target)
  Service/User X   --assume-role-->  Role Y (trust A)  --có permission-->  Resource (S3, RDS...)
```

**Bước 1 — Tạo Role ở Account B với Trust Policy cho phép Account A assume:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::111111111111:role/service-x-role" },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": { "sts:ExternalId": "unique-shared-secret-id" }
      }
    }
  ]
}
```

**Bước 2 — Gắn permission policy vào Role Y** (ví dụ cho phép đọc S3 bucket cụ thể ở account B).

**Bước 3 — Ở Account A, service X gọi AssumeRole:**
```bash
aws sts assume-role \
  --role-arn arn:aws:iam::222222222222:role/cross-account-role \
  --role-session-name service-x-session \
  --external-id unique-shared-secret-id
```
Kết quả trả về `AccessKeyId`, `SecretAccessKey`, `SessionToken` **tạm thời** (mặc định 1 giờ), dùng để gọi API ở account B.

**Vì sao dùng `ExternalId`:** chống lại **"confused deputy problem"** — trường hợp bên thứ 3 (ví dụ SaaS vendor) được cấp quyền assume role vào account bạn để phục vụ nhiều khách hàng khác nhau; nếu không có ExternalId, một khách hàng ác ý có thể lừa vendor gọi nhầm assume role vào account của khách hàng khác. ExternalId là "mật khẩu" thêm chỉ bên được ủy quyền biết.

**Trong container/EKS — dùng IRSA (IAM Roles for Service Accounts) hoặc Pod Identity thay vì access key:**
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: service-x-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::222222222222:role/cross-account-role
```
Pod dùng service account này tự động nhận credential tạm thời qua OIDC federation, không cần access key nào trong code/secret.

**Gotcha:**
- Quên giới hạn `Resource` trong permission policy của Role Y — dễ cấp quyền rộng hơn cần thiết cho toàn bộ account B thay vì chỉ resource cụ thể.
- Trust policy dùng `"Principal": {"AWS": "arn:aws:iam::111111111111:root"}` (toàn bộ account A) thay vì role cụ thể — làm mất tính chặt chẽ, **bất kỳ identity nào** trong account A có quyền `sts:AssumeRole` đều assume được, vi phạm least privilege.
- Session credential hết hạn giữa chừng tác vụ dài — cần code tự động refresh trước khi hết hạn (SDK AWS thường tự làm điều này nếu dùng đúng credential provider chain).

## Detailed Answer (EN)
**Standard solution: Cross-Account IAM Role with `sts:AssumeRole`.**

**Architecture:**
```
Account A (source)                Account B (target)
  Service/User X   --assume-role-->  Role Y (trusts A)  --has permission-->  Resource (S3, RDS...)
```

**Step 1 — Create a Role in Account B with a Trust Policy allowing Account A to assume it:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::111111111111:role/service-x-role" },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": { "sts:ExternalId": "unique-shared-secret-id" }
      }
    }
  ]
}
```

**Step 2 — Attach a permission policy to Role Y** (e.g. allowing read access to a specific S3 bucket in account B).

**Step 3 — In Account A, service X calls AssumeRole:**
```bash
aws sts assume-role \
  --role-arn arn:aws:iam::222222222222:role/cross-account-role \
  --role-session-name service-x-session \
  --external-id unique-shared-secret-id
```
The response returns **temporary** `AccessKeyId`, `SecretAccessKey`, `SessionToken` (1 hour by default), used to call APIs in account B.

**Why use `ExternalId`:** it protects against the **"confused deputy problem"** — a case where a third party (e.g. a SaaS vendor) is allowed to assume a role into your account on behalf of many different customers; without an ExternalId, a malicious customer could trick the vendor into assuming the role into a different customer's account. ExternalId is an extra "password" known only to the authorized party.

**In containers/EKS — use IRSA (IAM Roles for Service Accounts) or Pod Identity instead of access keys:**
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: service-x-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::222222222222:role/cross-account-role
```
Pods using this service account automatically get temporary credentials via OIDC federation — no access keys anywhere in code or secrets.

**Pitfalls:**
- Forgetting to constrain `Resource` in Role Y's permission policy — easy to accidentally grant broader access than needed across all of account B instead of a specific resource.
- Using a trust policy with `"Principal": {"AWS": "arn:aws:iam::111111111111:root"}` (the entire account A) instead of a specific role — loosens the boundary, letting **any identity** in account A with `sts:AssumeRole` permission assume the role, violating least privilege.
- Session credentials expiring mid-task for long-running work — code needs to auto-refresh before expiry (the AWS SDK usually handles this automatically with the correct credential provider chain).
