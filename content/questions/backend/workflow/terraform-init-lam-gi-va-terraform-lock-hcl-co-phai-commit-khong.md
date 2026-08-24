---
id: terraform-init-lam-gi-va-terraform-lock-hcl-co-phai-commit-khong
position: backend
technology: workflow
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`terraform init` làm gì, và `.terraform.lock.hcl` có phải commit không?

## Question (EN)
What does `terraform init` do, and should `.terraform.lock.hcl` be committed?

## Đáp án chi tiết (VI)
`init` tải provider + module về `.terraform/`, cấu hình backend, và sinh hoặc cập nhật `.terraform.lock.hcl`. **Lock file phải commit.**\
\
```bash\
terraform init                 # lần đầu, hoặc khi thêm provider/module\
terraform init -upgrade        # cho phép nâng provider trong ràng buộc version\
terraform init -migrate-state  # khi đổi backend\
```\
\
Lock file ghi version chính xác + checksum của từng provider. Không commit thì mỗi máy resolve ra một version khác, plan khác nhau giữa laptop và CI, rồi cãi nhau ai đúng.\
\
```hcl\
provider \\"registry.terraform.io/hashicorp/aws\\" {\
  version     = \\"5.42.0\\"\
  constraints = \\"~\u003e 5.40\\"\
  hashes      = [\\"h1:...\\"]\
}\
```\
\
Chỗ cần cẩn thận là `-migrate-state`: khi đổi backend, Terraform hỏi có copy state sang chỗ mới không. Trả lời sai là mất dấu toàn bộ hạ tầng đang chạy, nên backup state trước khi đổi backend.

## Detailed Answer (EN)
`init` downloads providers and modules into `.terraform/`, configures the backend, and writes `.terraform.lock.hcl`. **The lock file must be committed.**\
\
```bash\
terraform init                 # first run, or after adding a provider/module\
terraform init -upgrade        # allow provider upgrades within constraints\
terraform init -migrate-state  # when changing backend\
```\
\
The lock file records exact versions and checksums per provider. Uncommitted, every machine resolves different versions — plans differ between a laptop and CI and the team argues about which is right.\
\
```hcl\
provider \\"registry.terraform.io/hashicorp/aws\\" {\
  version     = \\"5.42.0\\"\
  constraints = \\"~\u003e 5.40\\"\
  hashes      = [\\"h1:...\\"]\
}\
```\
\
The risky part is `-migrate-state`: when changing backend Terraform asks whether to copy state across. A wrong answer loses track of running infrastructure — back up state before any backend change.
