---
id: vi-sao-khong-nen-de-toan-bo-ha-tang-cong-ty-trong-mot-state
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên để toàn bộ hạ tầng công ty trong một state?

## Question (EN)
Why should all company infrastructure not live in one state?

## Đáp án chi tiết (VI)
Blast radius quá rộng và apply quá chậm: một sai sót chạm tới mọi thứ, mỗi lần chạy phải refresh hàng nghìn resource, và state lock làm các team chờ nhau.\
\
Ba tiêu chí chia thường dùng: theo environment, theo domain nghiệp vụ, và theo **nhịp thay đổi**.\
\
```text\
prod/network/      # doi vai lan mot nam\
prod/data/         # RDS, ElastiCache - doi hiem, blast radius cao\
prod/services/api/ # doi hang ngay\
```\
\
Nối các state độc lập bằng `terraform_remote_state`:\
\
```hcl\
data \\"terraform_remote_state\\" \\"network\\" {\
  backend = \\"s3\\"\
  config  = { bucket = \\"acme-tfstate\\

## Detailed Answer (EN)
Blast radius is too wide and applies are too slow: one mistake touches everything, each run refreshes thousands of resources, and state locking makes teams queue.\
\
Three common split criteria: by environment, by business domain, and by **rate of change**.\
\
```text\
prod/network/      # changes a few times a year\
prod/data/         # RDS, ElastiCache - rare changes, high blast radius\
prod/services/api/ # changes daily\
```\
\
Connect independent states with `terraform_remote_state`:\
\
```hcl\
data \\"terraform_remote_state\\" \\"network\\" {\
  backend = \\"s3\\"\
  config  = { bucket = \\"acme-tfstate\\
