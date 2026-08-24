---
id: remote-backend-can-nhung-gi-cho-production-va-state-locking-giai-quyet-van-de-gi
position: backend
technology: state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Remote backend cần những gì cho production, và state locking giải quyết vấn đề gì?

## Question (EN)
What does a production remote backend need, and what does state locking solve?

## Đáp án chi tiết (VI)
Locking chặn **hai apply chạy song song trên cùng state**. Không có nó, hai người apply cùng lúc ghi đè state của nhau, hậu quả là resource mồ côi không nằm trong state nào.\
\
```hcl\
terraform {\
  backend \\"s3\\" {\
    bucket         = \\"acme-tfstate\\"\
    key            = \\"prod/network/terraform.tfstate\\"\
    region         = \\"ap-southeast-1\\"\
    encrypt        = true\
    dynamodb_table = \\"tf-locks\\"   # locking\
  }\
}\
```\
\
Checklist backend production:\
- **Encryption at rest** — state chứa secret.\
- **Versioning** trên bucket — restore được khi state hỏng.\
- **Locking** — DynamoDB table, hoặc native lock của GCS / Terraform Cloud.\
- **IAM chặt** — quyền đọc state gần bằng quyền đọc secret.\
\
Bài toán bootstrap: bucket state cũng là hạ tầng. Cách làm phổ biến là tạo bucket + DynamoDB bằng một config nhỏ với local state, rồi thêm block `backend` và chạy `terraform init -migrate-state` để đẩy state lên chính bucket vừa tạo.

## Detailed Answer (EN)
Locking prevents **two concurrent applies on the same state**. Without it, two people applying at once overwrite each other state, leaving orphaned resources tracked by nothing.\
\
```hcl\
terraform {\
  backend \\"s3\\" {\
    bucket         = \\"acme-tfstate\\"\
    key            = \\"prod/network/terraform.tfstate\\"\
    region         = \\"ap-southeast-1\\"\
    encrypt        = true\
    dynamodb_table = \\"tf-locks\\"   # locking\
  }\
}\
```\
\
Production backend checklist:\
- **Encryption at rest** — state holds secrets.\
- **Bucket versioning** — restore a corrupted state.\
- **Locking** — a DynamoDB table, or native locking in GCS / Terraform Cloud.\
- **Tight IAM** — read access to state is close to read access to secrets.\
\
The bootstrap problem: the state bucket is itself infrastructure. The usual approach creates the bucket and lock table in a small config with local state, then adds the `backend` block and runs `terraform init -migrate-state` to push state into the bucket it just created.
