---
id: policy-as-code-opa-sentinel
position: devops
technology: terraform-iac
level: senior
tags: [policy-as-code, opa, sentinel, compliance]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Policy as Code là gì và giải quyết vấn đề gì mà code review thủ công không giải quyết được? So sánh cách tiếp cận của Sentinel và OPA (Open Policy Agent) trong hệ sinh thái Terraform.

## Question (EN)
What is Policy as Code and what problem does it solve that manual code review cannot? Compare Sentinel and OPA (Open Policy Agent) in the Terraform ecosystem.

## Đáp án chi tiết (VI)
**Vấn đề của chỉ dựa vào code review thủ công:**
- Người review là con người, dễ **bỏ sót** vi phạm compliance khi PR lớn (hàng trăm dòng thay đổi), đặc biệt các rule tinh vi (ví dụ "mọi S3 bucket ở prod phải bật versioning + không cho public-read").
- Rule về compliance/security thường **thay đổi theo thời gian** (theo audit, theo chính sách công ty mới) — nếu chỉ dựa vào review thủ công, phải đào tạo lại toàn bộ team mỗi lần rule thay đổi, không nhất quán giữa các reviewer.
- Không có cách nào **block cứng** một cách tự động và nhất quán 100% — con người có thể merge nhầm dù biết rule.

**Policy as Code**: viết các rule compliance/security dưới dạng **code có thể test, version control, và tự động thực thi** trong pipeline — biến review thủ công thành một **gate tự động** không thể bỏ qua.

**Sentinel (HashiCorp, tích hợp sẵn trong Terraform Cloud/Enterprise):**
```python
import "tfplan/v2" as tfplan

s3_buckets = filter tfplan.resource_changes as _, rc {
  rc.type is "aws_s3_bucket" and
  (rc.change.actions contains "create" or rc.change.actions contains "update")
}

versioning_enabled = rule {
  all s3_buckets as _, bucket {
    bucket.change.after.versioning[0].enabled is true
  }
}

main = rule {
  versioning_enabled
}
```
- Chạy **ngay trong quy trình `plan`/`apply` của Terraform Cloud**, có 3 mức enforcement: `advisory` (chỉ cảnh báo), `soft-mandatory` (chặn nhưng override được bởi người có quyền), `hard-mandatory` (chặn tuyệt đối).
- Nhược điểm: chỉ hoạt động trong hệ sinh thái Terraform Cloud/Enterprise (trả phí), không dùng được với Terraform OSS thuần hay công cụ IaC khác.

**OPA (Open Policy Agent) + Rego, dùng qua `conftest`:**
```rego
package terraform

deny[msg] {
  resource := input.resource_changes[_]
  resource.type == "aws_s3_bucket"
  not resource.change.after.versioning[0].enabled
  msg := sprintf("S3 bucket %s must have versioning enabled", [resource.address])
}
```
```bash
terraform show -json plan.tfplan > plan.json
conftest test plan.json -p policies/
```
- **Mã nguồn mở, không phụ thuộc vendor** — dùng được cho Terraform, Kubernetes manifest, Docker image, bất kỳ input JSON/YAML nào, nên phù hợp làm **chuẩn policy chung** cho cả tổ chức thay vì chỉ riêng Terraform.
- Cần tự tích hợp vào pipeline CI (GitHub Actions, GitLab CI) thay vì có sẵn UI như Sentinel.
- Ngôn ngữ Rego có đường cong học tập riêng, khó đọc hơn với người chưa quen logic programming.

**So sánh:**
| Tiêu chí | Sentinel | OPA/Rego |
|---|---|---|
| Vendor lock-in | Có (HashiCorp, cần Terraform Cloud/Enterprise) | Không, mã nguồn mở |
| Phạm vi áp dụng | Chỉ Terraform (trong hệ Terraform Cloud) | Đa dụng: Terraform, K8s, API gateway... |
| Enforcement levels | 3 mức built-in (advisory/soft/hard mandatory) | Tự định nghĩa qua CI (pass/fail) |
| Tích hợp | Native trong Terraform Cloud/Enterprise | Cần tự setup pipeline (conftest, OPA server) |
| Độ khó ngôn ngữ | Trung bình | Cao hơn với người mới (Rego khá đặc thù) |

**Ví dụ rule thực tế hay gặp trong tổ chức:**
- Chặn tạo resource không có tag `Owner` hoặc `CostCenter` (quản lý chi phí).
- Chặn mở security group `0.0.0.0/0` vào port SSH/RDP.
- Bắt buộc mọi RDS instance ở prod phải có `multi_az = true` và `deletion_protection = true`.
- Giới hạn instance type được phép tạo (tránh ai đó vô tình tạo instance quá đắt).

**Kiến trúc triển khai thực tế ở tổ chức lớn:** policy-as-code thường chạy ở **2 điểm**: (1) trong CI trên mọi PR (feedback nhanh cho dev), và (2) là gate bắt buộc ngay trước `apply` thật trên production (không thể bypass dù CI đã pass do có thể có drift giữa lúc PR review và lúc thực sự apply).

## Detailed Answer (EN)
**Problems with relying solely on manual code review:**
- Reviewers are human and easily **miss** compliance violations in large PRs (hundreds of changed lines), especially subtle rules (e.g., "every S3 bucket in prod must have versioning enabled and no public-read").
- Compliance/security rules **change over time** (from audits, new company policy) — relying only on manual review means retraining the whole team every time a rule changes, with inconsistent enforcement across reviewers.
- There's no way to **hard-block** automatically and 100% consistently — a human can still merge something despite knowing the rule.

**Policy as Code**: writing compliance/security rules as **testable, version-controlled, automatically-enforced code** in the pipeline — turning manual review into an **automatic gate** that cannot be skipped.

**Sentinel (HashiCorp, built into Terraform Cloud/Enterprise):**
```python
import "tfplan/v2" as tfplan

s3_buckets = filter tfplan.resource_changes as _, rc {
  rc.type is "aws_s3_bucket" and
  (rc.change.actions contains "create" or rc.change.actions contains "update")
}

versioning_enabled = rule {
  all s3_buckets as _, bucket {
    bucket.change.after.versioning[0].enabled is true
  }
}

main = rule {
  versioning_enabled
}
```
- Runs **directly within Terraform Cloud's `plan`/`apply` workflow**, with 3 enforcement levels: `advisory` (warning only), `soft-mandatory` (blocks but overridable by an authorized person), `hard-mandatory` (absolute block).
- Downside: only works within the Terraform Cloud/Enterprise ecosystem (paid), not usable with plain Terraform OSS or other IaC tools.

**OPA (Open Policy Agent) + Rego, used via `conftest`:**
```rego
package terraform

deny[msg] {
  resource := input.resource_changes[_]
  resource.type == "aws_s3_bucket"
  not resource.change.after.versioning[0].enabled
  msg := sprintf("S3 bucket %s must have versioning enabled", [resource.address])
}
```
```bash
terraform show -json plan.tfplan > plan.json
conftest test plan.json -p policies/
```
- **Open source, vendor-agnostic** — works for Terraform, Kubernetes manifests, Docker images, any JSON/YAML input, making it a good candidate for a **shared policy standard** across an organization rather than just for Terraform.
- Requires manually integrating into a CI pipeline (GitHub Actions, GitLab CI) instead of a ready-made UI like Sentinel.
- Rego has its own learning curve and reads less naturally to people unfamiliar with logic programming.

**Comparison:**
| Criteria | Sentinel | OPA/Rego |
|---|---|---|
| Vendor lock-in | Yes (HashiCorp, requires Terraform Cloud/Enterprise) | No, open source |
| Applicable scope | Terraform only (within Terraform Cloud) | General-purpose: Terraform, K8s, API gateways, etc. |
| Enforcement levels | 3 built-in levels (advisory/soft/hard mandatory) | Custom-defined via CI (pass/fail) |
| Integration | Native in Terraform Cloud/Enterprise | Requires setting up your own pipeline (conftest, OPA server) |
| Language difficulty | Moderate | Higher for newcomers (Rego is fairly specific) |

**Common real-world rule examples:**
- Blocking resource creation without an `Owner` or `CostCenter` tag (cost management).
- Blocking security groups that open `0.0.0.0/0` to SSH/RDP.
- Requiring every production RDS instance to have `multi_az = true` and `deletion_protection = true`.
- Restricting which instance types can be created (preventing accidental creation of very expensive instances).

**Real-world deployment architecture at large organizations:** policy-as-code typically runs at **two points**: (1) in CI on every PR (fast feedback for developers), and (2) as a mandatory gate right before the real `apply` against production (cannot be bypassed even if CI passed, since drift can occur between PR review time and actual apply time).
