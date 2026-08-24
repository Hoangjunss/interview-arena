---
id: vi-sao-nen-dung-for-each-thay-vi-count-khi-tao-nhieu-resource
position: backend
technology: meta-arguments
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên dùng `for_each` thay vì `count` khi tạo nhiều resource?

## Question (EN)
Why prefer `for_each` over `count` when creating multiple resources?

## Đáp án chi tiết (VI)
`count` đánh địa chỉ theo index, nên xoá phần tử ở giữa list làm **mọi phần tử sau bị shift index** và Terraform destroy/recreate hàng loạt.\
\
```hcl\
# count: xoá \\"staging\\" khỏi list -\u003e aws_s3_bucket.b[1] doi tu staging sang prod\
resource \\"aws_s3_bucket\\" \\"b\\" {\
  count  = length(var.envs)          # [\\"dev\\

## Detailed Answer (EN)
`count` addresses by index, so removing a middle element **shifts every later index** and Terraform destroys and recreates in bulk.\
\
```hcl\
# count: dropping \\"staging\\" makes aws_s3_bucket.b[1] go from staging to prod\
resource \\"aws_s3_bucket\\" \\"b\\" {\
  count  = length(var.envs)          # [\\"dev\\
