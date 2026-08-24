---
id: vi-sao-rds-va-s3-can-cach-quan-ly-khac-voi-ec2-va-asg
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao RDS và S3 cần cách quản lý khác với EC2 và ASG?

## Question (EN)
Why do RDS and S3 need different handling from EC2 and ASGs?

## Đáp án chi tiết (VI)
Vì chúng **chứa dữ liệu nên không replace tự do được**. Với app server, destroy/create là thao tác bình thường; với database, cùng thao tác đó là mất dữ liệu.\
\
Các lớp bảo vệ nên áp cùng lúc:\
\
```hcl\
resource \\"aws_db_instance\\" \\"main\\" {\
  deletion_protection     = true\
  skip_final_snapshot     = false\
  backup_retention_period = 30\
  lifecycle { prevent_destroy = true }\
}\
```\
\
Quan trọng không kém: **tách chúng sang state riêng** (`prod/data/`), để một apply cho service không bao giờ chạm tới chúng.\
\
Ở pipeline: parse plan JSON và chặn merge nếu có `delete` hoặc `replace` trên resource thuộc nhóm stateful.\
\
Một cách nghĩ về ranh giới trách nhiệm: **Terraform quản lý vòng đời hạ tầng, không quản lý vòng đời dữ liệu**. Migration schema, đổi engine version, chuyển dữ liệu nên thuộc một quy trình riêng có kiểm soát chặt hơn.

## Detailed Answer (EN)
Because they **hold data and cannot be replaced freely**. For application servers destroy and create is routine; for a database the same operation is data loss.\
\
Protections to apply together:\
\
```hcl\
resource \\"aws_db_instance\\" \\"main\\" {\
  deletion_protection     = true\
  skip_final_snapshot     = false\
  backup_retention_period = 30\
  lifecycle { prevent_destroy = true }\
}\
```\
\
Equally important: **move them into their own state** (`prod/data/`) so a service apply never touches them.\
\
In the pipeline: parse the plan JSON and block merges containing `delete` or `replace` on stateful resources.\
\
A way to frame responsibility: **Terraform owns infrastructure lifecycle, not data lifecycle**. Schema migrations, engine version changes and data moves belong to a separate, more tightly controlled process.
