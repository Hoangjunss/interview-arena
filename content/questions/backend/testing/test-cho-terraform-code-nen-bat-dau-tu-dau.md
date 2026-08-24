---
id: test-cho-terraform-code-nen-bat-dau-tu-dau
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test cho Terraform code nên bắt đầu từ đâu?

## Question (EN)
Where should testing Terraform code start?

## Đáp án chi tiết (VI)
Từ `fmt` + `validate` + `plan` tự động trong CI. Ba bước này rẻ, chạy vài giây, và bắt được phần lớn lỗi trước khi hạ tầng bị đụng tới.\
\
Các tầng theo mức đầu tư tăng dần:\
\
```bash\
terraform fmt -check -recursive     # format\
terraform validate                  # cu phap + kieu du lieu\
tfsec . \u0026\u0026 checkov -d .             # scan cau hinh bao mat\
terraform plan -out=tfplan          # doi chieu voi thuc te\
terraform show -json tfplan | jq '.resource_changes[] | select(.change.actions[] == \\"delete\\")'\
```\
\
Dòng cuối là kiểm tra đáng có nhất mà nhiều team bỏ qua: **chặn merge nếu plan có destroy trên resource stateful**.\
\
Tầng nặng hơn là dựng thật rồi xoá — `terraform test` (native, từ 1.6) hoặc Terratest. Với module dùng chung toàn công ty thì đáng, vì một bug trong module lan ra mọi team dùng nó.

## Detailed Answer (EN)
With `fmt`, `validate` and an automated `plan` in CI. These three are cheap, run in seconds, and catch most errors before infrastructure is touched.\
\
Layers by increasing investment:\
\
```bash\
terraform fmt -check -recursive     # formatting\
terraform validate                  # syntax and types\
tfsec . \u0026\u0026 checkov -d .             # security configuration scan\
terraform plan -out=tfplan          # compare against reality\
terraform show -json tfplan | jq '.resource_changes[] | select(.change.actions[] == \\"delete\\")'\
```\
\
That last line is the single most worthwhile check teams skip: **block merges when the plan destroys stateful resources**.\
\
The heavier layer provisions for real and tears down — `terraform test` (native since 1.6) or Terratest. Worth it for company-wide shared modules, since a module bug reaches every consuming team.
