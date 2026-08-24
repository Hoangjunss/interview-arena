---
id: iam-role-vs-user-vs-policy
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [iam, security, aws]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt IAM User, IAM Role và IAM Policy trong AWS. Khi nào nên dùng Role thay vì User?

## Question (EN)
Differentiate IAM User, IAM Role, and IAM Policy in AWS. When should you use a Role instead of a User?

## Đáp án chi tiết (VI)
| Khái niệm | Định nghĩa | Ví dụ dùng |
|---|---|---|
| **IAM User** | Định danh lâu dài (long-term identity) cho một người hoặc application cụ thể, có thể có mật khẩu console và/hoặc access key | Nhân viên đăng nhập AWS Console |
| **IAM Role** | Định danh **tạm thời**, không gắn cố định với ai — được "assume" (đảm nhận) bởi user, service, hoặc account khác, sinh ra credential có thời hạn (STS token) | EC2 instance cần gọi S3, Lambda cần gọi DynamoDB |
| **IAM Policy** | Văn bản JSON định nghĩa **permission** (allow/deny action nào trên resource nào) — được gắn (attach) vào User, Group, hoặc Role | Policy cho phép `s3:GetObject` trên 1 bucket |

**Vì sao Role tốt hơn User cho service-to-service:**
1. **Không có access key tĩnh** cần quản lý, rotate, hoặc lo bị lộ trong code/git.
2. Credential từ Role có **thời hạn ngắn** (mặc định 1 giờ, tối đa tùy cấu hình) — nếu bị lộ, thiệt hại giới hạn theo thời gian.
3. Role có thể được gán **trust policy** rõ ràng: chỉ cho phép entity cụ thể (ví dụ EC2 service, hoặc account khác qua cross-account role) assume nó.

**Ví dụ thực tế — gán Role cho EC2:**
```bash
# Tạo role với trust policy cho EC2
aws iam create-role --role-name app-s3-reader \
  --assume-role-policy-document file://trust-policy.json

# Attach permission policy
aws iam attach-role-policy --role-name app-s3-reader \
  --policy-arn arn:aws:iam::123456789012:policy/S3ReadOnlyUploads

# Gán role vào EC2 qua Instance Profile
aws ec2 associate-iam-instance-profile \
  --instance-id i-0abcd1234 \
  --iam-instance-profile Name=app-s3-reader-profile
```

**Khi nào vẫn cần IAM User:** chủ yếu cho con người cần đăng nhập console lâu dài, hoặc trường hợp hiếm cần access key cho công cụ CI/CD chạy ngoài AWS không hỗ trợ OIDC/role assumption — nhưng xu hướng hiện nay (kể cả GitHub Actions, GitLab CI) là dùng **OIDC federation để assume role**, tránh access key tĩnh hoàn toàn.

**Gotcha:** IAM User với access key không hết hạn là rủi ro bảo mật lớn — nhiều vụ leak GitHub repo chứa access key dẫn đến account bị chiếm dụng để mine coin hoặc phá hoại. AWS Trusted Advisor và IAM Credential Report giúp phát hiện access key cũ (>90 ngày) chưa rotate.

**Câu hỏi phỏng vấn nâng cao thường gặp:** "Role có thể assume Role khác không?" — Có, gọi là **role chaining**, nhưng session credential khi chaining bị giới hạn tối đa **1 giờ** (không thể set `DurationSeconds` dài hơn), khác với assume trực tiếp có thể lên tới 12 giờ tùy cấu hình `MaxSessionDuration` của role. Đây là điểm dễ gây lỗi khi thiết kế pipeline CI/CD phải nhảy qua nhiều account.

## Detailed Answer (EN)
| Concept | Definition | Example use |
|---|---|---|
| **IAM User** | A long-term identity for a specific person or application, can have a console password and/or access keys | An employee logging into the AWS Console |
| **IAM Role** | A **temporary** identity, not tied to anyone specifically — "assumed" by a user, service, or another account, producing time-limited credentials (STS tokens) | An EC2 instance calling S3, a Lambda calling DynamoDB |
| **IAM Policy** | A JSON document defining **permissions** (allow/deny which actions on which resources) — attached to a User, Group, or Role | A policy allowing `s3:GetObject` on one bucket |

**Why Roles are better than Users for service-to-service access:**
1. **No static access keys** to manage, rotate, or worry about leaking in code/git.
2. Role credentials are **short-lived** (default 1 hour, configurable up to a limit) — if leaked, the damage window is limited.
3. Roles have an explicit **trust policy**: only specific entities (e.g., the EC2 service, or another account via cross-account role) are allowed to assume it.

**Real example — attaching a Role to EC2:**
```bash
# Create role with EC2 trust policy
aws iam create-role --role-name app-s3-reader \
  --assume-role-policy-document file://trust-policy.json

# Attach permission policy
aws iam attach-role-policy --role-name app-s3-reader \
  --policy-arn arn:aws:iam::123456789012:policy/S3ReadOnlyUploads

# Attach role to EC2 via Instance Profile
aws ec2 associate-iam-instance-profile \
  --instance-id i-0abcd1234 \
  --iam-instance-profile Name=app-s3-reader-profile
```

**When you still need IAM Users:** mainly for humans logging into the console long-term, or rare cases needing access keys for CI/CD tooling outside AWS that doesn't support OIDC/role assumption — but the current trend (including GitHub Actions, GitLab CI) is **OIDC federation to assume a role**, avoiding static access keys entirely.

**Pitfall:** IAM Users with non-expiring access keys are a major security risk — many GitHub repo leaks containing access keys led to accounts being hijacked for crypto mining or sabotage. AWS Trusted Advisor and the IAM Credential Report help detect old access keys (>90 days) that haven't been rotated.

**Common advanced follow-up:** "Can a Role assume another Role?" — Yes, called **role chaining**, but the resulting session credentials are capped at a maximum of **1 hour** (you cannot pass a longer `DurationSeconds`), unlike a direct assume-role which can go up to 12 hours depending on the role's `MaxSessionDuration`. This trips up teams building CI/CD pipelines that hop across multiple AWS accounts.
