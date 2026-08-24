---
id: iam-role-vs-user-cloud-security
position: devops
technology: security-devsecops
level: junior
tags: [iam, cloud-security, least-privilege]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt IAM Role và IAM User trong AWS (hoặc khái niệm tương đương ở GCP/Azure). Tại sao dùng Role gán cho EC2/EKS/Lambda lại an toàn hơn nhiều so với việc nhúng access key của IAM User vào ứng dụng?

## Question (EN)
Differentiate an IAM Role from an IAM User in AWS (or the equivalent concept in GCP/Azure). Why is attaching a Role to EC2/EKS/Lambda much safer than embedding an IAM User's access key in an application?

## Đáp án chi tiết (VI)
**IAM User:**
- Đại diện cho một identity **lâu dài, cố định** (thường gắn với một người hoặc một hệ thống cụ thể).
- Có credential tĩnh: access key ID + secret access key, hoặc password để login console.
- Credential này **không tự hết hạn** trừ khi bị revoke thủ công — đây chính là rủi ro lớn nhất.

**IAM Role:**
- Không có credential cố định gắn liền — mà là một tập quyền có thể được **"assume" (giả định)** tạm thời bởi một identity khác (user, service, hoặc AWS resource như EC2 instance).
- Khi assume role, AWS STS (Security Token Service) cấp **credential tạm thời** (access key + secret key + session token), tự hết hạn sau một khoảng thời gian (thường 1h, tối đa 12h).

**Tại sao Role an toàn hơn nhiều khi gán cho compute resource:**

| Tiêu chí | Access key của IAM User nhúng cứng | IAM Role gán cho EC2/EKS/Lambda |
|---|---|---|
| Vòng đời credential | Tĩnh, tồn tại vĩnh viễn cho đến khi bị xoá thủ công | Tự động xoay vòng (rotate) mỗi vài giờ, không cần can thiệp |
| Rủi ro nếu leak (log, code, image) | Nghiêm trọng — key vẫn dùng được cho đến khi ai đó phát hiện và revoke | Thấp hơn nhiều — kể cả nếu leak, session token hết hạn rất nhanh |
| Cần quản lý ở đâu | Phải lưu key ở đâu đó (env var, secret manager) rồi ứng dụng đọc vào | Không cần lưu key ở bất kỳ đâu — SDK tự động lấy credential từ metadata endpoint |
| Audit trail | Khó biết chính xác request nào đến từ đâu nếu key dùng chung nhiều nơi | Rõ ràng hơn — mỗi resource có role riêng, dễ trace |

**Ví dụ thực tế — SAI vs ĐÚNG:**
```python
# SAI - hardcode access key của IAM User trực tiếp vào code
import boto3
s3 = boto3.client(
    's3',
    aws_access_key_id='AKIAIOSFODNN7EXAMPLE',
    aws_secret_access_key='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
)
```
```python
# ĐÚNG - không cần key nào cả, SDK tự lấy credential tạm thời
# từ EC2 instance metadata / EKS IRSA / Lambda execution role
import boto3
s3 = boto3.client('s3')  # boto3 tự động resolve credential theo role đã gán
```

**Gán Role cho EKS Pod (IRSA - IAM Roles for Service Accounts):**
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/my-app-s3-access
```
Pod dùng ServiceAccount này sẽ tự động có credential tạm thời đúng với quyền của role `my-app-s3-access`, không cần biết bất kỳ access key tĩnh nào — thậm chí không thể lấy được key tĩnh vì nó không tồn tại.

**Khi nào vẫn cần IAM User + access key (trường hợp hiếm, cần cân nhắc kỹ):**
- Ứng dụng chạy ngoài AWS (on-premise, hoặc cloud khác) cần gọi AWS API — không có compute resource AWS nào để gán Role. Giải pháp tốt hơn: dùng **IAM Roles Anywhere** (X.509 certificate) thay vì access key tĩnh nếu có thể, hoặc ít nhất phải kèm rotation nghiêm ngặt qua Secrets Manager.

**Pitfall:** thấy IAM User tiện vì "copy paste access key là chạy được ngay" trong lúc demo/POC, rồi quên không migrate sang Role trước khi lên production — access key demo dễ bị bỏ quên trong code, notebook, hoặc chat nội bộ.

## Detailed Answer (EN)
**IAM User:**
- Represents a **long-lived, fixed** identity (usually tied to a specific person or system).
- Has static credentials: an access key ID + secret access key, or a console login password.
- These credentials **don't expire on their own** unless manually revoked — this is the single biggest risk.

**IAM Role:**
- Has no fixed credentials attached — instead it's a set of permissions that can be **"assumed"** temporarily by another identity (a user, a service, or an AWS resource like an EC2 instance).
- When a role is assumed, AWS STS (Security Token Service) issues **temporary credentials** (access key + secret key + session token) that auto-expire after a set duration (typically 1h, up to 12h max).

**Why Roles are much safer for compute resources:**

| Criteria | Hardcoded IAM User access key | IAM Role attached to EC2/EKS/Lambda |
|---|---|---|
| Credential lifecycle | Static, exists indefinitely until manually deleted | Auto-rotates every few hours, no intervention needed |
| Risk if leaked (log, code, image) | Severe — the key remains usable until someone notices and revokes it | Much lower — even if leaked, the session token expires very quickly |
| Where it must be managed | Must be stored somewhere (env var, secret manager) for the app to read | Nowhere — the SDK auto-fetches credentials from the metadata endpoint |
| Audit trail | Hard to tell exactly which caller a shared key belongs to | Clearer — each resource has its own role, easier to trace |

**Real example — WRONG vs RIGHT:**
```python
# WRONG - hardcoding an IAM User's access key directly in code
import boto3
s3 = boto3.client(
    's3',
    aws_access_key_id='AKIAIOSFODNN7EXAMPLE',
    aws_secret_access_key='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
)
```
```python
# RIGHT - no key needed at all, the SDK auto-fetches temporary credentials
# from EC2 instance metadata / EKS IRSA / the Lambda execution role
import boto3
s3 = boto3.client('s3')  # boto3 auto-resolves credentials from the attached role
```

**Attaching a Role to an EKS Pod (IRSA - IAM Roles for Service Accounts):**
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/my-app-s3-access
```
A Pod using this ServiceAccount automatically gets temporary credentials scoped to the `my-app-s3-access` role's permissions, with no static access key to know about — it can't even be extracted, because it never exists.

**When you still need an IAM User + access key (a rare case, needs careful thought):**
- An application running outside AWS (on-premise, or another cloud) that needs to call AWS APIs — there's no AWS compute resource to attach a Role to. A better option: **IAM Roles Anywhere** (X.509 certificate-based) instead of a static access key where possible, or at minimum enforce strict rotation via Secrets Manager.

**Pitfall:** reaching for an IAM User because "copy-pasting an access key just works" during a demo/POC, then forgetting to migrate to a Role before going to production — demo access keys often get forgotten in code, notebooks, or internal chat messages.
