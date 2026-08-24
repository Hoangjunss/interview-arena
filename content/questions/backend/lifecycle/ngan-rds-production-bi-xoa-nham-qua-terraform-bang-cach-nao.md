---
id: ngan-rds-production-bi-xoa-nham-qua-terraform-bang-cach-nao
position: backend
technology: lifecycle
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ngăn RDS production bị xoá nhầm qua Terraform bằng cách nào?

## Question (EN)
How do you stop a production RDS instance being deleted through Terraform?

## Đáp án chi tiết (VI)
Xếp nhiều lớp, vì một lớp không đủ:\
\
```hcl\
resource \\"aws_db_instance\\" \\"main\\" {\
  deletion_protection       = true      # chan o tang AWS\
  skip_final_snapshot       = false     # giu snapshot cuoi\
  backup_retention_period   = 30\
\
  lifecycle {\
    prevent_destroy = true              # plan co destroy la fail luon\
  }\
}\
```\
\
`prevent_destroy` làm mọi plan chứa thao tác destroy resource đó **fail thay vì chạy**. Giới hạn của nó: chỉ chặn ở tầng Terraform, xoá thẳng trên console thì không đỡ được — nên phải có `deletion_protection` ở tầng AWS.\
\
Hệ quả cần lường trước: khi thật sự cần xoá, phải sửa code gỡ `prevent_destroy` rồi mới apply. Đó là một bước phiền có chủ đích.\
\
Thêm ở tầng pipeline: parse `terraform show -json tfplan` và chặn merge nếu có `delete` trên resource stateful. Kiểm tra đơn giản nhưng ngăn đúng loại sự cố tốn kém nhất.

## Detailed Answer (EN)
Layer several protections, because one is not enough:\
\
```hcl\
resource \\"aws_db_instance\\" \\"main\\" {\
  deletion_protection       = true      # blocked at the AWS layer\
  skip_final_snapshot       = false     # keep a final snapshot\
  backup_retention_period   = 30\
\
  lifecycle {\
    prevent_destroy = true              # any plan with a destroy fails\
  }\
}\
```\
\
`prevent_destroy` makes any plan destroying that resource **fail instead of running**. Its limit: it only guards the Terraform path, so console deletion is unaffected — hence `deletion_protection` at the AWS layer.\
\
A consequence to anticipate: when the resource genuinely must go, you edit the code to remove `prevent_destroy` before applying. That friction is deliberate.\
\
One more layer in the pipeline: parse `terraform show -json tfplan` and block merges containing `delete` on stateful resources. A simple check that prevents the most expensive class of incident.
