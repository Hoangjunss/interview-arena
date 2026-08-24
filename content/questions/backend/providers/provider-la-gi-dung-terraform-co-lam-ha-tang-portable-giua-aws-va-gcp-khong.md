---
id: provider-la-gi-dung-terraform-co-lam-ha-tang-portable-giua-aws-va-gcp-khong
position: backend
technology: providers
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Provider là gì? Dùng Terraform có làm hạ tầng portable giữa AWS và GCP không?

## Question (EN)
What is a provider? Does Terraform make infrastructure portable between AWS and GCP?

## Đáp án chi tiết (VI)
**Không.** Provider là plugin dịch resource block thành API call của một dịch vụ cụ thể, mà resource của mỗi cloud khác nhau hoàn toàn. `aws_instance` không chạy trên GCP, đổi cloud vẫn phải viết lại gần hết code.\
\
Cái dùng chung được là **tool, workflow và team skill**, không phải config.\
\
```hcl\
terraform {\
  required_providers {\
    aws = { source = \\"hashicorp/aws\\

## Detailed Answer (EN)
**No.** A provider is a plugin translating resource blocks into one service API, and resources differ completely per cloud. `aws_instance` does not run on GCP — switching clouds means rewriting nearly everything.\
\
What is shared is **tooling, workflow and team skill**, not configuration.\
\
```hcl\
terraform {\
  required_providers {\
    aws = { source = \\"hashicorp/aws\\
